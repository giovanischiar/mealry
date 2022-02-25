import { Action as GenericAction } from 'redux';
import { Meal, DayMeal } from '../meals/MealsInterfaces';

export const ACTIONS = {
	LOAD_MEALS: "LOAD_MEALS"
}

export interface State {
	dayMeals: DayMeal[]
}

export interface Action extends GenericAction {
	payload: DayMeal[]
}
