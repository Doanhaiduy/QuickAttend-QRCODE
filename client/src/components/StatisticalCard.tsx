import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

interface Props {
    type: 'Balance' | 'Approved' | 'Pending' | 'Rejected';
    value: number;
    color: string;
}

export default function StatisticalCard(props: Props) {
    const { type, value, color } = props;

    return (
        <View
            className='flex items-start p-4 rounded-[18px] w-[45%] m-2'
            style={{
                backgroundColor: `${color}1A`,
                borderColor: color,
                borderWidth: 1,
            }}
        >
            <TextComponent className='font-semibold text-xl'>Check </TextComponent>
            <TextComponent className='font-semibold text-xl'>{type}</TextComponent>
            <TextComponent className='font-bold text-xl mt-5' style={{ color }}>
                {value}
            </TextComponent>
        </View>
    );
}

const styles = StyleSheet.create({});
