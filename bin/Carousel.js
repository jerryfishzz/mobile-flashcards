import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Platform,
  TouchableOpacity,
  Animated
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { getDeck } from '../utils/api';
import { white, purple, green, red } from '../utils/colors';
import CarousalCard from './CarousalCard';


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


function SubmitBtn({ correctness, onPress }) {
  return (
    <TouchableOpacity
      style={
        [
          Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.andriodSubmitBtn,
          correctness
            ? {backgroundColor: green}
            : {backgroundColor: red}
        ]
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>{correctness ? 'Correct' : 'Incorrect'}</Text>
    </TouchableOpacity>
  )
}

export class MyCarousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entries: []
    }

    // this.animatedValue = new Animated.Value(0)

    // this.value = 0
    // this.animatedValue.addListener(({ value }) => {
    //   this.value = value
    // })

    // this.frontInterpolate = this.animatedValue.interpolate({
    //   inputRange: [0, 180],
    //   outputRange: ['0deg', '180deg']
    // })
    // this.backInterpolate = this.animatedValue.interpolate({
    //   inputRange: [0, 180],
    //   outputRange: ['180deg', '360deg']
    // })
  } 
    

  componentDidMount() {
    getDeck('CommonSense')
      .then(deck => {
        const entries = deck.questions
        this.setState({entries})
      })
  }

  // componentWillUnmount() {
  //   this.state.pan.x.removeAllListeners();
  //   this.state.pan.y.removeAllListeners();
  // }

  // _renderItem ({item, index}) {
  //   return (
  //     <View>
  //       <Animated.View style={[styles.card, frontAnimatedStyle]}>
  //         <View style={styles.cardText}>  
  //           <Text style={styles.cardTextMain}>{item.question}</Text>
  //           <SubmitBtn onPress={this.submit} correctness={true} />
  //           <SubmitBtn onPress={this.submit} correctness={false} />
  //         </View>
  //       </Animated.View>
  //       <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
  //         <View style={styles.cardText}> 
  //           <Text style={styles.cardTextSecondary}>{item.answer ? 'True' : 'False'}</Text>
  //         </View>
  //       </Animated.View>
  //     </View>
      
  //   );
  // }

  submit = () => {

  }

  // flipCard = () => {
  //   if (this.value >= 90) {
  //     Animated.spring(this.animatedValue, {
  //       toValue: 0,
  //       friction: 8,
  //       tension: 10
  //     }).start()
  //   } else {
  //     Animated.spring(this.animatedValue, {
  //       toValue: 180,
  //       friction: 8,
  //       tension: 10
  //     }).start()
  //   }
  // }

  render () {
    // const frontAnimatedStyle = {
    //   transform: [
    //     {rotateX: this.frontInterpolate}
    //   ]
    // }

    // const backAnimatedStyle = {
    //   transform: [
    //     {rotateX: this.backInterpolate}
    //   ]
    // }

    return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entries}
          renderItem={({item, index}) => (
            <CarousalCard item={item} />
          )}
          sliderWidth={viewportWidth}
          itemWidth={viewportHeight}
        />
        {/* <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: 350,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    overflow: 'hidden',
    backfaceVisibility: 'hidden'
  },
  cardBack: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0
  },
  cardText: {
    margin: 20
  },
  cardTextMain: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  cardTextSecondary: {
    textAlign: 'left',
    fontSize: 15,
    color: 'grey',
    backgroundColor: 'transparent'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  andriodSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
})