import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem, Text, TouchableOpacity, ListRenderItemInfo } from 'react-native';

import { SURFACE_COLOR, CONTRAST_COLOR } from '../res/theme';
import { DayMeal } from './MealsInterfaces';
import { MealItem } from './MealItem';

let isCollapsed = false;

const Meal = ({dayMeal}: {dayMeal: DayMeal}) => {
	const [collapsed, isCollapsed] = useState(true);
	const collapse = () => {
		isCollapsed(!collapsed);
	}
	const { dayWrapper, day, dayDate, separator } = styles;
	return (
		<View style={dayWrapper}>
			<TouchableOpacity onPress={collapse} style={day}>
				<Text style={{color: CONTRAST_COLOR}}>{!collapsed ? "\\/" : ">"}</Text>
				<Text style={dayDate}>{new Date(dayMeal.day).toLocaleDateString()}</Text>
			</TouchableOpacity>
			<FlatList
				data={dayMeal.meals}
				renderItem={meal => <MealItem meal={meal.item} collapsed={collapsed}/>}
				ItemSeparatorComponent={() => <View style={separator}/>}
				horizontal={collapsed}
			/>
		</View>
	)
}

export const MealList = (props: {dayMeals: DayMeal[]}) => {
	const { separator } = styles;
	return (
		<FlatList<DayMeal>
			data={props.dayMeals}
			renderItem={item => <Meal dayMeal={item.item}/>}
			ItemSeparatorComponent={() => <View style={separator}/>}
		/>
	)
};

const styles = StyleSheet.create({
	dayWrapper: {
		backgroundColor: SURFACE_COLOR,
		paddingBottom: 15
	},

	day: {
		flexDirection: 'row',
		borderRadius: 5, 
		overflow: 'hidden',
		alignItems: 'center',
		padding: 15,
		backgroundColor: SURFACE_COLOR
	},

	dayDate: {
		fontSize: 16,
		fontWeight: 'bold',
		borderRadius: 5,
		color: CONTRAST_COLOR,
		marginLeft: 15
	},

	separator: {
		height: 15,
		width: 15
	}
});
