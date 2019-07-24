import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel';
import { HeaderBackButton } from 'react-navigation';

import QuestionCard from './QuestionCard'
import { white } from '../utils/colors'
import { resetDeck, resetZ } from '../actions/deckStatus'

const { width: viewportWidth } = Dimensions.get('window');

class QuestionStack extends Component {
  static navigationOptions = ({ navigation }) => {
    const { counts, current, resetZ } = navigation.state.params

    return {
      title: `${current} / ${counts}`,
      headerLeft: (
        <HeaderBackButton 
          onPress={() => {
            navigation.goBack()
            resetZ()
          }} 
          title='Deck'
          backTitleVisible={true}
          tintColor={white}
        />
      ),
    }
  }

  componentDidMount() {
    const { dispatch, navigation, deckId } = this.props
    navigation.setParams({ resetZ: () => dispatch(resetZ(deckId)) })
  }

  // Update the header to display which card you are working on when swiping
  updateTitle = slideIndex => {
    this.props.navigation.setParams({ current: (slideIndex + 1).toString() })
  }

  // Go back to the first card in the carousal and reset the deck to the initial status
  restartTest = () => {
    const { dispatch, deckId } = this.props

    this._carousel.snapToItem(0)
    dispatch(resetDeck(deckId))
  }
  
  render() {
    const { questions, ...others } = this.props

    // Use the carousal library react-native-snap-carousel here
    return (
      <Carousel
        ref={(c) => {this._carousel = c}}
        data={questions}
        extraData={questions}
        renderItem={({item, index}) => (
          <QuestionCard 
            item={item}
            restartTest={this.restartTest}
            {...others}
          />
        )}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        onBeforeSnapToItem={this.updateTitle}
      />
    )
  }
}  

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } =  navigation.state.params

  return {
    questions: decks[deckId].questions,
    deckId,
  }
}

export default connect(mapStateToProps)(QuestionStack)
