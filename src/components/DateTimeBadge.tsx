import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const DateTimeBadge : FunctionComponent<{onPress: () => void, mode: 'date'|'time', style: any}> = ({children, onPress, mode, style}) => {
	const { wrapper, dateText } = styles;
	const dateString = children ? children.toString() : "0"
	const dateNumber = Number(dateString);
	const convertedDate = new Date(dateNumber);
	let convertedLocalizedDate = convertedDate.toLocaleDateString();
	if (mode === 'time') {
		convertedLocalizedDate = convertedDate.toLocaleTimeString();
	}
	return (
		<TouchableOpacity 
			onPress={onPress} 
			style={[style, wrapper]}
		>
			<Text style={dateText}>
				{ convertedLocalizedDate }
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#ddd',
		borderRadius: 7
	},

	dateText: {
		marginHorizontal: 10,
		marginVertical: 5,
		fontSize: 15
	}
});
