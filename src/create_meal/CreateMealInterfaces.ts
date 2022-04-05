import { Meal } from '../meals/MealsInterfaces';

export interface CreateMealsProps {
	addMeal: (id: string, date: number, images: string[], description: string) => {};
	currentMeal?: Meal;
}
