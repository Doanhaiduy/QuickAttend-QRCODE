import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { format } from 'date-fns';

interface Data {
    title: string;
    startAt: string;
    location: string;
    description: string;
}
interface Props {
    type: 'Approved' | 'Pending' | 'Rejected';
    color: string;
    onPress?: () => void;
    data: Data;
}

export default function DetailsAttendanceCard(props: Props) {
    const { type, color, onPress, data } = props;
    console.log(data);

    return (
        <Pressable onPress={onPress} className='p-4 bg-white shadow-xl rounded-[18px] my-3'>
            <View>
                <View className='flex-row justify-between items-center'>
                    <TextComponent className='text-base font-bold'>{data.title}</TextComponent>
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
                <TextComponent className='text-lg font-inter700'>{format(data?.startAt, 'MMM dd, yyyy')}</TextComponent>
                <View className='h-[0.5px] w-full bg-gray-200 my-5' />
            </View>
            <View className='flex-row items-start justify-center gap-1'>
                <View className=' mr-4'>
                    <TextComponent className='text-base font-inter700'>Time</TextComponent>
                    <TextComponent className='text-sm '>{format(data?.startAt, 'p')}</TextComponent>
                </View>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>Location</TextComponent>
                    <TextComponent className='text-sm '>{data?.location || 'No location'}</TextComponent>
                </View>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>Description</TextComponent>
                    <TextComponent className='text-sm' numberOfLines={1}>
                        {data?.description || 'No description'}
                    </TextComponent>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
