import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

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
            <Stack.Screen name='scanQR' />
            <Stack.Screen name='list/[id]' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
