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
import { addQuestion, addDeck } from '../actions';
import { addQuestionToDeck, addDeckToApp } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import * as R from 'ramda'

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

class NewDeck extends Component {
  state = {
    deck: '',
    submitting: false
  }

  submit = () => {
    const { deck } = this.state
    const { dispatch } = this.props

    const noSpace = n => n !== ' '
    const noSapceArray = R.filter(noSpace)(deck)
    const key = R.join('')(noSapceArray)
    

    const entry = {
      title: deck,
      questions: []
    }

    this.setState(
      {submitting: true}, // Need to check work or not
      () => {
        addDeckToApp({ entry, key })
          .then(() => {
            dispatch(addDeck(key, entry))
            this.setState({submitting: false})
          })
      }
    )
    
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: "Decks" }))
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
        <Text>New Deck</Text>
        <View 
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
          }}
        >
          <TextInput
            multiline={true}
            maxLength = {60}
            onChangeText={(deck) => this.setState({deck})}
            value={this.state.deck}
            style={{width: 100, height: 20}}
          />
        </View>
        <SubmitBtn submitting={this.state.submitting} onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

// const mapStateToProps = (decks, { navigation }) => {
//   const { deckId } =  navigation.state.params

//   return {
//     decks,
//     questions: decks[deckId].questions,
//     deckId
//   }
// }

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

export default connect()(NewDeck)
