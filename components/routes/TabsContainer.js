import React from 'react'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Platform } from 'react-native'

import Dashboard from "../Dashboard"
import NewDeck from '../NewDeck'
import { white, purple } from '../../utils/colors'

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

export default TabsContainer