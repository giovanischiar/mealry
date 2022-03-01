import { Navigation } from "react-native-navigation";
import App, {AddMealsButton} from './src/app/App';
import CreateMeal from './src/create_meal/CreateMealContainer';

Navigation.setDefaultOptions({
	statusBar: {
		style: 'light'
	}
});
Navigation.registerComponent('Meals', () => App);
Navigation.registerComponent('CreateMeal', () => CreateMeal);
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
