import React from 'react'
import { 
  TouchableOpacity, 
  Platform, 
  Text,
  StyleSheet,
} from 'react-native'
import { white, purple, gray } from '../utils/colors'
import * as R from 'ramda'

const UniversalBtn = ({ 
  disabled, 
  onPress, 
  layouts, 
  content,
  btnValue,
}) => {
  const btnText = R.toUpper(content)

  return (
    <TouchableOpacity
      style={[
        Platform.OS === 'ios' 
          ? styles.iosSubmitBtn 
          : styles.andriodSubmitBtn,
        layouts,
        disabled
          ? {backgroundColor: gray}
          : null,
      ]}
      onPress={() => onPress(btnValue)}
      disabled={disabled}
    >
      <Text style={styles.universalBtnText}>{btnText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  universalBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})

export default UniversalBtn
