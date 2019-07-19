import React, { Component } from 'react'
import { 
  View, 
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { connect } from 'react-redux'

import { white, purple, green, red } from '../utils/colors'
import UniversalBtn from './UniversalBtn'
import { chooseAnswer, handleToggleZFront } from '../actions/currentDeck';
import { handleChooseAnswer, handleToggleZ } from '../actions/deckStatus';

function YourChoice() {
  return (
    <View>
      <Text 
        style={styles.yourChoice}
      >
        Your choice
      </Text>
    </View>
  )
}

function FrontSide({ viewHeight, item, userChoice, onPress }) {
  return (
    <View style={styles.flex}>
      <View style={{minHeight: viewHeight / 2 - 50}}>  
        <Text style={styles.cardTextMain}>
          {item.question}
        </Text>
        {userChoice !== null
          ? <View style={{marginTop: 20}}>
              <View style={[{flexDirection: 'row'}]}>
                <Text style={styles.cardTextSecondary}>Answer </Text>
                <Text 
                  style={[
                    styles.cardTextSecondary, 
                    item.answer 
                      ? {color: green} 
                      : {color: red}
                  ]}
                >
                  {item.answer ? 'Correct' : 'Incorrect'}
                </Text>
              </View> 
            </View>
          : null
        }
      </View>

      <View style={{marginTop: 50}}>
        {userChoice === true && <YourChoice />}
        <UniversalBtn 
          disabled={userChoice !== null}
          onPress={onPress}
          
          layouts={styles.forTrue}
          content="correct"
          btnValue={true}
        />
        {userChoice === false && <YourChoice />}
        <UniversalBtn 
          disabled={userChoice !== null}
          onPress={onPress}
          
          layouts={styles.forFalse}
          content="incorrect"
          btnValue={false}
        />
      </View>
    </View>
  )
}

function BackSide({ item }) {
  return (
    <View style={styles.flex}>
      <Text style={styles.cardTextMain}>
        {item.explaination}
      </Text>
    </View>
  )
}

class FlipCard extends Component {
  state = {
    viewWidth: 0,
    viewHeight: 0
  }
  
  _onLayout = e => {
    const { width, height } = e.nativeEvent.layout

    this.setState({
      viewWidth: width,
      viewHeight: height
    })
  }

  handlePress = userChoice => {
    const { dispatch, correctAnswer, id, deckId } = this.props
// console.log(1)
    // dispatch(chooseAnswer(userChoice, index))
    dispatch(handleChooseAnswer(userChoice, id, deckId, correctAnswer, this.handleComplete))
  }

  handleComplete = (answeredQuestions, correctChoices) => {
    const { restartTest } = this.props
    // const { questions } = this.props
    // const { currentDeck: { answeredQuestions, correctChoices } } = getState()
    // if (answeredQuestions === questions.length) {
      Alert.alert(
        '',
        `Correct answers: ${correctChoices} out of ${answeredQuestions}`,
        [
          {text: 'OK', style: 'cancel'},
          {text: 'Restart', onPress: restartTest},
        ]
      )
    // }
  }

  handleFlip = () => {
    const { deckId, id, dispatch, flipCard } = this.props
    dispatch(handleToggleZ(deckId, id, flipCard))
  }

  render() {
    const { viewWidth, viewHeight } = this.state
    // const { 
    //   item, 
    //   index,
    //   frontAnimatedStyle, 
    //   backAnimatedStyle,
    //   onPress,
    //   userChoice, 
    //   flipCard } = this.props  

    const { 
      frontAnimatedStyle, 
      backAnimatedStyle,
      userChoice, 
      flipCard,
      // onPress,
      ...others
    } = this.props  

    return (
      <View 
        style={[styles.flex, styles.container]}
        onLayout={this._onLayout}
      >
        <Animated.View 
          style={[
            styles.flex, 
            styles.card, 
            frontAnimatedStyle, 
          ]}
        >
          {viewHeight
            ? <ScrollView 
                contentContainerStyle={{
                  flexGrow: 1,
                }}
              >
                {userChoice !== null
                  ? <TouchableOpacity 
                      style={styles.flex} 
                      onPress={this.handleFlip}
                      activeOpacity={1}
                    >
                      <FrontSide 
                        viewHeight={viewHeight} 
                        userChoice={userChoice}
                        onPress={this.handlePress}
                        {...others}
                      />
                    </TouchableOpacity>
                  : <FrontSide 
                      viewHeight={viewHeight} 
                      userChoice={userChoice}
                      onPress={this.handlePress}
                      {...others}
                    />
                }
              </ScrollView>
            : null
          }
        </Animated.View>

        <Animated.View 
          style={[
            styles.flex, 
            styles.card, 
            styles.cardBack, 
            backAnimatedStyle,
            {width: viewWidth, height: viewHeight}
          ]}
        >
          {viewHeight
            ? <ScrollView 
                contentContainerStyle={{
                  flexGrow: 1,
                }}
              >
                <TouchableOpacity 
                  activeOpacity={1} 
                  style={styles.flex} 
                  onPress={this.handleFlip}
                >
                  <BackSide {...others} />
                </TouchableOpacity>
              </ScrollView>
            : null
          }
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = (
  { currentDeck, deckStatus, decks }, 
  { index, frontAnimatedStyle, backAnimatedStyle, flipCard, restartTest, navigation, id }
) => {
  const { deckId } =  navigation.state.params
  // const deck = decks[deckId]
  // const { correctChoices, answeredQuestions } = currentDeck
  const item = decks[deckId].questions.filter(q => q.id === id)[0]
  // const { userChoice } = item.status
  

  
  const correctAnswer = decks[deckId].questions.filter(q => q.id === id)[0].answer
  const [questionStatus] = deckStatus[deckId].questions.filter(q => q.id === id)
  const { userChoice } = questionStatus
  // console.log(userChoice)
  return {
    // index,
    item,
    userChoice,
    frontAnimatedStyle, 
    backAnimatedStyle, 
    flipCard,
    // correctChoices, 
    // answeredQuestions,
    restartTest,
    correctAnswer,
    deckId,
    id
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }, 
  container: {
    backgroundColor: white,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#FFF',
    backfaceVisibility: 'hidden'
  },
  cardBack: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    backgroundColor: 'transparent',
    fontStyle: 'italic',
  },
  forTrue: {
    backgroundColor: green,
    marginBottom: 20
  },
  forFalse: {
    backgroundColor: red,
    marginBottom: 20
  },
  yourChoice: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: purple
  }
})

export default connect(mapStateToProps)(FlipCard)
