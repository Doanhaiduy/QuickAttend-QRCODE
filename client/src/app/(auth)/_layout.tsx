import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack, router } from 'expo-router';
import { useSelector } from 'react-redux';
import { authSelector } from '@/src/redux/reducers/authReducer';

export default function AuthLayout() {
    const auth = useSelector(authSelector);

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
