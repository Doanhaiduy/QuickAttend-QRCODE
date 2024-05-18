import userAPI from '@/apis/userApi';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    InputDateTimePicker,
    SectionComponent,
    TextComponent,
} from '@/components';
import { appColors } from '@/constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CreateEventScreen() {
    const [eventName, setEventName] = React.useState('');
    const [location, setLocation] = React.useState('Choose location');
    const [securityCode, setSecurityCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    const { lat, long } = useLocalSearchParams();

    const handleAddEvent = async () => {
        try {
            const res = await userAPI.HandleUser('/get-all');
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const reverseLocation = async (lat: number, long: number) => {
        try {
            const apiKey = 'zQooxv0iylfvwq46LeAidvzavSl9RIuhgBkvBF9-0JY';
            const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VN&apiKey=${apiKey}`;
            const res = await axios(api);
            if (res && res.status === 200) {
                console.log(res.data.items[0].title);
                setLocation(res.data.items[0].title);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (lat && long) {
            reverseLocation(+lat, +long);
        }
    }, []);
    return (
        <ContainerComponent isScroll back title='Add Event'>
            <StatusBar style='dark' />
            <SectionComponent>
                <InputComponent
                    value={eventName}
                    onChange={(val) => setEventName(val)}
                    label='Event Name'
                    placeholder='Enter event name'
                />

                <View className='flex-row -mx-2'>
                    <InputDateTimePicker
                        value={dateStart}
                        type='date'
                        onChange={(e, val) => setDateStart(val)}
                        label='Date start'
                        placeholder='click to set'
                    />

                    <InputDateTimePicker
                        value={dateStart}
                        type='time'
                        onChange={(e, val) => setDateStart(val)}
                        label='time start'
                        placeholder='click to set'
                    />
                </View>

                <View className='flex-row -mx-2'>
                    <InputDateTimePicker
                        value={dateEnd}
                        type='date'
                        onChange={(e, val) => setDateEnd(val)}
                        label='Date end'
                        placeholder='click to set'
                    />

                    <InputDateTimePicker
                        value={dateEnd}
                        type='time'
                        onChange={(e, val) => setDateEnd(val)}
                        label='time end'
                        placeholder='click to set'
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: '/attendance/map',
                            params: {
                                lat,
                                long,
                                locationName: location,
                            },
                        });
                    }}
                >
                    <View className='min-h-[56px] w-full px-4 py-2 justify-center rounded-[10px] border-[1px] border-primary-500 mb-4'>
                        <TextComponent className='text-[11px] text-primary-500 mb-2'>Location</TextComponent>
                        <TextComponent>{location || 'Choose Location'}</TextComponent>
                        {!location && (
                            <View className='absolute right-4'>
                                <Ionicons name='chevron-forward' size={20} color={appColors.primary} />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>

                <InputComponent
                    value={securityCode}
                    onChange={(val) => setSecurityCode(val)}
                    label='Security Code'
                    placeholder='Enter Security Code'
                />

                <TextComponent className='text-primary-500 text-[12px] mb-[2px]'>Description</TextComponent>
                <InputComponent
                    value={description}
                    onChange={(val) => setDescription(val)}
                    label='Description'
                    placeholder='Enter description'
                    height={150}
                    multiline
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title='Add Event'
                    type='primary'
                    size='large'
                    onPress={() => {
                        const timeStart = dateStart.getTime();
                        const timeEnd = dateEnd.getTime();
                        console.log({
                            eventName,
                            timeStart,
                            timeEnd,
                            location,
                            securityCode,
                            description,
                        });
                        handleAddEvent();
                    }}
                />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
