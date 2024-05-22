import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '@/components';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import eventAPI from '@/apis/eventApi';
import IEvent from '@/models/event';
import { format } from 'date-fns';
import { checkTimeStatus } from '@/helpers';

export default function EventDetails() {
    const { eventId, id } = useLocalSearchParams();
    const [event, setEvent] = useState<IEvent>();

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await eventAPI.HandleEvent(`/${eventId}`);
            if (res && res.data) {
                console.log('=====================', res.data);
                setEvent(res.data);
            } else {
                console.log('error');
            }
        };
        fetchEvent();
    }, []);
    return (
        <ContainerComponent back isScroll title={`Event Details ${id}`}>
            <SectionComponent>
                <View className='pb-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Event Code</TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.eventCode}</TextComponent>
                </View>
                <View className='pb-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Event Name</TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.eventName}</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Location</TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.locationName}</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Time Start</TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {format(event?.startAt ?? new Date(), 'MMM dd, yyyy H:mm')}
                    </TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Time End</TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {format(event?.endAt ?? new Date(), 'MMM dd, yyyy H:mm')}
                    </TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Status</TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {checkTimeStatus(new Date(event?.startAt ?? new Date()), new Date(event?.endAt ?? new Date()))}
                    </TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Distance limit</TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {event?.distanceLimit ? `${event?.distanceLimit}m` : 'No limit'}
                    </TextComponent>
                </View>
                {event?.type === 'private' ? (
                    <View className='py-3 border-b-[0.5px] border-gray-200'>
                        <TextComponent className='text-[12px] text-grayText mb-[2px]'>Security Code</TextComponent>
                        <TextComponent className='text-base text-blackText'>{event?.privateCode}</TextComponent>
                    </View>
                ) : (
                    <View className='py-3 border-b-[0.5px] border-gray-200'>
                        <TextComponent className='text-base text-blackText'>Public event</TextComponent>
                    </View>
                )}
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Description</TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.description}</TextComponent>
                </View>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title='QRCODE'
                    type='primary'
                    size='large'
                    onPress={() => {
                        router.push({
                            pathname: `/attendance/showQrCode`,
                            params: {
                                QrCode: encodeURIComponent(event?.QRCodeUrl ?? ''),
                            },
                        });
                    }}
                    icon={<Ionicons name='chevron-forward' size={24} color='white' />}
                    iconFlex='right'
                />
                <SpaceComponent height={10} />
                <ButtonComponent
                    title='LIST ATTENDANCE'
                    icon={<Ionicons name='chevron-forward' size={24} color='white' />}
                    iconFlex='right'
                    type='primary'
                    size='large'
                    onPress={() => {
                        router.push({
                            pathname: `/attendance/list/${eventId}`,
                        });
                    }}
                />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
