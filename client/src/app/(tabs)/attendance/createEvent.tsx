import eventAPI from '@/apis/eventApi';
import IEvent from '@/models/event';
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
import Checkbox from 'expo-checkbox';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CreateEventScreen() {
    const {
        lat,
        long,
        securityCodeParams,
        descriptionParams,
        dateStartParams,
        dateEndParams,
        eventNameParams,
        checkParams,
    } = useLocalSearchParams();
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
    const [isCheck, setIsCheck] = useState<boolean>(!!checkParams || false);

    const auth = useSelector(authSelector);

    const handleAddEvent = async () => {
        const pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
        if (!Validate()) return;
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
                type: isCheck ? 'private' : 'public',
                privateCode: isCheck ? securityCode : '',
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

    const Validate = () => {
        if (!eventName) {
            setError('Event name is required');
            setLoading(false);
            return false;
        }
        if (dateStart > dateEnd) {
            setError('Date start must be less than date end');
            setLoading(false);
            return false;
        }
        if (isCheck && !securityCode) {
            setError('Security code is required');
            setLoading(false);
            return false;
        }
        if (!lat || !long) {
            setError('Location is required');
            setLoading(false);
            return false;
        }
        if (!description) {
            setError('Description is required');
            setLoading(false);
            return false;
        }

        return true;
    };
    const reverseLocation = async (lat: number, long: number) => {
        try {
            const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VN&apiKey=${process
                .env.EXPO_PUBLIC_HERE_LOCATION_API_KEY!}`;
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
                                check: isCheck.toString(),
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
                <SectionComponent className='px-0 flex-row items-center pt-0'>
                    <Checkbox value={isCheck} onValueChange={setIsCheck} className='mr-2' />
                    <Pressable onPress={() => setIsCheck(!isCheck)}>
                        <TextComponent className='text-primary-500'>Private Event</TextComponent>
                    </Pressable>
                </SectionComponent>
                {isCheck && (
                    <InputComponent
                        value={securityCode}
                        onChange={(val) => setSecurityCode(val)}
                        label='Security Code'
                        placeholder='Enter Security Code'
                    />
                )}

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
                        handleAddEvent();
                    }}
                />
            </SectionComponent>
            <LoadingModal visible={loading} message='Creating event...' />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
