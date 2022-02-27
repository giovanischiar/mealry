import { Navigation } from "react-native-navigation";
import App from './src/app/App';

App.options = {
  topBar: {
    title: {
      text: 'Meals',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
}

Navigation.setDefaultOptions({
	statusBar: {
		style: 'light'
	}
});

Navigation.registerComponent('io.schiar.mealry', () => App);
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'io.schiar.mealry'
             },
           }
         ]
       }
     }
  });
});
