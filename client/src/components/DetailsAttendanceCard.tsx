import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
    type: 'Approved' | 'Pending' | 'Rejected';
    color: string;
    onPress?: () => void;
}

export default function DetailsAttendanceCard(props: Props) {
    const { type, color, onPress } = props;

    return (
        <Pressable onPress={onPress} className='p-4 bg-white shadow-xl rounded-[18px] my-3'>
            <View>
                <View className='flex-row justify-between items-center'>
                    <TextComponent className='text-base'>Date</TextComponent>
                    <View
                        className='px-4 py-2  rounded-xl'
                        style={{
                            backgroundColor: `${color}1A`,
                        }}
                    >
                        <TextComponent className=' font-medium' style={{ color }}>
                            {type}
                        </TextComponent>
                    </View>
                </View>
                <TextComponent className='text-lg font-inter700'>26th August 2021</TextComponent>
                <View className='h-[0.5px] w-full bg-gray-200 my-5' />
            </View>
            <View className='flex-row items-start justify-center gap-1'>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>Time</TextComponent>
                    <TextComponent className='text-sm '>9:00 AM</TextComponent>
                </View>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>Location</TextComponent>
                    <TextComponent className='text-sm '>Hanoi, Vietnam</TextComponent>
                </View>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>Description</TextComponent>
                    <TextComponent className='text-sm' numberOfLines={1}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui.
                    </TextComponent>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
