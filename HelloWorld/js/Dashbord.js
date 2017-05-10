/**
 * Created by ryin017 on 5/5/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    Image,
    ListView,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import Detail from './Detail'

import {StackNavigator} from 'react-navigation';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Dashbord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds,
            isRefresh: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('http://app.gushiwen.org/api/author/Default.aspx?token=gswapi&p=1')
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.authors) {
                    this.setState({
                            isRefresh: false,
                            dataSource: ds.cloneWithRows(responseJson.authors)
                        }
                    );
                }

            }).catch((error) => {
            alert('haha');
        })
    }


    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: 'orange',
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
        }
        // header: null
    }


    _renderRow(rowData) {
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('Detail', {user: 'lucy'})}>
                <View style={styles.container}>
                    <Image
                        style={{width: 60, height: 80}}
                        source={{uri: `http://img.gushiwen.org/authorImg/${rowData.pic}.jpg`}}/>
                    <View style={styles.left}>
                        <Text numberOfLines={4}>{rowData.cont}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.dataSource.getRowCount() === 0) {
            return (
                <View style={styles.load_container}>
                    <ActivityIndicator color="orange"/>
                </View>
            );
        }
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
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
        flexDirection: 'row',
        paddingLeft: 8,
        paddingTop: 8,
        marginTop: 16
    },

    left: {
        flex: 1,
        flexDirection: "column",
        margin: 8
    },

});


const test = StackNavigator({
        Dashbord: {screen: Dashbord},
        Detail: {screen: Detail},
    }
);


export default  test;
