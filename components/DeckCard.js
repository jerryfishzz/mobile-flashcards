import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { gray } from '../utils/colors'

const DeckCard = ({ id, deck, navigation }) => {
  if (!deck) return null

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate(
        'Deck', 
        { deckId: id })
      }
    >
      <View style={styles.item}>
        <Text style={styles.titleText}>{deck.title}</Text>
        <Text style={styles.subtitleText}>
          {`Cards: ${deck.questions.length}`}
        </Text>
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
    // justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
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
  }
})

const mapStateToProps = ({ decks } , { id }) => {
  const deck = decks[id]

  return {
    id,
    deck
  }
}

export default connect(mapStateToProps)(DeckCard)
