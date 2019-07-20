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

import { white, gray, black, red } from '../utils/colors'
import UniversalBtn from './UniversalBtn'
import { removeDeckAndGoHome } from '../actions/shared';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } =  navigation.state.params

    return {
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
    Alert.alert(
      '',
      'Are you sure to delete it?',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => this.props.remove()},
      ]
    )
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.deck ? true : false
  }

  render() {
    const { deckId, navigation, deck } = this.props

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
            content="Start Quiz"
          />
          <UniversalBtn 
            onPress={this.confirmDelete}
            layouts={styles.delete}
            content="delete"
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]

  return {
    deckId,
    deck, 
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckId } = navigation.state.params
  const goHome = () => navigation.dispatch(NavigationActions.navigate({ 
      routeName: 'Decks'
    }))

  return {
    remove: () => dispatch(removeDeckAndGoHome(deckId, goHome)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
