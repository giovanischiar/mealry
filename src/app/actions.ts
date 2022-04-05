import { ACTIONS } from './interfaces';
import * as json from '../../resources/json/meals.json';
import { store } from './routing';
import { Meal, DayMeal } from '../meals/MealsInterfaces';

export const loadMeals = () => {
	const dayMeals = json.meals;
	const dayMealsLoaded = dayMeals.map(dayMeal => {
		return dayMeal.meals.map((meal: Meal) => {
			return { ...meal, id: String(Math.random() * Number.MAX_VALUE) }
		})
	});
	console.log(JSON.stringify(dayMealsLoaded));
	return {type: ACTIONS.LOAD_MEALS, payload: json.meals}
}

export const addMeal = (id: string, date: number, images: string[], description: string) => {
	console.log(id, date, images, description);
	const dayMeals = store.getState().dayMeals;
	let newDaymeals = [...dayMeals]
	let newDayMeal = {day: date, meals: [{id: id != "" ? id : String(Math.random() * 1000), date, images, description}]};
	if (id != "") {
		for (var i = 0; i < dayMeals.length; i++) {
			const dayMeal = dayMeals[i];
			for (var j = 0; j < dayMeal.meals.length; j++) {
				const meal = dayMeal.meals[j];
				if (meal.id === id) {
					const newMeal = newDayMeal.meals[0]
					newDaymeals[i].meals = [...newDaymeals[i].meals.slice(0, j), newMeal, ...newDaymeals[i].meals.slice(j+1, newDaymeals[i].meals.length)]
				}
			}
		}
	} else {
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
	}

	return {type: ACTIONS.LOAD_MEALS, payload: newDaymeals};
}

export const selectMeal = (meal: Meal) => {
	return { type: ACTIONS.SELECT_MEAL, meal}
}
