export interface Meal {
	date: number,
	image: string,
	description: string
}


export interface MealsProps {
	meals: Meal[];
	loadMeals: () => {}
}