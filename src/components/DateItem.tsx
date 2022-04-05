import React, { FunctionComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

import { CONTRAST_COLOR } from '../res/theme';

export const DateItem : FunctionComponent = ({children}) => {
	const { dateStyle } = styles;
	const dateString = children ? children.toString() : "0"
	const dateNumber = Number(dateString);
	const convertedDate = new Date(dateNumber);
	const convertedLocalizedDate = convertedDate.toLocaleTimeString();
	return <Text style={dateStyle}>{ convertedLocalizedDate }</Text>
}

const styles = StyleSheet.create({
	dateStyle: {
		color: CONTRAST_COLOR
	}
});
