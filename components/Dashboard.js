import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  AsyncStorage,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'

import { getDecks, uuidv1 } from '../utils/api'
import { receiveDecks } from '../actions';
import DeckCard from './DeckCard';
import { handleInitializeStatus } from '../actions/deckStatus';

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    // AsyncStorage.clear() This will lead to error in IOS
  
    AsyncStorage.getAllKeys()
      .then(AsyncStorage.multiRemove)
      .then(getDecks)
      .then(decks => {
        dispatch(receiveDecks(decks))
        dispatch(handleInitializeStatus(decks))
      })
  }

  render() {
    const { decks, deckKeys, ...others } = this.props

    if (decks === null) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList 
          data={deckKeys}
          renderItem={({ item }) => (
            <DeckCard
              id={item}
              {...others}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = ({ decks, deckStatus }) => {
  const deckKeys = decks ? Object.keys(decks) : null;

  return {
    decks,
    deckKeys,
    deckStatus
  }
}

export default connect(mapStateToProps)(Dashboard)
