import React, {useState} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { SURFACE_COLOR, CONTRAST_COLOR } from '../res/theme';
import { MealProps, Meal as MealData } from './MealsInterfaces';
import { MealItem } from './MealItem';

const openCreateMeal = async (currentMeal: MealData) => {
  const opts = {
    component: {
      name: 'CreateMeal',
      passProps: { currentMeal }
    }
  }

  await Navigation.push('Meals', opts);
}

export const Meal = ({dayMeal, onPressMeal}: MealProps) => {
	const { dayWrapper, day, dayDate, separator, collapsedIcon } = styles;
	const [collapsed, isCollapsed] = useState(true);
	const collapse = () => { isCollapsed(!collapsed); }
	const renderMealItemWithParams = (meal: MealData, onPressMeal: (meal: MealData) => void, collapsed: boolean) => {
		const onPress = () => {
			onPressMeal(meal); 
			openCreateMeal(meal);
		}

		return (
			<MealItem 
				meal={meal} 
				collapsed={collapsed} 
				onPress={onPress}
			/>
		);
	}
	const renderMealItem = (mealRenderItem: ListRenderItemInfo<MealData>) => {
		return renderMealItemWithParams(mealRenderItem.item, onPressMeal, collapsed);
	}
	const itemSeparator = () => <View style={separator}/>;
	const dateFormatted = new Date(dayMeal.day).toLocaleDateString();

	return (
		<View style={dayWrapper}>
			<TouchableOpacity onPress={collapse} style={day}>
				<Text style={collapsedIcon}>{!collapsed ? "\\/" : ">"}</Text>
				<Text style={dayDate}>{dateFormatted}</Text>
			</TouchableOpacity>
			<FlatList<MealData>
				data={dayMeal.meals}
				renderItem={renderMealItem}
				ItemSeparatorComponent={itemSeparator}
				horizontal={collapsed}
			/>
		</View>
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
	},

	collapsedIcon: {
		color: CONTRAST_COLOR
	}
});
