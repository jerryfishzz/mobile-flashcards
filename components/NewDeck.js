import React, { Component } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from 'react-native'
import * as R from 'ramda'
import { connect } from 'react-redux'

import { white, lightGray } from '../utils/colors'
import { getDecks } from '../utils/api'
import UniversalBtn from './UniversalBtn'
import { handleAddDeck } from '../actions/shared'

class NewDeck extends Component {
  state = {
    deck: '',
    submitting: false
  }

  submit = () => {
    const { deck } = this.state

    // Delete spaces in the title and combine them into one
    const noSpace = n => n !== ' '
    const noSpaceArray = R.filter(noSpace)(deck)
    const key = R.join('')(noSpaceArray)
    
    const entry = {
      title: deck,
      questions: []
    }

    this.validateNewDeck(key, entry)
  }

  validateNewDeck = (key, entry) => {
    const { dispatch, navigation } = this.props

    this.setState(
      {submitting: true}, 
      async () => {
        const decks = await getDecks()
        const keys = Object.keys(decks).map(key => R.toLower(key))

        if (keys.indexOf(R.toLower(key)) !== -1) {
          alert('Deck with the same name already exists')

          this.setState({
            submitting: false,
            deck: ''
          })
        } else {
          await dispatch(handleAddDeck({ key, entry }))
            
          this.setState({
            submitting: false,
            deck: ''
          }, () => {
            navigation.navigate(
              'Deck', 
              { deckId: key }
            )
          })
        }
      }
    )
  }

  render() {
    const { deck, submitting } = this.state

    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={[styles.flex, styles.container]}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
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
        </ScrollView>
      </KeyboardAvoidingView>
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
