import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from "react-native";

export  default class FlatListDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        const {page} = this.state;
        const url = `http://app.gushiwen.org/api/author/Default.aspx?token=gswapi&p=${page}`;
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.authors : [...this.state.data, ...res.authors],
                    // data: res.authors ,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    _refresh() {
        this.setState({
            page: 1,
            data: [],
            refreshing: true
        }, this._fetchData());
        console.log("--refresh->" + this.state.page)
    };

    _loadMore() {
        this.setState({
            page: this.state.page + 1,
            refreshing: false,
        }, this._fetchData());

        console.log("--more->" + this.state.page)
    };


    _renderItemView({item}) {
        return (
            <View style={styles.cellStyle}>
                <Text>{item.nameStr}</Text>
                <Text>{item.cont}</Text>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this._renderItemView.bind(this)}
                keyExtractor={ (item, index) => item.id }
                onRefresh={this._refresh.bind(this)}
                refreshing={this.state.refreshing}
                onEndReached={this._loadMore.bind(this)}
            />
        );
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

