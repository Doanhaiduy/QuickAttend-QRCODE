import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import SpaceComponent from './SpaceComponent';
import { generateWeekDates } from '@/helpers';
import { appColors } from '@/constants/appColors';

export default function CalendarComponent() {
    const weekDates = generateWeekDates();
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
                    const isToday = item.dateNumber === new Date().getDate();
                    return (
                        <TouchableOpacity
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
