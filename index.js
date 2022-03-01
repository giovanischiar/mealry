import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App, {AddMealsButton} from './src/app/App';
import CreateMeal from './src/create_meal/CreateMealContainer';
import { rootReducer } from './src/app/reducers';

export const store = createStore(rootReducer);

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
