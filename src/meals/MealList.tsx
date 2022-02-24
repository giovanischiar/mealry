import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';

import { Meal } from './MealsInterfaces';
import { MealItem } from './MealItem';

const mealRenderer: ListRenderItem<Meal> = ({item}) => <MealItem {...{item}} />

export const MealList = (props: {meals: Meal[]}) => {
	const { separator } = styles;
	return (
		<FlatList<Meal>
			data={props.meals}
			renderItem={mealRenderer}
			ItemSeparatorComponent={() => <View style={separator}/>}
		/>
	);
}

const styles = StyleSheet.create({
	separator: {
		height: 10
	}
});
