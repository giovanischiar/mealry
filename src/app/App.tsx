import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Meals from '../meals/MealsContainer';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider {...{store}}>
      <Meals/>
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
