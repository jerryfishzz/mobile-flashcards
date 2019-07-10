import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native'
// import { getDeck } from '../utils/api';
import Styles from './Styles.js';
import FlipCard from './FlipCard';

class QuestionCard extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      correctness : null,
    }

    this.value = 0
    this.animatedValue = new Animated.Value(0)
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners()
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }
  }

  handlePress = correctness => {
    console.log('press')
    this.setState({correctness})
  }

  render() {
    const { correctness } = this.state
    const { item } = this.props

    const frontAnimatedStyle = {
      transform: [
        {rotateX: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {rotateX: this.backInterpolate}
      ]
    }
    const zFront = correctness === null ? {zIndex: 1} : null 
   
    if (correctness !== null) {
      return (
        <TouchableOpacity 
          onPress={this.flipCard}
        >
          <FlipCard 
            item={item}
            frontAnimatedStyle={frontAnimatedStyle}
            backAnimatedStyle={backAnimatedStyle}
            correctness={correctness}
            onPress={this.handlePress}
          />
        </TouchableOpacity>
      )
    }

    return (
      <FlipCard 
        item={item}
        frontAnimatedStyle={frontAnimatedStyle}
        backAnimatedStyle={backAnimatedStyle}
        correctness={correctness}
        zFront={zFront}
        onPress={this.handlePress}
      />
    )
  }
}

// const mapStateToProps = (decks) => {

// }

export default QuestionCard
