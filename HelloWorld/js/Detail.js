/**
 * Created by ryin017 on 5/5/17.
 */
import React from 'react';
import {
    Text,
    View,
    Navigator,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Button,
    Image,
    ListView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';


const ds_ziliao = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds_gushiwen = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false,
            authorId: 0,
            author: null,
            tb_ziliaos: ds_ziliao,
            tb_gushiwens: ds_gushiwen,
        };
    }

    static navigationOptions = {
        title: 'Author Brief',
        headerStyle: {
            backgroundColor: 'orange',
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
        },
        headerTintColor: 'white',
        statusBar: {
            backgroundColor: 'transparent',
        },
    }


    componentDidMount() {
        let userID = this.props.navigation.state.params.authorId;
        this.getData(userID);
    }

    shareAction() {
        const {navigate} = this.props.navigation;
        navigate('FlatListDemo');
    }

    async getData(userID) {
        let url = 'http://app.gushiwen.org/api/author/author.aspx?token=gswapi&id=' + userID;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.tb_author) {
                    this.setState({
                            isRefresh: false,
                            author: responseJson.tb_author,
                            tb_ziliaos: ds_ziliao.cloneWithRows(responseJson.tb_ziliaos.ziliaos),
                            tb_gushiwens: ds_gushiwen.cloneWithRows(responseJson.tb_gushiwens.gushiwens),
                        }
                    );
                }
            }).catch((error) => {
            alert('error');
        })
    }

    /**
     * ziliao item
     * */
    _renderZiliaoRow(rowData) {
        return (
            <View style={styles.item_container}>
                <Text style={styles.item_header_2}>
                    {rowData.nameStr}
                </Text>
                <Text numberOfLines={4}>
                    {rowData.cont}
                </Text>
            </View>
        );
    }


    _renderGushiwenRow(rowData) {
        return (
            <View>
                <View style={styles.item_container}>
                    <Text style={styles.item_header_2}>
                        {rowData.nameStr}
                    </Text>
                    <Text numberOfLines={4}>
                        {rowData.cont}
                    </Text>
                </View>

            </View>
        );
    }

    _renderHeader(content) {
        return (
            <View>
                <Text style={styles.tag_c}>
                    {content}
                </Text>
            </View>
        );
    }

    render() {
        if (this.state.author == null) {
            return (
                <View style={styles.load_container}>
                    <ActivityIndicator color="orange"/>
                </View>
            );
        }
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text
                    onPress={this.shareAction.bind(this)}
                    style={styles.header_brief}>
                    {this.state.author.cont}
                </Text>
                <ListView
                    dataSource={this.state.tb_ziliaos}
                    renderHeader={this._renderHeader.bind(this, '参考资料')}
                    renderRow={this._renderZiliaoRow.bind(this)}/>
                <ListView
                    dataSource={this.state.tb_gushiwens}
                    renderHeader={this._renderHeader.bind(this, '相关作品')}
                    renderRow={this._renderGushiwenRow.bind(this)}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    load_container: {
        flex: 1,
        marginTop: 8,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    img_container: {
        flexDirection: 'row',
    },

    img_bg: {
        flex: 1,
    },
    btn_toolbar: {
        padding: 8,
        color: 'white',
        fontSize: 16,
    },

    item_container: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
    },
    header_brief: {
        margin: 16,
    },
    item_header: {
        marginBottom: 8,
        color: 'orange',
        fontSize: 16,
    },
    item_header_2: {
        marginBottom: 8,
        color: 'blue',
        fontSize: 16,
    },
    tag_c: {
        width: 66,
        padding: 4,
        marginLeft: 16,
        backgroundColor: 'orange',
        color: 'white',
        alignSelf: 'flex-start',
    }

})
