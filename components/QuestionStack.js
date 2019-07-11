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
import QuestionCard from './QuestionCard';
import Styles from './Styles.js';
import * as R from 'ramda'
import { getDeck } from '../utils/api';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class QuestionStack extends Component {
  state = {
    questions: []
  }

  componentDidMount() {
    const { questions } = this.props

    this.setState({questions})
  }

  render() {
    const { questions } = this.state

    if (questions.length === 0) {
      return <View><Text>Loading</Text></View>
    }

    return (
      <Carousel
        ref={(c) => {this._carousel = c}}
        data={questions}
        renderItem={({item, index}) => (
          <QuestionCard item={item} />
        )}
        sliderWidth={viewportWidth}
        itemWidth={viewportHeight}
      />
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { deckId } =  navigation.state.params

  return {
    decks,
    questions: decks[deckId].questions,
  }
}

export default connect(mapStateToProps)(QuestionStack)
