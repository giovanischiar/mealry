import React from 'react';
import { 
	StyleSheet, 
	View, 
	TouchableOpacity, 
	Text, 
	FlatList, 
	Image
} from 'react-native';

import { CONTRAST_COLOR } from '../res/theme';
import { DateItem } from '../components/DateItem';
import { Meal, MealItemProps } from './MealsInterfaces';

export const MealItem = ({meal, collapsed, onPress}: MealItemProps) => {
	const MealItemUncollapsed = ({meal}: {meal: Meal}) => {
		const { mealWrapper, date, imageSeparator, description } = styles;
		return (
			<View style={mealWrapper}>
				<View style={date}><DateItem>{meal.date.toString()}</DateItem></View>
				<FlatList<string>  
					data={meal.images}
					renderItem={item => <Photo address={item.item} collapsed={false}/>}
					ItemSeparatorComponent={() => <View style={imageSeparator}/>}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
				<Text style={description}>{meal.description}</Text>
			</View>
		)
	}

	const MealItemCollapsed = ({meal}: {meal: Meal}) => {
		const { resumedDescription } = styles;
		return (
			<View>
				<Text style={{textAlign: 'center'}}><DateItem>{meal.date.toString()}</DateItem></Text>
				<Photo address={meal.images[0]} collapsed/>
				<Text style={resumedDescription} numberOfLines={1}>
					{meal.description}
				</Text>
			</View>
		);
	}

	const Photo = ({address, collapsed}: {address: string, collapsed: boolean}) => {
		const width = 374 * (!collapsed ? 1 : 0.25);
		const height = 248 * (!collapsed ? 1 : 0.25);
		return (
			<Image source={{uri: address}} style={{width, height}}/>
		);
	}

	return (
		<TouchableOpacity onPress={onPress}>
			{ !collapsed ? <MealItemUncollapsed meal={meal}/> : <MealItemCollapsed meal={meal}/> }
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	mealWrapper: {},

	date: {
		textAlign: 'left',
		marginBottom: 5,
		marginStart: 15
	},

	imageSeparator: {
		width: 15
	},

	description: {
		marginStart: 15,
		marginTop: 15,
		color: CONTRAST_COLOR
	},

	resumedDescription: {
		margin: 0, 
		textAlign: 'center', 
		maxWidth: 374 * 0.25,
		color: CONTRAST_COLOR
	}
});