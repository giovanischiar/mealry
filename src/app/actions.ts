import { ACTIONS } from './interfaces';
import * as json from '../../resources/json/meals.json';
import { store } from './routing';

export const loadMeals = () => {
	return {type: ACTIONS.LOAD_MEALS, payload: json.meals}
}

export const addMeal = (date: number, images: string[], description: string) => {
	const dayMeals = store.getState().dayMeals;
	let newDaymeals = [...dayMeals]
	const newDayMeal = {day: date, meals: [{date, images, description}]}; //TODO day logic
	let dayAlreadyRegistered = false
	for (var i = 0; i < dayMeals.length; i++) {
		if (newDaymeals[i].day.toString().substr(0, 7) === newDayMeal.day.toString().substr(0, 7)) {
			newDaymeals[i].meals = [...dayMeals[i].meals, ...newDayMeal.meals];
			dayAlreadyRegistered = true
		}
	}
	if (!dayAlreadyRegistered) {
		newDaymeals = [...newDaymeals, newDayMeal];
	}
	return {type: ACTIONS.LOAD_MEALS, payload: newDaymeals};
}
