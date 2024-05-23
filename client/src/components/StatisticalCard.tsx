import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { useTranslation } from 'react-i18next';

interface Props {
    type: 'Total' | 'Upcoming' | 'Ongoing' | 'Expired';
    value: number;
    color: string;
}

export default function StatisticalCard(props: Props) {
    const { type, value, color } = props;
    const { t } = useTranslation();

    const getType = () => {
        switch (type) {
            case 'Total':
                return t('attendance.totalTitle');
            case 'Upcoming':
                return t('attendance.upcomingButtonTitle');
            case 'Ongoing':
                return t('attendance.ongoingButtonTitle');
            case 'Expired':
                return t('attendance.expiredButtonTitle');
            default:
                return '';
        }
    };

    const typeText = getType();
    return (
        <View
            className='flex items-start p-4 rounded-[18px] w-[45%] m-2'
            style={{
                backgroundColor: `${color}1A`,
                borderColor: color,
                borderWidth: 1,
            }}
        >
            <TextComponent className='font-semibold text-xl'>{t('attendance.event')} </TextComponent>
            <TextComponent className='font-semibold text-xl'>{typeText}</TextComponent>
            <TextComponent className='font-bold text-xl mt-5' style={{ color }}>
                {value}
            </TextComponent>
        </View>
    );
}

const styles = StyleSheet.create({});
