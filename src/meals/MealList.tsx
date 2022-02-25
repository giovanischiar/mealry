import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem, Text, Button } from 'react-native';

import { DayMeal } from './MealsInterfaces';
import { MealItem } from './MealItem';

const mealRenderer: ListRenderItem<DayMeal> = ({item}) => {
	const { day, dayDate, separator } = styles;
	return (
		<View style={day}>
			<Text style={dayDate}>{new Date(item.day).toLocaleDateString()}</Text>
			<FlatList
				data={item.meals}
				renderItem={meal => <MealItem meal={meal.item} />}
				ItemSeparatorComponent={() => <View style={separator}/>}
			/>
		</View>
	)
}

export const MealList = (props: {meals: DayMeal[]}) => {
	const { separator } = styles;
	return (
		<FlatList<DayMeal>
			data={props.meals}
			renderItem={mealRenderer}
			ItemSeparatorComponent={() => <View style={separator}/>}
		/>
	)
};

const styles = StyleSheet.create({
	day: {
		flex: 1,
		backgroundColor: '#ededed', 
		paddingBottom: 15, 
		borderRadius: 5, 
		overflow: 'hidden'
	},

	dayDate: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		padding: 15,
		borderRadius: 5,
		marginBottom: 15,
		color: 'black'
	},

	separator: {
		height: 30
	}
});
