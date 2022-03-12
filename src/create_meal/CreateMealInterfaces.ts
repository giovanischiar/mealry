import { Meal } from '../meals/MealsInterfaces';

export interface CreateMealsProps {
	addMeal: (date: number, images: string[], description: string) => {}
	currentMeal?: Meal
}