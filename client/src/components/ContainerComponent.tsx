import {
    Platform,
    SafeAreaView,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    StatusBar,
    ScrollView,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

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
}

export default function ContainerComponent(props: Props) {
    const { children, isAuth, back, title, isScroll, iconRight, onBack, style, isModal } = props;

    const HeaderAuth = back ? (
        <View className='flex-row items-center justify-between py-4 '>
            <Ionicons name='chevron-back' size={24} color='black' onPress={onBack} />
        </View>
    ) : null;

    const Header = back ? (
        <View className='flex-row items-center py-4 flex-1 justify-between '>
            <Ionicons name='chevron-back' size={24} color='black' onPress={onBack} />
            <Text className='text-lg font-bold'>{title}</Text>
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
        <SafeAreaView
            className='flex-1'
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            {ReturnChildren}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
