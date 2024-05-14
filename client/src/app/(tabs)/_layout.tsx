import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const [isLogin, setIsLogin] = React.useState(false);

    if (!isLogin) {
        return <Redirect href={'/onBoarding'} />;
    }
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{ title: 'Home', tabBarIcon: (props) => <TabBarIcon {...props} name='home' /> }}
            />
            <Tabs.Screen
                name='attendance'
                options={{ title: 'Attendance', tabBarIcon: (props) => <TabBarIcon {...props} name='calendar' /> }}
            />
            <Tabs.Screen
                name='notification'
                options={{ title: 'Notification', tabBarIcon: (props) => <TabBarIcon {...props} name='bell' /> }}
            />
            <Tabs.Screen
                name='profile'
                options={{ title: 'profile', tabBarIcon: (props) => <TabBarIcon {...props} name='pagelines' /> }}
            />
        </Tabs>
    );
}
