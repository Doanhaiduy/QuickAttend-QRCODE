import eventAPI from '@/apis/eventApi';
import IEvent from '@/app/models/event';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    InputDateTimePicker,
    SectionComponent,
    TextComponent,
} from '@/components';
import { appColors } from '@/constants/appColors';
import LoadingModal from '@/modals/LoadingModal';
import { authSelector } from '@/redux/reducers/authReducer';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { format } from 'date-fns-tz';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CreateEventScreen() {
    const { lat, long, securityCodeParams, descriptionParams, dateStartParams, dateEndParams, eventNameParams } =
        useLocalSearchParams();
    const [eventName, setEventName] = React.useState<string>(eventNameParams?.toString() || '');
    const [location, setLocation] = React.useState<string>('');
    const [securityCode, setSecurityCode] = React.useState<string>(securityCodeParams?.toString() || '');
    const [description, setDescription] = React.useState<string>(descriptionParams?.toString() || '');
    const [dateStart, setDateStart] = useState<Date>(
        dateStartParams ? new Date(dateStartParams.toString()) : new Date()
    );
    const [dateEnd, setDateEnd] = useState<Date>(dateEndParams ? new Date(dateEndParams.toString()) : new Date());
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const auth = useSelector(authSelector);

    const handleAddEvent = async () => {
        const pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
        setLoading(true);
        try {
            const event: IEvent = {
                eventName,
                description,
                location: {
                    latitude: lat ? +lat : 0,
                    longitude: long ? +long : 0,
                },
                locationName: location,
                type: 'public',
                privateCode: securityCode,
                authorId: auth.id,
                startAt: format(dateStart, pattern, { timeZone: 'Asia/Ho_Chi_Minh' }),
                endAt: format(dateEnd, pattern, { timeZone: 'Asia/Ho_Chi_Minh' }),
            };
            const res = await eventAPI.HandleEvent('/create', event, 'post');
            if (res && res.data) {
                console.log(res.data);
                Alert.alert('Success', 'Create event success');
                router.push({
                    pathname: `/attendance/${res.data.eventName}`,
                    params: {
                        eventId: res.data._id,
                    },
                });
                setLoading(false);
            }
            setLoading(false);
        } catch (error: string | any) {
            setError(error);
            setLoading(false);
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
                                eventName,
                                securityCode,
                                description,
                                dateStart: dateStart.toISOString(),
                                dateEnd: dateEnd.toISOString(),
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
                {error && <TextComponent className='text-error text-left'>{error}</TextComponent>}
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
            <LoadingModal visible={loading} message='Creating event...' />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
