import React, { Component } from 'react'
import { 
  View, 
  Text, 
  FlatList, 
  Platform, 
  Dimensions,
  Button,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel';
import { HeaderBackButton, Header } from 'react-navigation';

import QuestionCard from './QuestionCard';
import { resetDeck, initializeDeck } from '../actions/currentDeck';
import { white, gray, black, red } from '../utils/colors'

const { width: viewportWidth } = Dimensions.get('window');

class QuestionStack extends Component {
  static navigationOptions = ({ navigation }) => {
    const { counts, current, initialize } = navigation.state.params

    return {
      title: `${current} / ${counts}`,
      headerLeft: (
        <HeaderBackButton 
          onPress={() => {
            navigation.goBack()
            initialize()
          }} 
          title='Deck'
          backTitleVisible={true}
          tintColor={white}
        />
      ),
    }
  }

  state = {
    correctChoices: 0,
    answeredQuestions: 0,
    stackQuestions: []
  }

  componentDidMount() {
    const { questions, navigation, dispatch, deckId } = this.props

    if (questions.length) {
      const stackQuestions = questions.map(q => ({
        ...q,
        status: {
          userChoice : null,
          zFront: true
        }
      }))

      this.setState({stackQuestions})

      navigation.setParams({
        initialize: () => dispatch(initializeDeck(deckId))
      })
    }


  }

  updateTitle = slideIndex => {
    this.props.navigation.setParams({current: (slideIndex + 1).toString()})
  }

  handleCorrectChoice = cb => 
    this.setState(({ correctChoices }) => ({
      correctChoices: correctChoices + 1
    }), cb)

  handleComplete = () => {
    const { correctChoices, answeredQuestions } = this.state
    const { questions } = this.props

    if (answeredQuestions === questions.length) {
      Alert.alert(
        '',
        `Correct answers: ${correctChoices} out of ${answeredQuestions}`,
        [
          {text: 'OK', style: 'cancel'},
          {text: 'Restart', onPress: this.restartTest},
        ]
      )
    }
  }

  handleAnswer = (itemAnswer, userChoice, index) => {
    this.setState(({ answeredQuestions, stackQuestions }) => ({
      answeredQuestions: answeredQuestions + 1,
      stackQuestions: stackQuestions.map((q, i) => {
        if (i === index) {
          return {
            ...q,
            status: {
              ...q.status,
              userChoice
            }
          }
        }
        return q
      })
    }), () => {
      if (itemAnswer === userChoice) {
        this.handleCorrectChoice(this.handleComplete)
      } else {
        this.handleComplete()
      }
    })
  }

  restartTest = () => {
    // const { deckId, questions, navigation } = this.props
    const { dispatch } = this.props

    this._carousel.snapToItem(0)
    dispatch(resetDeck())
  }
  

  render() {
    const { questions, stackQuestions } = this.props
    // const { stackQuestions } = this.state

    if (!stackQuestions.length) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <Carousel
        ref={(c) => {this._carousel = c}}
        data={stackQuestions}
        extraData={stackQuestions}
        renderItem={({item, index}) => (
          <QuestionCard 
            item={item}
            index={index}
            onAnswer={this.handleAnswer}
            restartTest={this.restartTest}
          />
        )}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        onBeforeSnapToItem={this.updateTitle}
      />
    )
  }
}  

  
const mapStateToProps = ({ decks, currentDeck }, { navigation }) => {
  const { deckId } =  navigation.state.params
  const { deck: { questions } } = currentDeck

  return {
    // decks,
    questions: decks[deckId].questions,
    deckId,
    stackQuestions: questions
  }
}

export default connect(mapStateToProps)(QuestionStack)
