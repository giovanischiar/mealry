export interface Meal {
	id: string;
	date: number;
	images: string[];
	description: string;
}

export interface DayMeal {
	day: number;
	meals: Meal[];
}

export interface MealsProps {
	dayMeals: DayMeal[];
	loadMeals: () => {};
	selectMeal: (meal: Meal) => {};
}

export interface MealProps {
	dayMeal: DayMeal;
	onPressMeal: (meal: Meal) => void;
}

export interface MealListProps {
	dayMeals: DayMeal[];
	onPressMeal: (meal: Meal) => void;
}

export interface MealItemProps {
	meal: Meal;
	collapsed: boolean;
	onPress: () => void;
}
