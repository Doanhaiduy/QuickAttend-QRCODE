import { authSelector, setAuthData } from '@/redux/reducers/authReducer';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function AuthLayout() {
    const auth = useSelector(authSelector);
    const { getItem } = useAsyncStorage('auth');
    const dispatch = useDispatch();

    const checkAuth = async () => {
        const data = await getItem();
        if (data) {
            const authData = JSON.parse(data);
            console.log(authData);
            dispatch(setAuthData(authData));
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (auth.accessToken) {
        return <Redirect href={'/'} />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='login' />
            <Stack.Screen name='signup' />
            <Stack.Screen name='forgot' />
            <Stack.Screen name='verification' />
            <Stack.Screen name='newPassword' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
