import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import SpaceComponent from './SpaceComponent';
import { generateWeekDates } from '@/helpers';
import { useTranslation } from 'react-i18next';

export default function CalendarComponent(props: { onDatePress?: (date: string) => void; date: string }) {
    const { onDatePress, date } = props;
    const { t } = useTranslation();
    const weekDates = generateWeekDates(t('lang'));
    console.log();
    return (
        <View>
            <FlatList
                data={weekDates}
                horizontal
                keyExtractor={(item) => item.dateNumber.toString()}
                ItemSeparatorComponent={() => <SpaceComponent width={15} />}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isToday = item.fullDate === date;
                    return (
                        <TouchableOpacity
                            onPress={() => onDatePress?.(item.fullDate)}
                            className={`items-center justify-center p-5  border-[0.5px] border-gray-200 rounded-[14px] ${
                                isToday ? 'bg-primary-500' : 'bg-white'
                            }`}
                        >
                            <TextComponent className={`font-inter700 text-xl ${isToday ? 'text-white' : 'text-black'}`}>
                                {item.dateNumber}
                            </TextComponent>
                            <TextComponent className={`text-base ${isToday ? 'text-white' : 'text-black'}`}>
                                {item.dayName}
                            </TextComponent>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
