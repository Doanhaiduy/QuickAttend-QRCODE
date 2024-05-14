import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='onBoarding' />
            <Stack.Screen name='login' />
            <Stack.Screen name='signup' />
            <Stack.Screen name='forgot' />
            <Stack.Screen name='verification' />
            <Stack.Screen name='newPassword' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
