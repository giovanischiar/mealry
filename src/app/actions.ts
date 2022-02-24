import { ACTIONS } from './interfaces';
import * as json from '../../resources/json/meals.json';

export const loadMeals = () => {
	return {type: ACTIONS.LOAD_MEALS, payload: json.meals}
}
