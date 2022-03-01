import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

export const CreateMeal = () => {
	const [description, setDescription] = useState('');
	const { screen, form, descriptionInput, imageInput } = styles;

	const onSelectImage = () => {
		Alert.alert('TODO');
	}

	const onSubmit = () => {
		Alert.alert('TODO', `{description: \"${description}\"}`)
	}

	return (
		<SafeAreaView style={screen}>
			<View style={form}>
				<TouchableOpacity onPress={onSelectImage} style={imageInput}>
					<Text style={{textAlign: 'center'}}>Select Image</Text>
				</TouchableOpacity>
				<TextInput 
					style={descriptionInput}
					placeholder="Date and Time (will be filled automatically by images's date))"
				/>
				<TextInput 
					style={descriptionInput}
					placeholder="Description" 
					multiline
					onChangeText={setDescription}
				/>
				<Button onPress={onSubmit} title="Done" />
			</View>
		</SafeAreaView>
	);
}

CreateMeal.options = {
  topBar: {
    title: {
      text: 'Create Meal',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
}

const styles = StyleSheet.create({
	screen: {
		flex: 1, 
		alignItems: 'center'
	},

	form: {
		margin: 15, 
		backgroundColor: '#ededed', 
		padding: 15
	},

	imageInput: {
		width: 374, 
		height: 248, 
		borderWidth: 1, 
		justifyContent: 'center'
	},

	descriptionInput: {
		marginTop: 15
	}
});
