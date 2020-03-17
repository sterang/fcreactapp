import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, WebView , Linking} from 'react-native';



function Reading (props){
    _handlePress = () => {
        Linking.openURL('http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf');
        this.props.onPress && this.props.onPress();
    };
    return (
        <Text {...this.props} onPress={this._handlePress}>
          Download Your PDF
        </Text>
      );
}

export default Reading;