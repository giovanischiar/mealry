import React, { useState } from 'react';
import { 
	StyleSheet, 
	SafeAreaView, 
	View, 
	Text, 
	TextInput, 
	Button, 
	TouchableOpacity, 
	Alert, 
	Image,
	FlatList 
} from 'react-native';
import { Navigation, Layout } from 'react-native-navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import { Meal } from '../meals/MealsInterfaces';

export const CreateMeal = (props: {addMeal: (date: number, images: string[], description: string) => {}}) => {
	const [description, setDescription] = useState('');
	const [images, setImages] = useState([] as string[]);
	const [date, setDate] = useState("");
	const { screen, form, descriptionInput, imageInput, imageDimensions } = styles;

	const onSelectImage = async () => {
		const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 0, includeExtra: true});
		if (result != undefined && result.assets) {
			const images: string[] = result.assets.flatMap(item => item.uri ? item.uri : '');
			const dayStamp = result.assets[0].timestamp ? result.assets[0].timestamp : ''
			setImages(images);
			setDate(dayStamp);
		}

		console.log(result);
	}

	const onSubmit = () => {
		props.addMeal(new Date(date).getTime(), images, description)
		Navigation.popToRoot(props.componentId);
	}

	const jsCoreDateCreator = (dateString: string): Date => { 
		const newDateString = dateString.replace('T', ' ');
	  // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS" 
	  let dateParam = newDateString.split(/[\s-:]/)  
	  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()  
	  return new Date(...dateParam)
	}

	return (
		<SafeAreaView style={screen}>
			<View style={form}>
				<View style={{alignItems: 'center'}}>
					<TextInput 
						style={[descriptionInput, { textAlign: 'center' }]}
						value={date != '' ? jsCoreDateCreator(date).toLocaleDateString(): date}
						placeholder="Day (will be filled automatically by images's date))"
					/>
				</View>
				<View  style={imageDimensions}>
					{ images[0] != undefined ? (
							<View>

								<FlatList
									data={images}
									renderItem={ item => (
										<View>
											<Image style={imageDimensions} source={　{uri: item.item}　} />
										</View>
									)}
									horizontal
								/>
							</View>
						): (
							<TouchableOpacity style={[imageDimensions, imageInput]} onPress={onSelectImage}>
								<Text style={{textAlign: 'center'}}>Select Image</Text>
							</TouchableOpacity>
						)
					}
				</View>
				<TextInput 
					style={descriptionInput}
					value={date != '' ? jsCoreDateCreator(date).toLocaleTimeString(): date}
					placeholder="Time (will be filled automatically by images's date))"
				/>
				<TextInput 
					style={descriptionInput}
					placeholder="Description" 
					onChangeText={setDescription}
					multiline
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
		paddingHorizontal: 15
	},

	imageDimensions: {
		width: 374, 
		height: 248
	},

	imageInput: {
		borderWidth: 1, 
		justifyContent: 'center'
	},

	descriptionInput: {
		marginTop: 15,
		marginBottom: 15
	}
});
