import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import Splash from '../components/Splash';
export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    initialRouteName: '(auth)',
};

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false);

    const [loaded, error] = useFonts({
        Inter: require('../../assets/fonts/Inter-Regular.ttf'),
        Inter100: require('../../assets/fonts/Inter-Thin.ttf'),
        Inter500: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter600: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter700: require('../../assets/fonts/Inter-Bold.ttf'),
        Inter800: require('../../assets/fonts/Inter-ExtraBold.ttf'),
        Inter900: require('../../assets/fonts/Inter-Black.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            setAppReady(true);
        }
    }, [loaded]);

    if (!appReady) {
        return <Splash />;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return <Slot />;
}
