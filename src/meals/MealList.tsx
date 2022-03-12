import React, { useState } from 'react';
import { 
	StyleSheet, 
	View, 
	FlatList, 
	ListRenderItem, 
	Text, 
	TouchableOpacity, 
	ListRenderItemInfo 
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { SURFACE_COLOR, CONTRAST_COLOR } from '../res/theme';
import { DayMeal, Meal as MealData } from './MealsInterfaces';
import { MealItem } from './MealItem';

let isCollapsed = false;

const Meal = ({dayMeal, onPressMeal}: {dayMeal: DayMeal, onPressMeal: (meal: MealData) => void}) => {
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
			<FlatList<MealData>
				data={dayMeal.meals}
				renderItem={meal => (
					<MealItem meal={meal.item} collapsed={collapsed} onPress={() => {onPressMeal(meal.item); openCreateMeal(meal.item)}}/>
				)}
				ItemSeparatorComponent={() => <View style={separator}/>}
				horizontal={collapsed}
			/>
		</View>
	);
}

const openCreateMeal = async (currentMeal: MealData) => {
  const opts = {
    component: {
      name: 'CreateMeal',
      passProps: { currentMeal }
    }
  }

  await Navigation.push('Meals', opts);
}

export const MealList = (props: {dayMeals: DayMeal[], onPressMeal: (meal: MealData) => void}) => {
	const { separator } = styles;
	return (
		<FlatList<DayMeal>
			data={props.dayMeals}
			renderItem={item => <Meal dayMeal={item.item} onPressMeal={props.onPressMeal}/>}
			ItemSeparatorComponent={() => <View style={separator}/>}
		/>
	);
}

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
