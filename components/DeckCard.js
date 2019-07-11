import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

const DeckCard = ({ id, deck, navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Deck', { deckId: id })}
    >
      <View style={styles.item}>
        <Text>{id}</Text>
        <Text>{deck.questions.length}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

const mapStateToProps = (decks, { id }) => {
  const deck = decks[id]
  // console.log(deck)

  return {
    id,
    deck
  }
}

export default connect(mapStateToProps)(DeckCard)
