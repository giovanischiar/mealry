import { ACTIONS, Action } from './interfaces';
import { DayMeal } from '../meals/MealsInterfaces';

const INITIAL_STATE = {
	dayMeals: [] as DayMeal[]
}

export type State = typeof INITIAL_STATE;

export const rootReducer = (state: State = INITIAL_STATE, action: Action): State => {
	switch (action.type) {
		case ACTIONS.LOAD_MEALS: return {...state, dayMeals: action.payload }
	}

	return state
}
