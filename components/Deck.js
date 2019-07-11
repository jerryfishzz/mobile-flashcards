import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'


class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } =  navigation.state.params

    return {
      headerTitle: 'Questions',
      headerRight: (
        <Button
          onPress={() => navigation.navigate(
            'NewQuestion',
            {deckId}
          )}
          title="New"
          color="#000"
        />
      ),
    }
  }

  render() {
    const { deckId, deck, navigation } = this.props

    return (
      <View>
        <Text>{deckId}</Text>
        <Text>{deck.questions.length}</Text>
        {deck.questions.length 
          ? <Button
              onPress={() => navigation.navigate(
                'QuestionStack',
                {deckId}
              )}
              title="Quiz"
              color="#000"
            />
          : null
        }
      </View>
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { deckId } = navigation.state.params
  const deck = decks[deckId]

  return {
    deckId,
    deck,
    navigation
  }
}

export default connect(mapStateToProps)(Deck)
