import React, { Component } from 'react'
import { View, Animated } from 'react-native'

import FlipCard from './FlipCard';

class QuestionCard extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      userChoice : null,
      zFront: true
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
    

    this.setState(prevState => ({
      zFront: !prevState.zFront
    }), () => {
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
    })
  }

  handlePress = userChoice => this.setState({userChoice})
  
  render() {
    const { userChoice, zFront } = this.state
    const { item } = this.props

    const frontAnimatedStyle = {
      zIndex: zFront ? 1 : null,
      transform: [
        {rotateX: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      zIndex: !zFront ? 1 : null,
      transform: [
        {rotateX: this.backInterpolate}
      ]
    }
    
    return (
      <View style={{flex: 1}}>
        <FlipCard
          item={item}
          frontAnimatedStyle={frontAnimatedStyle}
          backAnimatedStyle={backAnimatedStyle}
          userChoice={userChoice}
          onPress={this.handlePress}
          flipCard={this.flipCard}
        />
      </View>
    )
  }
}

export default QuestionCard