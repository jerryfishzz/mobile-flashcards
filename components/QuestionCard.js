import React, { Component } from 'react'
import { View, Animated, Text } from 'react-native'
import { connect } from 'react-redux'


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
    // this.setState(prevState => ({
    //   zFront: !prevState.zFront
    // }), () => {
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
    // })
  }

  // handlePress = (userChoice, index) => {
  //   this.setState({userChoice})

  //   const { item, onAnswer } = this.props
  //   onAnswer(item.answer, userChoice, index)
  // }
  
  render() {
    // const { userChoice, zFront } = this.state
    // const { item, index, zFront, userChoice } = this.props
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

const mapStateToProps = (
  { decks, currentDeck, deckStatus }, 
  { item, index, restartTest, navigation }
) => {
  const { deckId } =  navigation.state.params
  // const { userChoice, zFront } = item.status
// console.log(deckId)

  const { id } = item
// console.log(id)
  // const currentStatus = deckStatus[deckId]
  const [questionStatus] = deckStatus[deckId].questions.filter(q => q.id === id)
// console.log(questionStatus)
  const { zFront } = questionStatus

  return {
    // decks,
    // questions: decks[deckId].questions,
    // deckId,
    // stackQuestions: questions,
    zFront,
    // userChoice,
    // index,
    restartTest,
    id
  }
}

export default connect(mapStateToProps)(QuestionCard)