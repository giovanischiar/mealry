import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App, { AddMealsButton } from './App';
import CreateMeal from '../create_meal/CreateMealContainer';
import { rootReducer } from './reducers';
import { State } from './interfaces';

export const store = createStore(rootReducer);
export const start = () => {
	Navigation.setDefaultOptions({
		statusBar: {
			style: 'light'
		}
	});
	Navigation.registerComponentWithRedux('Meals', () => App, Provider, store);
	Navigation.registerComponentWithRedux('CreateMeal', () => CreateMeal, Provider, store);
	Navigation.registerComponent('AddMealsButton', () => AddMealsButton);
	Navigation.events().registerAppLaunchedListener(() => {
	   Navigation.setRoot({
	     root: {
	       stack: {
	         children: [
	           {
	             component: {
	               id: 'Meals',
	               name: 'Meals'
	             },
	           }
	         ]
	       }
	     }
	  });
	});
}