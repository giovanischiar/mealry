import { StyleSheet, Appearance } from 'react-native';

const isDark = Appearance.getColorScheme() === 'dark';

export const SURFACE_COLOR = isDark ? '#121212' : '#ededed';
export const CONTRAST_COLOR = isDark ? 'white' : '#333';
