import { authSelector } from '@/redux/reducers/authReducer';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const auth = useSelector(authSelector);

    if (!auth.accessToken) {
        return <Redirect href={'/onBoarding'} />;
    }
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 90 : 60,
                },
                tabBarHideOnKeyboard: true,
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarLabelStyle: {
                    marginBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{ title: 'Home', tabBarIcon: (props) => <TabBarIcon {...props} name='home' /> }}
            />
            <Tabs.Screen
                name='attendance'
                options={{
                    title: 'Attendance',
                    tabBarIcon: (props) => <TabBarIcon {...props} name='calendar' />,
                }}
            />
            <Tabs.Screen
                name='notification'
                options={{ title: 'Notification', tabBarIcon: (props) => <Ionicons {...props} name='notifications' /> }}
            />
            <Tabs.Screen
                name='profile'
                options={{ title: 'profile', tabBarIcon: (props) => <Fontisto {...props} name='person' /> }}
            />
        </Tabs>
    );
}
