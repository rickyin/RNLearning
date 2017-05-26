/**
 * Created by ryin017 on 5/26/17.
 */
import { View, Text} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

export default class ViewPagerDemo extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{height:200}}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>

                <IndicatorViewPager
                    style={{flex:1, paddingTop:20, backgroundColor:'white'}}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>

                <IndicatorViewPager
                    style={{flex:1, paddingTop:20, backgroundColor:'white'}}
                    indicator={this._renderTabIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                        <Text>page one</Text>
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>
            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    _renderTabIndicator() {
        let tabs = [{
            text: 'Home',
            iconSource: require('./img/ic_favorite.png'),
            selectedIconSource: require('./img/ic_favorite_black.png')
        },{
            text: 'Message',
            iconSource: require('./img/ic_favorite.png'),
            selectedIconSource: require('./img/ic_favorite_black.png')
        },{
            text: 'Profile',
            iconSource: require('./img/ic_favorite.png'),
            selectedIconSource: require('./img/ic_favorite_black.png')
        }];
        return <PagerTabIndicator tabs={tabs} />;
    }

}
