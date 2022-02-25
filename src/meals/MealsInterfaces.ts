export interface Meal {
	date: number,
	images: string[],
	description: string
}

export interface DayMeal {
	day: number,
	meals: Meal[]
}

export interface MealsProps {
	meals: DayMeal[];
	loadMeals: () => {}
}
