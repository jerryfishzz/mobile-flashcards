import React, { Component } from 'react'
import { 
  View, 
  Text, 
  FlatList, 
  Platform, 
  Dimensions,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel';

import QuestionCard from './QuestionCard';

const { width: viewportWidth } = Dimensions.get('window');

const QuestionStack = ({ questions }) => (
  <Carousel
    ref={(c) => {this._carousel = c}}
    data={questions}
    renderItem={({item, index}) => (
      <QuestionCard item={item} />
    )}
    sliderWidth={viewportWidth}
    itemWidth={viewportWidth}
  />
)
  
const mapStateToProps = (decks, { navigation }) => {
  const { deckId } =  navigation.state.params

  return {
    decks,
    questions: decks[deckId].questions,
  }
}

export default connect(mapStateToProps)(QuestionStack)
