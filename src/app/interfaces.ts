import { Action as GenericAction } from 'redux';
import { Meal } from '../meals/MealsInterfaces';

export const ACTIONS = {
	LOAD_MEALS: "LOAD_MEALS"
}

export interface State {
	meals: Meal[]
}

export interface Action extends GenericAction {
	payload: Meal[]
}
