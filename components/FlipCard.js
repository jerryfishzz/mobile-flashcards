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
import { handleChooseAnswer, handleToggleZ } from '../actions/deckStatus';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

// Front side UI
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
                <Text 
                  style={[
                    styles.cardTextSecondary, 
                    userChoice 
                      ? {color: green} 
                      : {color: red}
                  ]}
                >
                  {userChoice ? 'Correct.' : 'Incorrect.'}
                </Text>
                <Text style={styles.cardTextSecondary}>
                  {userChoice ? ' Congratulations!' : ' Try harder.' }
                </Text>
              </View> 
            </View>
          : null
        }
      </View>

      <View style={{marginTop: 50}}>
        <UniversalBtn 
          disabled={userChoice !== null}
          onPress={onPress}
          
          layouts={styles.forTrue}
          content="correct"
          btnValue={true}
        />
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

// Back side UI
function BackSide({ item }) {
  return (
    <View style={styles.flex}>
      <Text style={styles.cardTextMain}>
        {item.answer}
      </Text>
    </View>
  )
}

class FlipCard extends Component {
  state = {
    viewWidth: 0,
    viewHeight: 0
  }
  
  // Get the question area size
  _onLayout = e => {
    const { width, height } = e.nativeEvent.layout

    this.setState({
      viewWidth: width,
      viewHeight: height
    })
  }

  handlePress = userChoice => {
    const { dispatch, id, deckId } = this.props

    dispatch(handleChooseAnswer(
      userChoice, 
      id, 
      deckId, 
      this.handleComplete
    ))
  }

  handleComplete = (answeredQuestions, correctChoices) => {
    const { restartTest } = this.props
    const handleNotifications = () => {
      clearLocalNotification()
        .then(setLocalNotification)
    }
    
    Alert.alert(
      '',
      `Correct answers: ${correctChoices} out of ${answeredQuestions}`,
      [
        {text: 'OK', style: 'cancel', onPress: handleNotifications},
        {text: 
          'Restart', 
          onPress: () => {
            restartTest()
            handleNotifications()
          }
        },
      ]
    )
  }

  handleFlip = () => {
    const { deckId, id, dispatch, flipCard } = this.props

    dispatch(handleToggleZ(deckId, id, flipCard))
  }

  render() {
    const { viewWidth, viewHeight } = this.state

    const { 
      frontAnimatedStyle, 
      backAnimatedStyle,
      userChoice, 
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
                <TouchableOpacity 
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

const mapStateToProps = ({ deckStatus }, { navigation, id }) => {
  const { deckId } =  navigation.state.params
  
  const [questionStatus] = deckStatus[deckId].questions.filter(q => q.id === id)
  const { userChoice } = questionStatus
  
  return {
    userChoice,
    deckId
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
