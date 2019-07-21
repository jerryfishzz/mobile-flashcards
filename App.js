import React, { Component } from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { 
  createStackNavigator, 
  createAppContainer,
  createBottomTabNavigator, 
} from 'react-navigation'
import Constants from 'expo-constants'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import reducer from './reducers'
import { white, purple } from './utils/colors'
import Dashboard from './components/Dashboard'
import QuestionStack from './components/QuestionStack'
import NewQuestion from './components/NewQuestion'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import middleware from './middleware'
import { setLocalNotification } from './utils/helpers'

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Dashboard,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => 
        <MaterialCommunityIcons 
          name='library-books' 
          size={30} 
          color={tintColor} 
        />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => 
        <MaterialIcons 
          name='library-add' 
          size={30} 
          color={tintColor} 
        />
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
    screen: TabsContainer,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Home'
    },
  },
  Deck: {
    screen: Deck,
  },
  QuestionStack: {
    screen: QuestionStack
  },
  NewQuestion: {
    screen: NewQuestion
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: purple
    }
  }
})

const MainNavigator = createAppContainer(Stack)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
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
