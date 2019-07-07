import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions';
import DeckCard from './DeckCard';


class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decks, ...others } = this.props

    if (!decks) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => (
          <DeckCard key={deck} id={deck} {...others} />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (decks) => {
  // console.log(33333)
  return {
    decks
  }
}

export default connect(mapStateToProps)(Dashboard)
