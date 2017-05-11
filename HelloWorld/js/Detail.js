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


export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false,
            authorId: 0,
            author: null,
            tb_ziliaos: ds_ziliao,
        };
    }

    static navigationOptions = ({navigation}) => ({
        // title: `chat with ${navigation.state.params.authorId}`,
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
    });

    componentDidMount() {
        let userID = this.props.navigation.state.params.authorId;
        this.getData(userID);
    }

    getData(userID) {
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
                <Text style={styles.item_header}>
                    {rowData.nameStr}
                </Text>
                <Text numberOfLines={4}>
                    {rowData.cont}
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
            <ScrollView>
                <Text style={styles.header_brief}>
                    {this.state.author.cont}
                </Text>
                <ListView
                    dataSource={this.state.tb_ziliaos}
                    renderRow={this._renderZiliaoRow.bind(this)}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
    }

})
