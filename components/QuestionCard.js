import React, { Component } from 'react'
import { View, Animated, Text } from 'react-native'
import { connect } from 'react-redux'

import FlipCard from './FlipCard'

class QuestionCard extends Component {
  constructor(props) {
    super(props)

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

  render() {
    const { zFront, ...others } = this.props

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
          frontAnimatedStyle={frontAnimatedStyle}
          backAnimatedStyle={backAnimatedStyle}
          flipCard={this.flipCard}
          {...others}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ deckStatus }, { navigation, item }) => {
  const { deckId } =  navigation.state.params
  const { id } = item

  const [questionStatus] = deckStatus[deckId].questions.filter(q => q.id === id)
  const { zFront } = questionStatus

  return {
    zFront,
    id
  }
}

export default connect(mapStateToProps)(QuestionCard)