import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { MealsProps } from './MealsInterfaces';
import { MealList } from './MealList';

export const Meals = (props: MealsProps) => {
	const { meals, loadMeals } = props;
	const { bar, screen, title } = styles;

	return (
		<SafeAreaView style={{backgroundColor: '#1B5E20'}}>
			<TouchableOpacity style={bar} onPress={loadMeals}><Text style={title}>Meals</Text></TouchableOpacity>
			<View style={screen}>
				<MealList {...{meals}}/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	bar: {
		height: 34,
		paddingStart: 15,
		paddingEnd: 15,
		justifyContent: 'center'
	},

	screen: {
		backgroundColor: 'white'
	},

	title: {
		fontSize: 20,
		color: 'white'
	}
});
