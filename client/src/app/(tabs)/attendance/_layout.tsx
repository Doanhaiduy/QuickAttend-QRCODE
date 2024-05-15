import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function AttendanceLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='index' />
            <Stack.Screen name='createEvent' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
