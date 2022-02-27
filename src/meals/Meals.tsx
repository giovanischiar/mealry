import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { MealsProps } from './MealsInterfaces';
import { MealList } from './MealList';

export const Meals = (props: MealsProps) => {
	const { meals, loadMeals } = props;
	const { bar, screen, title } = styles;

	return (
		<SafeAreaView style={{flex: 1}}>
			<TouchableOpacity style={bar} onPress={loadMeals}><Text style={title}>Click here to load the meals</Text></TouchableOpacity>
			<View style={screen}>	
				<MealList {...{meals}}/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	bar: {
	},

	screen: {
		flex: 1,
		backgroundColor: 'white'
	},

	title: {
		fontSize: 20,
		color: 'black',
		marginBottom: 5,
	}
});
