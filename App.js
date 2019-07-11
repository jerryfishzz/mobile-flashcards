import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Dashboard from './components/Dashboard'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import QuestionCard from './components/QuestionCard';
import { 
  createStackNavigator, 
  createAppContainer,
  createBottomTabNavigator, 
} from 'react-navigation';
import QuestionStack from './components/QuestionStack';
import CardStack from './components/CardStack';
import { MyCarousel } from './components/Carousel';
import SubmitBtn from './components/SubmitBtn';
import NewQuestion from './components/NewQuestion'
import Test from './components/Test';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import { white, purple, green, red, gray } from './utils/colors'

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const TabsContainer = createAppContainer(Tabs)

const Stack = createStackNavigator({
  Home: {
    screen: TabsContainer
  },
  Deck: {
    screen: Deck
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
