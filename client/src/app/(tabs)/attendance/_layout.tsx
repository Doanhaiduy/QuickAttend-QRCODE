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
            <Stack.Screen name='[id]' />
            <Stack.Screen name='map' />
            <Stack.Screen
                name='showQrCode'
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({});
