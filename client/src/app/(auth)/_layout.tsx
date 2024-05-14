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
            <Stack.Screen name='register' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
