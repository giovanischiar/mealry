import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import { MealsProps } from './MealsInterfaces';
import { MealList } from './MealList';

export const Meals = (props: MealsProps) => {
	const { meals, loadMeals } = props;
	const { screen, title } = styles;

	return (
		<SafeAreaView style={screen}>
			<Button title="Click here to load the meals" onPress={loadMeals}/>
			<Text style={title}>Meals</Text>
			<MealList {...{meals}}/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		margin: 15
	},

	title: {
		marginBottom: 20,
		fontSize: 20
	}
});
