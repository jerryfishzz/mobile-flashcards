import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import Constants from 'expo-constants'

import reducer from './reducers'
import { purple } from './utils/colors'
import middleware from './middleware'
import { setLocalNotification } from './utils/helpers'
import MainNavigator from './components/routes/MainNavigator';

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, composeEnhancers(middleware))}>
        <View style={styles.flex}>
          <FlashcardStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
