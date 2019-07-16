import React, { Component } from 'react';
import { 
  View, 
  TextInput,
  Image,
  PanResponder,
  Animated,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => 'null',
      onStartShouldSetPanResponderCapture: (evt, gestureState) => 'null',
      onMoveShouldSetPanResponder: () => null,
      onMoveShouldSetPanResponderCapture: () => null,
      onPanResponderGrant: (e, gestureState) => {
        console.log('works1')
        this.state.pan.setValue({x: 0, y: 0});
      },
      // onPanResponderReject: (e, gestureState) => console.log('rejected'),
      onPanResponderMove: null,
      onPanResponderRelease: (e, {vx, vy}) => {},
      onPanResponderTerminationRequest: () => console.log('listen')
    })
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getMainCardStyle() {
    let {pan} = this.state;
    console.log(pan)
    return [
      {transform: [{translateX: pan.x}, {translateY: pan.y}]}
    ];
  }

  render() {
    return (
      
      
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => console.log(1)} onLongPress={() => console.log(8)}>
        <View>
          
          <Image 
            source={{uri: 'http://icons.iconarchive.com/icons/tooschee/medievalish-gaming/128/wow-orc-icon.png'}}
            style={{height: 400}}
          />
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          <Text>Hi</Text>
          
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      
    
  )


    // return (
      
      
    //     <ScrollView>
    //       <View {...this.panResponder.panHandlers}>
            
    //         <Image 
    //           source={{uri: 'http://icons.iconarchive.com/icons/tooschee/medievalish-gaming/128/wow-orc-icon.png'}}
    //           style={{height: 400}}
    //         />
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
    //         <Text>Hi</Text>
            
    //       </View>
    //     </ScrollView>
        
      
    // )
  }
}
