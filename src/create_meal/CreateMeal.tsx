import React, { useState, useEffect } from 'react';
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
	FlatList,
	Dimensions,
	Platform 
} from 'react-native';
import { Navigation, Layout } from 'react-native-navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DateTimeBadge } from '../components/DateTimeBadge';
import { Meal } from '../meals/MealsInterfaces';

export const CreateMeal = (props: {addMeal: (date: number, images: string[], description: string) => {}}) => {
	const [showingDateDicker, isShowingDatePicker] = useState(false);
	const [description, setDescription] = useState('');
	const [images, setImages] = useState([] as string[]);
	const [date, setDate] = useState(new Date(Date.now()));
	const { 
		screen, 
		form, 
		descriptionInput, 
		imageInput, 
		imageDimensions, 
		changingImageBtn, 
		changingImageBtnTxt 
	} = styles;

	const onSelectImage = async () => {
		const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 0, includeExtra: true});
		if (result != undefined && result.assets) {
			const images: string[] = result.assets.flatMap(item => item.uri ? item.uri : '');
			const dayStamp = result.assets[0].timestamp ? result.assets[0].timestamp : ''
			setImages(images);
			console.log(new Date(dayStamp));
			setDate(jsCoreDateCreator(dayStamp));
		}

		console.log(result);
	}

	const onSubmit = () => {
		console.log('date', date);
		props.addMeal(date.getTime(), images, description)
		Navigation.popToRoot(props.componentId);
	}

	const jsCoreDateCreator = (dateString: string): Date => { 
		const newDateString = dateString.replace('T', ' ');
	  // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS" 
	  let dateParam = newDateString.split (/[\s-:]/)  
	  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()  
	  return new Date(...dateParam)
	}

	const onDateChange = (event: any, date: Date | undefined) => {
		console.log('yay'); 
		console.log('onChange', event, date); 
		const newDateString = date ? date.toString() : new Date(Date.now()).toString();
		setDate(jsCoreDateCreator(newDateString));
		isShowingDatePicker(false);
	}

	return (
		<SafeAreaView style={screen}>
			<View style={form}>
				<View style={{alignSelf: 'center'}}>
				{ (showingDateDicker || Platform.OS === 'ios') && (
						<DateTimePicker
		        	style={[descriptionInput, {minWidth: 150}]}
		          value={date}
		          mode={'date'}
		          display="default"
		          onChange={onDateChange}
		        />
	        )
				}
				{ Platform.OS === 'android' && (
						<DateTimeBadge 
							style={descriptionInput} 
							onPress={() => {isShowingDatePicker(!showingDateDicker)}}
							mode='date'
						>
							{ date.getTime() }
						</DateTimeBadge>
					)
				}
        </View>
				<View  style={[imageDimensions]}>
					{ images[0] != undefined ? (
							<View>
								<FlatList
									data={images}
									renderItem={ item => (
										<View>
											<Image 
												style={imageDimensions} 
												source={　{uri: item.item}　} 
											/>
										</View>
									)}
									horizontal
								/>
								<TouchableOpacity 
									onPress={onSelectImage} 
									style={changingImageBtn}
								>
									<Text style={changingImageBtnTxt}>Change image(s)</Text>	
								</TouchableOpacity>
							</View>
						): (
							<TouchableOpacity style={[imageDimensions, imageInput]} onPress={onSelectImage}>
								<Text style={{textAlign: 'center'}}>Select Image</Text>
							</TouchableOpacity>
						)
					}
				</View>
{/*        <DateTimePicker
        	style={[descriptionInput, {minWidth: 65, alignSelf: 'flex-start'}]}
          value={date}
          mode={'time'}
          display="default"
          onChange={time => {}}
        />*/}
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
		flex: 1
	},

	form: {
		margin: 15,
		backgroundColor: '#ededed',
		paddingHorizontal: 15
	},

	imageDimensions: {
		width: Dimensions.get('window').width - 60,
		height: 248,
    resizeMode: 'contain'
	},

	imageInput: {
		borderWidth: 1, 
		justifyContent: 'center'
	},

	descriptionInput: {
		marginTop: 15,
		marginBottom: 15,
		padding: 0,
		fontSize: 16
	},

	changingImageBtn: {
		position: 'absolute', 
		bottom: 0, 
		left: 0, 
		right: 0,
		height: 30, 
		justifyContent: 'center', 
		backgroundColor: 'blue'
	},

	changingImageBtnTxt: {
		alignSelf: 'center', 
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	}
});
