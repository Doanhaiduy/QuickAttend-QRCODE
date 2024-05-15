import { appColors } from '@/constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';

export default function MyAttendanceCard() {
    return (
        <TouchableOpacity className=' bg-white p-4 rounded-[14px] flex-1 mx-2 flex-row justify-between items-center'>
            <View className='flex-row items-center'>
                <View className='p-1 bg-primary-500/10 mr-2 rounded-[6px]'>
                    <Ionicons name='checkmark-done' size={24} color={appColors.primary} />
                </View>
                <View className='ml-2'>
                    <TextComponent className='font-inter700 text-lg'>Check In</TextComponent>
                    <TextComponent className='text-sm text-grayText'>April 17, 2024</TextComponent>
                </View>
            </View>
            <View>
                <TextComponent className='font-inter700 text-lg'>10:00 AM</TextComponent>
                <TextComponent className='text-sm text-grayText text-right'>On Time</TextComponent>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
