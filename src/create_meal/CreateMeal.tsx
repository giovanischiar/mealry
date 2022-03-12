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
	Platform,
	NativeModules, 
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import { Navigation, Layout } from 'react-native-navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { SURFACE_COLOR, CONTRAST_COLOR } from '../res/theme';
import { DateTimeBadge } from '../components/DateTimeBadge';
import { CreateMealsProps } from './CreateMealInterfaces';

export const CreateMeal = (props: CreateMealsProps) => {
	const [showingDatePicker, isShowingDatePicker] = useState(false);
	const [showingTimePicker, isShowingTimePicker] = useState(false);
	const [description, setDescription] = useState(props.currentMeal ? props.currentMeal.description : '');
	const [images, setImages] = useState(props.currentMeal ? props.currentMeal.images : [] as string[]);
	const [date, setDate] = useState(new Date(props.currentMeal ? props.currentMeal.date : Date.now()));
	const { 
		screen, 
		form, 
		descriptionInput, 
		imageInput, 
		imageDimensions, 
		changingImageBtn, 
		changingImageBtnTxt,
		selectImageTxt 
	} = styles;

	let iOSLocale = "pt_BR";
	if (Platform.OS === 'ios') {
		iOSLocale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
	}

	if (props.currentMeal) {
		//TODO: set new header name if editing.
	}

	const onSelectImage = async () => {
		const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 0, includeExtra: true});
		if (result != undefined && result.assets) {
			const images: string[] = result.assets.flatMap(item => item.uri ? item.uri : '');
			const dayStamp = result.assets[0].timestamp ? result.assets[0].timestamp : ''
			setImages(images);
			setDate(jsCoreDateCreator(dayStamp));
		}
	}

	const onSubmit = () => {
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
		setDate(date ? date : new Date(Date.now()));
		isShowingDatePicker(false);
		isShowingTimePicker(false);
	}

	return (
			<KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : null}>
				<SafeAreaView style={screen}>
					<View style={form}>
						<View style={{alignSelf: 'center'}}>
							{ (showingDatePicker || Platform.OS === 'ios') && (
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
										onPress={() => {isShowingDatePicker(!showingDatePicker)}}
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
											<Text style={selectImageTxt}>Select Image</Text>
										</TouchableOpacity>
									)
								}
							</View>
							{ (showingTimePicker || Platform.OS === 'ios') && (
									<DateTimePicker
					        	style={[descriptionInput, {maxWidth: iOSLocale === 'pt-BR' ? 65 : 90}]}
					          value={date}
					          mode={'time'}
					          display="default"
					          onChange={onDateChange}
					        />
				        )
							}
							{ Platform.OS === 'android' && (
									<DateTimeBadge 
										style={[descriptionInput]} 
										onPress={() => {isShowingTimePicker(!showingTimePicker)}}
										mode='time'
									>
										{ date.getTime() }
									</DateTimeBadge>
								)
							}
							<TextInput 
								value={description}
								style={descriptionInput}
								placeholder="Description" 
								onChangeText={setDescription}
								multiline
							/>
					<Button onPress={onSubmit} title="Done" />
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

CreateMeal.options = {
  topBar: {
  	background: {
  		color: {
  			light: '#4d089a',
  			dark: '#000'
  		}
  	},

    title: {
      text: 'Create Meal',
      color: 'white'
    }
  }
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},

	form: {
		margin: 15,
		backgroundColor: SURFACE_COLOR,
		paddingHorizontal: 15
	},

	imageDimensions: {
		width: Dimensions.get('window').width - 60,
		height: 248,
    resizeMode: 'contain'
	},

	imageInput: {
		borderWidth: 1, 
		justifyContent: 'center',
		borderColor: CONTRAST_COLOR
	},

	descriptionInput: {
		marginTop: 15,
		marginBottom: 15,
		padding: 0,
		fontSize: 16,
		color: CONTRAST_COLOR
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
	},

	selectImageTxt: {
		textAlign: 'center',
		color: CONTRAST_COLOR
	}
});
