import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform
} from 'react-native'
import { white, purple, green, red } from '../utils/colors';
import SubmitBtn from './SubmitBtn';

const SubmitBotton = ({ correctness, onPress }) => {
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
    >
      <Text style={styles.submitBtnText}>{correctness ? 'Correct' : 'Incorrect'}</Text>
    </TouchableOpacity>
  )
}

const FlipCard = ({ item, frontAnimatedStyle, backAnimatedStyle, zFront }) => {
  
  return (
    <View>
      <Animated.View style={[styles.card, frontAnimatedStyle, zFront]}>
        <View style={styles.cardText}>  
          <Text style={styles.cardTextMain}>{item.question}</Text>
          
          
        </View>
        <SubmitBtn />
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <View style={styles.cardText}> 
          <Text style={styles.cardTextSecondary}>{item.answer ? 'True' : 'False'}</Text>
        </View>
        <SubmitBtn />
      </Animated.View>
    </View>
  )
}


class CarousalCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      correctness : true,
      // value: 0
    }

    this.animatedValue = new Animated.Value(0)

    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
      // this.setState({value})
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners()
  }

  flipCard = () => {
    console.log(99999)
    const { correctness } = this.state

    // if (correctness !== null ) {
      if (this.value >= 90) {
        Animated.spring(this.animatedValue, {
          toValue: 0,
          friction: 8,
          tension: 10
        }).start()
      } else {
        Animated.spring(this.animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 10
        }).start()
      }
    // }
  }

  render() {
    // console.log(123)
    const { correctness } = this.state

    const frontAnimatedStyle = {
      transform: [
        {rotateX: this.frontInterpolate}
      ]
    }

    const backAnimatedStyle = {
      transform: [
        {rotateX: this.backInterpolate}
      ]
    }

    const zFront = correctness === null
      ? {zIndex: 1}
      : null 

    const { item } = this.props
          
    if (correctness !== null) {
      return (
        <TouchableOpacity 
          onPress={this.flipCard}
        >
          <FlipCard 
            item={item}
            frontAnimatedStyle={frontAnimatedStyle}
            backAnimatedStyle={backAnimatedStyle}
            zFront={zFront}
          />
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <FlipCard 
          item={item}
          frontAnimatedStyle={frontAnimatedStyle}
          backAnimatedStyle={backAnimatedStyle}
          zFront={zFront}
        />
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
        >
          <Text style={styles.submitBtnText}>{correctness ? 'Correct' : 'Incorrect'}</Text>
        </TouchableOpacity>
      </View>
      
    )
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
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    zIndex: 0
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

export default CarousalCard