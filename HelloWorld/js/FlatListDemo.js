/**
 * Created by ryin017 on 5/12/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';


export default class MusicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            data: [],
            index:0,
        }

    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        const p = this.state.page;
        const REQUEST_URL = 'http://app.gushiwen.org/api/author/Default.aspx?token=gswapi&p=' + p;

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((data) => {
                let datalist = data.authors;
                let dataBlog = [];

                datalist.map((item) => {
                    dataBlog.push({
                        key: this.state.index,
                        value: item
                    })
                    this.state.index++;
                })

                this.setState({
                    data: this.state.data.concat(dataBlog),
                    isLoading: false,
                })

                datalist = null;
                dataBlog = null;

            })
            .catch((err) => {
                this.setState({
                    error: true,
                    errorInfo: err
                })
            })
            .done()
    }


    _loadMore() {
        this.setState({
            page: this.state.page + 1,
        });
        this._fetchData()
    }

    _refresh() {
        this.setState({
            page: 1,
            data: [],
        });
        this._fetchData()
    }


    _renderItemView({item}) {
        return (
            <View style={styles.cellStyle}>
                <Text>{item.value.nameStr}</Text>
                <Text>{item.value.cont}</Text>
            </View>
        )
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    color='orange'
                    size="large"
                />
            </View>
        )
    }

    //加载失败view
    renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }

    _renderFlatlist() {

        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView(this.state.errorInfo);
        }

        return (
            <FlatList
                data={this.state.data}
                renderItem={ this._renderItemView}
                onRefresh={this._refresh.bind(this)}
                refreshing={false}
                onEndReached={this._loadMore.bind(this)}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderFlatlist()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cellStyle: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingVertical: 20,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',    // 设置阴影
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,   // 透明度
        shadowRadius: 1,
        elevation: 2   //   高度，设置Z轴，可以产生立体效果
    }
});