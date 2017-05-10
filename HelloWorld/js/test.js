/**
 * Created by ryin017 on 5/9/17.
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';

import {
    AppRegistry,
    Text,
    View,
    Button
} from 'react-native';

import Dashbord from './js/Dashbord'

import {StackNavigator} from 'react-navigation';

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: "chat"
    };

    render() {
        return (
            <View>
                <Text>laksjdkajsd</Text>
            </View>
        );
    }
}

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'welcome'
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View>
                <Text>hello</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="hahahh"
                />
            </View>)
    }
}


const SimpleApp = StackNavigator({
    Home: {screen: HomeScreen},
    Chat: {screen: ChatScreen}
});


AppRegistry.registerComponent('HelloWord', () => SimpleApp);