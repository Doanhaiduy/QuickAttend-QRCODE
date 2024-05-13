import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(auth)',
};

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Inter100: require('../../assets/fonts/Inter-Thin.ttf'),
        Inter: require('../../assets/fonts/Inter-Regular.ttf'),
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
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <Stack
            initialRouteName='(auth)'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='(auth)' />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
    );
}
