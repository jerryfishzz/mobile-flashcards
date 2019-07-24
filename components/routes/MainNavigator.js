import { createAppContainer, createStackNavigator } from 'react-navigation'

import TabsContainer from './TabsContainer'
import Deck from '../Deck'
import QuestionStack from '../QuestionStack'
import NewQuestion from '../NewQuestion'
import { white, purple } from '../../utils/colors'

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

export default MainNavigator