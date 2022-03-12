import { ACTIONS, Action } from './interfaces';
import { DayMeal, Meal } from '../meals/MealsInterfaces';

const INITIAL_STATE = {
	dayMeals: [] as DayMeal[],
	currentMeal: undefined as Meal | undefined
}

export type State = typeof INITIAL_STATE;

export const rootReducer = (state: State = INITIAL_STATE, action: Action): State => {
	switch (action.type) {
		case ACTIONS.LOAD_MEALS: return {...state, dayMeals: action.payload }
		case ACTIONS.SELECT_MEAL: return {...state, currentMeal: action.payload }
	}

	return state
}
