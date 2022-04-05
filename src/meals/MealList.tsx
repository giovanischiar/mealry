import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Separator } from '../components/Separator';
import { DayMeal, Meal as MealData, MealListProps } from './MealsInterfaces';
import { Meal } from './Meal';

export const MealList = (props: MealListProps) => {
	const renderMeal = (item: ListRenderItemInfo<DayMeal>) => {
		return <Meal dayMeal={item.item} onPressMeal={props.onPressMeal}/>
	}
	const itemSeparator = () => <Separator/>;

	return (
		<FlatList<DayMeal>
			data={props.dayMeals}
			renderItem={renderMeal}
			ItemSeparatorComponent={itemSeparator}
		/>
	);
}
