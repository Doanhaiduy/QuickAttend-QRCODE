import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
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
