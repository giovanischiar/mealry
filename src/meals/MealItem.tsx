import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Text, FlatList, ListRenderItem, ScrollView, Image} from 'react-native';

import { Meal } from './MealsInterfaces';

export const MealItem = (props: {meal: Meal}) => {
	const { mealWrapper, date, imageSeparator, description } = styles;
	const { meal } = props;
	return (
		<View>
			<View style={mealWrapper}>
				<Text style={date}>{new Date(meal.date).toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric'})}</Text>
				<FlatList<string>  
					data={meal.images}
					renderItem={imageRenderer}
					ItemSeparatorComponent={() => <View style={imageSeparator}/>}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
				<Text style={description}>{meal.description}</Text>
			</View>
		</View>
	)
}

const imageRenderer: ListRenderItem<string> = ({item}) => {
	return (
		<View style={{width: 374, height: 248, borderWidth: 1, justifyContent: 'center'}}><Text style={{textAlign: 'center'}}>{item}</Text></View>
		/*<Image source={{uri: "https://picsum.photos/374/248"}} style={{width: 374, height: 248}}/>*/
	);
}

const styles = StyleSheet.create({
	mealWrapper: {
		
	},

	date: {
		textAlign: 'left',
		marginBottom: 5,
		marginStart: 30
	},

	imageSeparator: {
		width: 15
	},

	description: {
		marginStart: 30,
		marginTop: 15
	}
});