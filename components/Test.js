import React, { Component } from 'react';
import { 
  AppRegistry, 
  View, 
  KeyboardAvoidingView,
  TextInput,
  Image
} from 'react-native';

export default class Test extends Component {
  state = {
    text: ''
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View>
          <Image 
            source={{uri: 'http://icons.iconarchive.com/icons/tooschee/medievalish-gaming/128/wow-orc-icon.png'}}
            style={{height: 400}}
          />
          <View 
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginBottom: 100
            }}
          >
            <TextInput
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}
