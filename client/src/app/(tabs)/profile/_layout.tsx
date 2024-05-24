import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='index' />
            <Stack.Screen name='editProfile' />
            <Stack.Screen name='language' />
            <Stack.Screen name='termsConditions' />
            <Stack.Screen name='privacyPolicy' />
            <Stack.Screen name='changePassword' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
