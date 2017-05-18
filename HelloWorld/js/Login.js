/**
 * Created by ryin017 on 5/11/17.
 */
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
    ScrollView,
} from 'react-native';


export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    static navigationOptions = {
        title: "login",
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
        }
    };


    async _login(username, password) {
        // fetch(`http://app.gushiwen.org/user/login.aspx?n=930330159&email=${username}&token=gswapi&pwd=${password}`)
        //     .then((response) => response.text())
        //     .then((responseJson) => {
        //         alert(responseJson);
        //         return responseJson;
        //     })
        //     .catch((error) => {
        //         alert('error');
        //     })
        const {navigate} = this.props.navigation;
        navigate('SignUp');
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.img_container}>
                    <Image style={styles.img_bg}
                           resizeMode='cover'
                           source={require('./img/bg.jpeg')}/>
                </View>
                <View style={[styles.item_container, {marginTop: 32}]}>
                    <Text style={ styles.left_text}>username:</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: 'orange', flex: 1}}>
                        <TextInput
                            numberOfLines={1}
                            underlineColorAndroid='transparent'
                            style={styles.input_right}
                            onChangeText={(text) => {
                                this.setState({username: text});
                            }}
                        />
                    </View>
                </View>

                <View style={[styles.item_container, {marginTop: 1}]}>
                    <Text style={ styles.left_text}>password:</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: 'orange', flex: 1}}>
                        <TextInput
                            numberOfLines={1}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            style={styles.input_right}
                            onChangeText={(text) => {
                                this.setState({password: text});
                            }}
                        />
                    </View>
                </View>

                <View style={styles.btn_login}>
                    <Button
                        color='orange'
                        title="login"
                        onPress={this._login.bind(this, this.state.username + "-" + this.state.password)}
                    />
                </View>
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
        flexDirection: 'row',
        margin: 16
    },

    left_text: {
        height: 40,
        width: 110,
        paddingTop: 8,
        fontSize: 20,
        color: 'orange',
        fontWeight: 'bold',
    },
    input_right: {
        height: 40,
        fontSize: 18,
        paddingLeft: 8,
    },
    btn_login: {
        marginTop: 32,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: 'white',
        borderColor: 'orange',
        borderWidth: 1,
    }

})
