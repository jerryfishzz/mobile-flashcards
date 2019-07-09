import React, { Component } from 'react'
import { View, Text, FlatList, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard';
import Styles from './Styles.js';
import * as R from 'ramda'
import { getDeck } from '../utils/api';
import Carousel from 'react-native-snap-carousel';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class QuestionStack extends Component {
  state = {
    questionsInUse: []
  }

  componentDidMount() {
    // const { questions } = this.props

    // this.setState({questionsInUse: questions})

    getDeck('CommonSense')
      .then(deck => {
        const questions = deck.questions
        this.setState({questionsInUse: questions})
      })
  }

  render() {
    const { questionsInUse } = this.state

    if (questionsInUse.length === 0) {
      return <View><Text>Loading</Text></View>
    }

    return (
      <Carousel
        ref={(c) => {this._carousel = c}}
        data={this.state.questionsInUse}
        renderItem={({item, index}) => (
          <QuestionCard item={item} />
        )}
        sliderWidth={viewportWidth}
        itemWidth={viewportHeight}
      />
    )
  }
}

// const mapStateToProps = (decks, { navigation }) => {
//   const { deckId } =  navigation.state.params
//   // console.log(deckId)
//   // console.log(2222222)

//   return {
//     decks,
//     questions: R.reverse(decks[deckId].questions)
//   }
// }

// export default connect(mapStateToProps)(QuestionStack)

export default QuestionStack
