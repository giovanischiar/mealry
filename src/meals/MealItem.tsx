import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Text} from 'react-native';

import { Meal } from './MealsInterfaces';

export const MealItem = (props: {item: Meal}) => {
	const { mealWrapper } = styles;
	const { item } = props;
	return (
		<TouchableOpacity onPress={() => Alert.alert("", "yaay")}>
			<View style={mealWrapper}>
				<Text>{item.date}</Text>
				<Text>{item.image}</Text>
				<Text>{item.description}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	mealWrapper: {
		borderWidth: 1
	}
});