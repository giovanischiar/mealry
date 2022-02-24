import { ACTIONS, Action } from './interfaces';
import { Meal } from '../meals/MealsInterfaces';

const INITIAL_STATE = {
	meals: [] as Meal[]
}

export type State = typeof INITIAL_STATE;

export const rootReducer = (state: State = INITIAL_STATE, action: Action): State => {
	switch (action.type) {
		case ACTIONS.LOAD_MEALS: return {...state, meals: action.payload }
	}

	return state
}
