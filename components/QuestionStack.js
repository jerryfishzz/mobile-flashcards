import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard';
import Styles from './Styles.js';
import * as R from 'ramda'
import { getDeck } from '../utils/api';

class QuestionStack extends Component {
  state = {
    questionsInUse: [],
    questionsOnWaiting: []
  }

  componentDidMount() {
    // const { questions } = this.props

    // this.setState({questionsInUse: questions})

    getDeck('CommonSense')
      .then(deck => {
        const questions = R.reverse(deck.questions)
        this.setState({questionsInUse: questions})
      })
  }

  handleSwipeLeft = (index) => {
    const { questionsInUse } = this.state
    const newQuestionsInUse = questionsInUse.slice(0, index)
    
    this.setState(prevState => ({
      questionsInUse: newQuestionsInUse,
      questionsOnWaiting: [
        questionsInUse[index],
        ...prevState.questionsOnWaiting
      ]
    }))
  }

  handleSwipeRight = (cb) => {
    const { questionsOnWaiting } = this.state
    const questionReadyToBack = questionsOnWaiting[0]
    
    // if (questionsOnWaiting.length === 0) return null

    this.setState(({ questionsInUse, questionsOnWaiting }) => ({
      questionsInUse: [...questionsInUse, questionReadyToBack],
      questionsOnWaiting: questionsOnWaiting.filter((q, i) => i !== 0)
    }), cb())
  }

  render() {
    const { questionsInUse, questionsOnWaiting } = this.state
    // console.log(111111111)
    const waitingQueue = questionsOnWaiting.length
    // console.log(waitingQueue)

    if (questionsInUse.length === 0) {
      return <View><Text>Loading</Text></View>
    }

    return (
      <FlatList 
        style={Styles.cardContainer}
        contentContainerStyle={Styles.cardStack}
        data={questionsInUse}
        renderItem={({item, index}) => {
          {/* console.log(waitingQueue) */}
          return (
            <QuestionCard
              {...item}
              index={index}
              waitingQueue={waitingQueue}
              onSwipeLeft={this.handleSwipeLeft}
              onSwipeRight={this.handleSwipeRight}
            />
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      /> 
    )
  }
}

// const mapStateToProps = (decks, { navigation }) => {
//   const { deckId } =  navigation.state.params
//   // console.log(deckId)
//   // console.log(2222222)

//   return {
//     decks,
//     questions: R.reverse(decks[deckId].questions)
//   }
// }

// export default connect(mapStateToProps)(QuestionStack)

export default QuestionStack
