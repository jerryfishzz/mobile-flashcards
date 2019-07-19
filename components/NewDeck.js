import React, { Component } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { NavigationActions } from 'react-navigation';
import * as R from 'ramda'
import { connect } from 'react-redux'

import { white, lightGray } from '../utils/colors'
// import { handleAddDeck } from '../actions';
import { getDecks } from '../utils/api';
import UniversalBtn from './UniversalBtn';
import { handleAddDeck } from '../actions/shared';

class NewDeck extends Component {
  state = {
    deck: '',
    submitting: false
  }

  submit = () => {
    const { deck } = this.state
    const { dispatch, navigation } = this.props

    const noSpace = n => n !== ' '
    const noSapceArray = R.filter(noSpace)(deck)
    const key = R.join('')(noSapceArray)
    
    const entry = {
      title: deck,
      questions: []
    }

    // For dismissing keyboard working properly after alert, 
    // need to hack a little
    const alertAndDismiss = alertText => {
      Keyboard.dismiss()
      setTimeout(() => alert(alertText), 50)
    } 

    this.setState(
      {submitting: true}, 
      () => {
        getDecks()
          .then(decks => Object.keys(decks).map(key => R.toLower(key)))
          .then(keys => { // Check duplicate deck name
            if (keys.indexOf(R.toLower(key)) !== -1) {
              const alertText = 'Deck with the same name already exists'
              alertAndDismiss(alertText)

              this.setState({
                submitting: false,
                deck: ''
              })
            } else {
              dispatch(handleAddDeck({ key, entry }))
                .then(() => {
                  this.setState({
                    submitting: false,
                    deck: ''
                  }, () => {
                    // navigation.dispatch(NavigationActions.navigate({ 
                    //   routeName: 'Decks'
                    // }))
                    navigation.navigate(
                      'Deck', 
                      { deckId: key }
                    )
                  })
                })
                .catch(err => {
                  alertAndDismiss('Error occurs')
                  console.log(err)
                  this.setState({
                    submitting: false,
                  })
                })
            }
          })
      }
    )
  }

  render() {
    const { deck, submitting } = this.state

    return (
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss} 
        accessible={false}
      >
        <KeyboardAvoidingView 
          behavior="padding"
          style={[styles.flex, styles.container]}
        >
          <Text style={styles.mainText}>
            Name of the new deck
          </Text>
          <View style={styles.flex}>
            <TextInput
              onChangeText={(deck) => this.setState({deck})}
              value={deck}
              style={styles.input}
              selectTextOnFocus
              maxLength={20}
            />
          </View>
          <UniversalBtn 
            disabled={deck === '' || submitting}
            onPress={this.submit}
            layouts={[{marginBottom: 100}]}
            content="create deck"
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
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
    height: 30,
    borderBottomWidth: 1,
    borderColor: lightGray,
    fontSize: 15,
  }
})

export default connect()(NewDeck)
