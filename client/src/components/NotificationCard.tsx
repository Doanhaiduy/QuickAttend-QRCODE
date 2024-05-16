import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '@/constants/appColors';
import TextComponent from './TextComponent';

interface Props {
    type: 'Auth' | 'Event' | 'Profile';
}

export default function NotificationCard(props: Props) {
    const { type } = props;
    return (
        <TouchableOpacity className='py-3 flex-row gap-4 items-start border-b-[0.5px] border-gray-200 w-full '>
            <View className='p-2 bg-primary-500/10 rounded-full h-[40px] w-[40px] items-center justify-center'>
                {type === 'Auth' && <Ionicons name='lock-closed' size={20} color={appColors.primary} />}
                {type === 'Profile' && <Ionicons name='person' size={20} color={appColors.primary} />}
                {type === 'Event' && <Ionicons name='calendar' size={20} color={appColors.primary} />}
            </View>
            <View className='pr-[40px]'>
                <TextComponent className='text-base font-bold' numberOfLines={1}>
                    You update your profile picture
                </TextComponent>
                <TextComponent className='text-[12px] my-1' numberOfLines={2}>
                    You just update your profile picture ou just update your profile picture
                </TextComponent>
                <TextComponent className='text-[11px] text-grayText'>Just Now</TextComponent>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
