import React, { Component } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  Switch,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';

import { 
  white, 
  green, 
  red, 
  gray, 
  lightGray 
} from '../utils/colors'
import { handleAddQuestion } from '../actions';
import UniversalBtn from './UniversalBtn';

class NewQuestion extends Component {
  static navigationOptions = () => ({
    title: 'Create Question'
  })

  state = {
    question: '',
    answer: true,
    explaination: '',
    submitting: false
  }

  toggleSwitch = () => {
    this.setState(prevState => ({
      answer: !prevState.answer
    }))
  }

  submit = () => {
    const { deckId, dispatch, goBack } = this.props,
          { question, answer, explaination } = this.state,

          newQuestion = {
            question,
            type: 'judgement',
            answer,
            explaination
          }

    this.setState({
      submitting: true
    }, () => {
      dispatch(handleAddQuestion(deckId, newQuestion, goBack))
        .then(() => {
          this.setState({
            submitting: false
          })
        })
    })
  }

  render() {
    const { answer, question, explaination, submitting } = this.state

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
          
          <View style={styles.answer}>
            <View style={styles.flex}>
              <Text style={styles.mainText}>Answer</Text>
            </View>
            <Text 
              style={[
                {color: green, fontStyle: 'italic'},
                !answer ? {color: gray} : null
              ]}
            >
              True
            </Text>
            <Switch
              onValueChange = {this.toggleSwitch}
              value = {answer}
              style={styles.switch}
              ios_backgroundColor={red}
            />
            <Text
              style={[
                {color: red, fontStyle: 'italic'},
                answer ? {color: gray} : null
              ]}
            >
              False
            </Text>
          </View>

          <Text style={styles.mainText}>Explaination</Text>
          <TextInput
            multiline={true}
            onChangeText={(explaination) => this.setState({explaination})}
            value={explaination}
            style={styles.input}
          />

          <UniversalBtn 
            disabled={!question || !explaination || submitting}
            onPress={this.submit}
            layouts={{marginTop: 50}}
            content="submit"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } =  navigation.state.params

  return {
    decks,
    questions: decks[deckId].questions,
    deckId
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    goBack: () => navigation.dispatch(NavigationActions.navigate({
      routeName: 'Home' 
    })),
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
  answer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  switch: {
    marginLeft: 10,
    marginRight: 12
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
