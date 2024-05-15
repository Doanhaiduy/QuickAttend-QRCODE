import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import TextComponent from './TextComponent';

interface Props extends React.ComponentProps<typeof View> {
    children: React.ReactNode;
    isAuth?: boolean;
    back?: boolean;
    title?: string;
    isScroll?: boolean;
    iconRight?: React.ReactNode;
    onBack?: () => void;
    style?: StyleProp<ViewStyle>;
    isModal?: boolean;
    isOnboarding?: boolean;
}

export default function ContainerComponent(props: Props) {
    const { children, isAuth, back, title, isScroll, iconRight, onBack, style, isModal, isOnboarding } = props;

    const router = useRouter();

    const HeaderAuth = back ? (
        <View className='flex-row items-center justify-between py-4 pl-5'>
            <Pressable onPress={() => router.back()}>
                <Ionicons name='chevron-back' size={28} color='black' onPress={onBack} />
            </Pressable>
        </View>
    ) : null;

    const Header = back ? (
        <View className='flex-row items-center py-4 flex-1 justify-between '>
            <Pressable onPress={() => router.back()}>
                <Ionicons name='chevron-back' size={24} color='black' onPress={onBack} />
            </Pressable>
            <TextComponent className='text-lg font-bold'>{title}</TextComponent>
            <Ionicons name='chevron-back' size={24} color='transparent' />
        </View>
    ) : null;

    const ReturnChildren = isScroll ? (
        <ScrollView className='flex-1'>
            {isAuth ? HeaderAuth : Header}
            {children}
        </ScrollView>
    ) : (
        <View className='flex-1'>
            {isAuth ? HeaderAuth : Header}
            {children}
        </View>
    );

    return (
        <>
            {isOnboarding && <SafeAreaView className='flex-0 bg-[#f5f9ff]' />}
            <SafeAreaView
                className='flex-1 bg-white'
                style={{
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}
            >
                {ReturnChildren}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({});
