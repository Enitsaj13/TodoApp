import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

interface Spacing {
    space_2: number;
    space_4: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_30: number;
    space_32: number;
    space_36: number;
    space_40: number;
}

export const SPACING: Spacing = {
    space_2: 2,
    space_4: 4,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_30: 30,
    space_32: 32,
    space_36: 36,
    space_40: 40,
};

// Define other theme constants here...

interface Color {
    primaryBlack: string;
    primaryLightGray: string;
    primaryDarkGray: string;
    primaryColor: string;
    secondaryColor: string;
    primaryRed: string;
    primaryWhite: string;
    primarySecondaryWhite: string;
}

export const COLORS: Color = {
    primaryBlack: '#0f172a',
    primaryLightGray: '#64748b',
    primaryDarkGray: '#374151',
    primaryColor: '#0b80d4',
    secondaryColor: '#ef4444',
    primaryRed: '#b91c1c',
    primaryWhite: '#FFFFFF',
    primarySecondaryWhite: '#d1d5db',
};

interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_24: number;
    size_28: number;
    size_30: number;
}

export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_24: 24,
    size_28: 28,
    size_30: 30,
};

interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
    radius_30: number;
    radius_40: number;
    radius_50: number;
}

export const BORDERRADIUS: BorderRadius = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25,
    radius_30: 30,
    radius_40: 40,
    radius_50: 50,
};

interface FontFamily {
    poppins_bold: string;
    poppins_semibold: string;
    poppins_light: string;
    poppins_regular: string;
}

export const FONTFAMILY: FontFamily = {
    poppins_bold: 'Poppins-Bold',
    poppins_semibold: 'Poppins-SemiBold',
    poppins_regular: 'Poppins-Regular',
    poppins_light: 'Poppins-Light',
};

// Define other theme constants here...

interface ThemeState {
    fontsLoaded: boolean;
    fontError: boolean;
}

export const useTheme = () => {
    const [themeState, setThemeState] = useState<ThemeState>({
        fontsLoaded: false,
        fontError: false,
    });

    const loadFonts = useCallback(async () => {
        try {
            await Font.loadAsync({
                'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
                'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
                'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
                'Poppins-Light': require('@/assets/fonts/Poppins-Light.ttf'),
            });
            setThemeState({ ...themeState, fontsLoaded: true });
        } catch (error) {
            console.warn(error);
            setThemeState({ ...themeState, fontError: true });
        }
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (themeState.fontsLoaded || themeState.fontError) {
            await SplashScreen.hideAsync();
        }
    }, [themeState.fontsLoaded, themeState.fontError]);

    useEffect(() => {
        loadFonts();
        onLayoutRootView();
    }, []);

    return themeState;
};