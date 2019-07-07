import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Image,
  PanResponder,
  Animated,
} from 'react-native'
// import { getDeck } from '../utils/api';
import Styles from './Styles.js';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    // console.log('constructor')
    // console.log(props.question)
    // console.log(`waitingQueue: ${props.waitingQueue}`)
    this.state = {
      pan: new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        if (this.state.pan.x._value < -150) {
          // console.log(waitingQueue)
          if (this.props.index !== 0) {
            // console.log(55555)
            this.props.onSwipeLeft(this.props.index)
          } else {
            // console.log(7777777)
            Animated.spring(this.state.pan, {
              toValue: 0,
            }).start()
          }
        } 
        
        if (this.state.pan.x._value > 150) {
          // console.log(8888888)
          // console.log(`waitingqueue in pan: ${props.waitingQueue}`)
          if (this.props.waitingQueue !== 0) {
            // console.log(66666)
            this.props.onSwipeRight()
            // Animated.spring(this.state.pan, {
            //   toValue: 0,
            // }).start()
          } else {
            // console.log(7777777)
            Animated.spring(this.state.pan, {
              toValue: 0,
            }).start()
          }
        } 
      }
    })
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getMainCardStyle() {
    let {pan} = this.state;

    return [
      Styles.mainCard,
      {position: 'absolute'},
      {left: -175},
      {top: -250},
      {
        transform: [
          {translateX: pan.x}, 
          {translateY: pan.y},
          {
            rotate: pan.x.interpolate({
              inputRange: [-150, 0, 150], 
              outputRange: ["-20deg", "0deg", "20deg"]
            })
          }
        ]
      },
      {
        opacity: pan.x.interpolate({
          inputRange: [-150, 0, 150], 
          outputRange: [0.5, 1, 0.5]
        })
      }
    ];
  }

  render() {
    console.log('render')
    const { question, answer } = this.props

    return (
      <Animated.View 
        style={this.getMainCardStyle()} 
        {...this.panResponder.panHandlers}
      >
        <View style={Styles.card}>
          <Image style={Styles.cardImage}/>
          <View style={Styles.cardText}>
            <Text style={Styles.cardTextMain}>{question}</Text>
            <Text style={Styles.cardTextSecondary}>{answer ? 'True' : 'False'}</Text>
          </View>
        </View>
      </Animated.View>
      
    )
  }
}

// const mapStateToProps = (decks) => {

// }

export default QuestionCard
