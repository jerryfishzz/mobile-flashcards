import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Dashboard from './components/Dashboard'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import QuestionCard from './components/QuestionCard';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import QuestionStack from './components/QuestionStack';
import CardStack from './components/CardStack';
import { MyCarousel } from './components/Carousel';
import SubmitBtn from './components/SubmitBtn';
import NewQuestion from './components/NewQuestion'
import Test from './components/Test';

const Stack = createStackNavigator({
  Home: {
    screen: Dashboard
  },
  QuestionStack: {
    screen: QuestionStack
  },
  NewQuestion: {
    screen: NewQuestion
  }
})

const MainNavigator = createAppContainer(Stack)

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <MainNavigator />
        {/* <Test /> */}
        {/* <QuestionStack /> */}
        {/* <CardStack /> */}
        {/* <QuestionStack /> */}
        {/* <MyCarousel /> */}
        {/* <SubmitBtn /> */}
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
