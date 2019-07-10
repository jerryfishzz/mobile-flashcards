import React, { Component } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  Switch,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import { white, purple, green, red, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { addQuestion } from '../actions';
import { addQuestionToDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';

function SubmitBtn({ submitting, onPress }) {
  return (
    <TouchableOpacity
      style={[
        Platform.OS === 'ios' 
          ? styles.iosSubmitBtn 
          : styles.andriodSubmitBtn,
        {marginBottom: 100}
      ]}
      onPress={onPress}
      disabled={submitting}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class NewQuestion extends Component {
  state = {
    question: '',
    answer: true,
    explaination: '',
    submitting: false
  }

  toggleSwitch = () => {
    this.setState(prevState => ({
      answer: !prevState.switchValue
    }))
  }

  submit = () => {
    const { decks, deckId, dispatch } = this.props,
          { question, answer, explaination } = this.state,
          newQuestion = {
            question,
            type: 'judgement',
            answer,
            explaination
          }

    const newDecks = {
      ...decks,
      [deckId]: {
        ...decks[deckId],
        questions: [
          ...decks[deckId].questions,
          newQuestion
        ]
      }
    }

    this.setState(
      {submitting: true},
      () => {
        addQuestionToDeck(newDecks)
          .then(() => {
            dispatch(addQuestion(deckId, newQuestion))
            this.setState({submitting: false})
          })
      }
    )
    
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: "Home" }))
    // this.props.navigation.dispatch(NavigationActions.back())

    // console.log(newDecks)
  }

  render() {
    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Text>Question</Text>
        <View 
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
          }}
        >
          <TextInput
            multiline={true}
            maxLength = {60}
            onChangeText={(question) => this.setState({question})}
            value={this.state.text}
            style={{width: 100, height: 20}}
          />
        </View>
        <Text>Answer</Text>
        <Switch
          style={{marginTop:30}}
          onValueChange = {this.toggleSwitch}
          value = {this.state.answer}
        />
        <Text>Explaination</Text>
        <View 
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
          }}
        >
          <TextInput
            multiline={true}
            maxLength = {60}
            onChangeText={(explaination) => this.setState({explaination})}
            value={this.state.explaination}
            style={{width: 100, height: 20}}
          />
        </View>
        <SubmitBtn submitting={this.state.submitting} onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { deckId } =  navigation.state.params

  return {
    decks,
    questions: decks[deckId].questions,
    deckId
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  andriodSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})

export default connect(mapStateToProps)(NewQuestion)
