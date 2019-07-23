import React, { Component } from 'react'
import { 
  Text, 
  TextInput, 
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'

import { 
  white, 
  lightGray 
} from '../utils/colors'
import UniversalBtn from './UniversalBtn'
import { uuidv1 } from '../utils/api'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
  static navigationOptions = () => ({
    title: 'Create Question'
  })

  state = {
    question: '',
    answer: '',
    submitting: false
  }

  toggleSwitch = () => {
    this.setState(prevState => ({
      answer: !prevState.answer
    }))
  }

  submit = () => {
    const { deckId, dispatch, goBack } = this.props,
          { question, answer } = this.state,

          newQuestion = {
            id: uuidv1(),
            question,
            answer,
          }

    this.setState({
      submitting: true // Disable the submit button while submitting asynchronously
    }, () => {
      dispatch(handleAddQuestion(deckId, newQuestion, goBack))
        .then(() => {
          this.setState({
            submitting: false // Enable submit button when submitting done
          })
        })
    })
  }

  render() {
    const { answer, question, submitting } = this.state

    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={[styles.flex, styles.container]}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <Text style={styles.mainText}>Question</Text>
          <TextInput
            multiline={true}
            onChangeText={(question) => this.setState({question})}
            value={question}
            style={styles.input}
          />
          
          <Text style={styles.mainText}>Answer</Text>
          <TextInput
            multiline={true}
            onChangeText={(answer) => this.setState({answer})}
            value={answer}
            style={styles.input}
          />

          <UniversalBtn 
            disabled={!question || !answer || submitting}
            onPress={this.submit}
            layouts={{marginTop: 50}}
            content="submit"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { deckId } =  navigation.state.params

  return {
    deckId
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    goBack: () => navigation.goBack(),
    dispatch,
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }, 
  container: {
    padding: 20,
    backgroundColor: white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  mainText: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    borderBottomWidth: 1,
    borderColor: lightGray,
    fontSize: 15,
    marginBottom: 20
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
