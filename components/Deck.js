import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, HeaderBackButton } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import * as R from 'ramda'

import { white, gray, black, red } from '../utils/colors'
import UniversalBtn from './UniversalBtn'
import { removeDeckAndGoHome } from '../actions/shared';
import { resetDeck } from '../actions/deckStatus';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } =  navigation.state.params

    return {
      // Add question button
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'NewQuestion',
            {deckId}
          )}
        >
          <Ionicons 
            name='ios-add-circle-outline' 
            size={30}
            color={white}
            style={{paddingRight: 10}}
          />
        </TouchableOpacity>
      ),
      headerBackTitle: 'Deck',

      // Customized back button
      headerLeft: (
        <HeaderBackButton 
          onPress={() => {
            navigation.dispatch(
              NavigationActions.navigate({ 
                routeName: 'Decks'
              })
            )
          }} 
          title='Home'
          backTitleVisible={true}
          tintColor={white}
        />
      ),
    }
  }

  confirmDelete = () => {
    const { dispatch, deck, deckId, goHome } = this.props

    Alert.alert(
      '',
      'Are you sure to delete it?',
      [
        {text: 'NO', style: 'cancel'},
        {
          text: 'YES', 
          onPress: () => {
            return dispatch(removeDeckAndGoHome(deckId, deck, goHome))
              .catch(err => alert(err))
          }
        },
      ]
    )
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.deck ? true : false
  }

  render() {
    const { deckId, navigation, deck, content, isResetable, dispatch } = this.props

    return (
      <View style={[styles.flex, styles.container]}>
        <View style={styles.flex}> 
          <Text style={styles.titleText}>{deck.title}</Text>
          <Text style={styles.subtitleText}>
            {`Cards: ${deck.questions.length}`}
          </Text>
        </View>
        
        <View style={styles.flex}>
          <UniversalBtn 
            disabled={deck.questions.length === 0}
            onPress={() => navigation.navigate(
              'QuestionStack', {
                deckId, 
                counts: deck.questions.length,
                current: '1'
              }
            )}
            layouts={styles.quiz}
            content={content}
          />
          <UniversalBtn 
            onPress={this.confirmDelete}
            layouts={styles.delete}
            content="delete"
          />
          {isResetable && 
            <UniversalBtn 
              onPress={() => dispatch(resetDeck(deckId))}
              layouts={{marginTop: 20}}
              content="reset quiz"
            />
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ decks, deckStatus }, { navigation }) => {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]
  const status = deckStatus[deckId]
  const choices = status ? status.questions.map(q => q.userChoice) : []
  
  // Dispalaying difference names for the same button
  const isNull = R.equals(null)
  const content = R.all(isNull)(choices)
      ? 'start quiz'
      : R.none(isNull)(choices)
        ? 'check results'
        : 'resume quiz'

  const goHome = () => navigation.dispatch(NavigationActions.navigate({ 
    routeName: 'Decks'
  }))

  return {
    deckId,
    deck,
    content,
    isResetable: !R.all(isNull)(choices), // Check whether to show the reset button
    goHome
  }
}

// const mapDispatchToProps = (dispatch, { navigation }) => {
//   const { deckId } = navigation.state.params
//   const goHome = () => navigation.dispatch(NavigationActions.navigate({ 
//       routeName: 'Decks'
//     }))

//   return {
//     remove: () => dispatch(removeDeckAndGoHome(deckId, goHome)),
//     dispatch
//   }
// }

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
  titleText: {
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  },
  subtitleText: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: gray
  },
  quiz: {
    backgroundColor: black,
    marginBottom: 20
  },
  delete: {
    backgroundColor: red,
    marginBottom: 20
  }
})

export default connect(mapStateToProps)(Deck)
