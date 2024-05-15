import { appColors } from '@/constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';

export default function AttendanceCard() {
    return (
        <TouchableOpacity className='h-[135px] bg-white p-4 rounded-[14px] flex-1 mx-2'>
            <View className='flex-row items-center'>
                <View className='p-1 bg-primary-500/10 mr-2 rounded-[6px]'>
                    <Ionicons name='checkmark-done' size={24} color={appColors.primary} />
                </View>
                <TextComponent className='text-base  flex-1'>Check In</TextComponent>
            </View>
            <TextComponent className='font-inter700 text-xl my-2'>10:20 AM</TextComponent>
            <TextComponent className=''>On Time</TextComponent>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
