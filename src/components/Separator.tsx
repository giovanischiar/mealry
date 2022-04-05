import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Separator = () => {
	const { separator } = styles;
	return <View style={separator}/>;
}

const styles = StyleSheet.create({
	separator: {
		height: 15,
		width: 15
	}
});
