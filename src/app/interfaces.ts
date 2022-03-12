import { Action as GenericAction } from 'redux';
import { Meal, DayMeal } from '../meals/MealsInterfaces';

export const ACTIONS = {
	LOAD_MEALS: 'LOAD_MEALS',
	SELECT_MEAL: 'SELECT_MEAL'
}

export interface State {
	dayMeals: DayMeal[],
	currentMeal: Meal
}

export interface Action extends GenericAction {
	payload: DayMeal[] | Meal
}
