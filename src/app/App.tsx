import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Appearance } from 'react-native';
import { Navigation, Layout } from 'react-native-navigation';

import Meals from '../meals/MealsContainer';
import { rootReducer } from './reducers';

const App = () => {
  return <Meals/>;
};

const openCreateMeal = async () => {
  const opts = {
    component: {
      name: 'CreateMeal'
    }
  }

  await Navigation.push('Meals', opts);
}

export const AddMealsButton = () => (
  <TouchableOpacity onPress={openCreateMeal}>
    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginRight: Platform.OS === 'android' ? 15 : 0}}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
});

App.options = {
  topBar: {
    title: {
      text: 'Meals',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    },

    rightButtons: [
      {
        id: 'lala',
        component: {
          name: 'AddMealsButton'
        }
      }
    ]
  }
}

export default App;
