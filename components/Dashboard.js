import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  AsyncStorage,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks';
import DeckCard from './DeckCard';
import { handleInitializeStatus } from '../actions/deckStatus';

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props
  
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
          extraData={deckKeys}
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

const mapStateToProps = ({ decks, deckStatus }) => {
  const deckKeys = decks ? Object.keys(decks) : null;

  return {
    decks,
    deckKeys,
    deckStatus
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(mapStateToProps)(Dashboard)
