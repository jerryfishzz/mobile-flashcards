import React from 'react'
import { 
  View, 
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import { white, purple, green, red, gray } from '../utils/colors'

const SubmitBtn = ({ btnName, correctness, onPress }) => (
  <TouchableOpacity
    style={
      [
        Platform.OS === 'ios' 
          ? styles.iosSubmitBtn 
          : styles.andriodSubmitBtn,
        btnName
          ? {backgroundColor: green}
          : {backgroundColor: red},
        correctness !== null
        ? {backgroundColor: gray}
        : null
      ]
    }
    onPress={() => onPress(btnName)}
    disabled={correctness !== null}
  >
    <Text style={styles.submitBtnText}>
      {btnName ? 'Correct' : 'Incorrect'}
    </Text>
  </TouchableOpacity>
)

const FlipCard = ({
  item, 
  frontAnimatedStyle, 
  backAnimatedStyle, 
  zFront,
  onPress,
  correctness
}) => (
  <View>
    <Animated.View style={[styles.card, frontAnimatedStyle, zFront]}>
      <View style={styles.cardText}>  
        <Text style={styles.cardTextMain}>{item.question}</Text>
      </View>
      <SubmitBtn btnName={true} correctness={correctness} onPress={onPress} />
      <SubmitBtn btnName={false} correctness={correctness} onPress={onPress} />
    </Animated.View>
    <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
      <View style={styles.cardText}> 
        <Text style={styles.cardTextSecondary}>{item.answer ? 'True' : 'False'}</Text>
      </View>
    </Animated.View>
  </View>
)

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
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  andriodSubmitBtn: {
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

export default FlipCard
