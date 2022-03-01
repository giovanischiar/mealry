import { ACTIONS } from './interfaces';
import * as json from '../../resources/json/meals.json';
import { store } from '../../index';

export const loadMeals = () => {
	return {type: ACTIONS.LOAD_MEALS, payload: json.meals}
}

export const addMeal = (date: number, images: string[], description: string) => {
	const dayMeals = store.getState().dayMeals;
	const newDayMeal = {day: date, meals: [{date, images, description}]}; //TODO day logic
	return {type: ACTIONS.LOAD_MEALS, payload: [...dayMeals, newDayMeal]};
}
