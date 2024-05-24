import { appColors } from '@constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    Pressable,
    RefreshControl,
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
    handleRefresh?: () => void;
}

export default function ContainerComponent(props: Props) {
    const { children, isAuth, back, title, isScroll, iconRight, onBack, style, isModal, isOnboarding, handleRefresh } =
        props;

    const router = useRouter();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            handleRefresh && handleRefresh();
            setRefreshing(false);
        }, 1000);
    };

    const HeaderAuth = back ? (
        <View className='flex-row items-center justify-between py-2 pl-5'>
            <Pressable onPress={() => router.back()}>
                <Ionicons name='chevron-back' size={28} color='black' onPress={onBack} />
            </Pressable>
        </View>
    ) : null;

    const Header = back ? (
        <View className='flex-row items-center py-2 justify-between pl-5'>
            <Pressable onPress={() => router.back()}>
                <Ionicons name='chevron-back' size={24} color='black' onPress={onBack} />
            </Pressable>
            <TextComponent className='text-lg font-bold'>{title}</TextComponent>
            <View className='pr-5'>
                <Ionicons name='chevron-back' size={24} color='transparent' />
            </View>
        </View>
    ) : null;

    const HeaderTittle =
        title && !back ? (
            <View
                className='flex-row items-center justify-between py-2 pl-5'
                style={{
                    zIndex: 999,
                }}
            >
                <TextComponent className='text-lg font-bold'>{title}</TextComponent>
                {iconRight && <View className='pr-5'>{iconRight}</View>}
            </View>
        ) : null;

    const ReturnChildren = isScroll ? (
        <>
            {title && !back && HeaderTittle}
            {isAuth ? HeaderAuth : Header}
            <ScrollView
                className='flex-1'
                keyboardShouldPersistTaps='handled'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        size={20}
                        tintColor={appColors.primary}
                    />
                }
            >
                {children}
            </ScrollView>
        </>
    ) : (
        <>
            {title && !back && HeaderTittle}
            {isAuth ? HeaderAuth : Header}
            <View className='flex-1'>{children}</View>
        </>
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
