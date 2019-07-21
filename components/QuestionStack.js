import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel';
import { HeaderBackButton } from 'react-navigation';

import QuestionCard from './QuestionCard'
import { white } from '../utils/colors'
import { resetDeck } from '../actions/deckStatus'

const { width: viewportWidth } = Dimensions.get('window');

class QuestionStack extends Component {
  static navigationOptions = ({ navigation }) => {
    const { counts, current } = navigation.state.params

    return {
      title: `${current} / ${counts}`,
      headerLeft: (
        <HeaderBackButton 
          onPress={() => {
            navigation.goBack()
          }} 
          title='Deck'
          backTitleVisible={true}
          tintColor={white}
        />
      ),
    }
  }

  updateTitle = slideIndex => {
    this.props.navigation.setParams({current: (slideIndex + 1).toString()})
  }

  restartTest = () => {
    const { dispatch, deckId } = this.props

    this._carousel.snapToItem(0)
    dispatch(resetDeck(deckId))
  }
  
  render() {
    const { questions, ...others } = this.props

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
