import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '@/components';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import eventAPI from '@/apis/eventApi';
import IEvent from '@/models/event';
import { format } from 'date-fns';
import { checkTimeStatus } from '@/helpers';
import { useTranslation } from 'react-i18next';

export default function EventDetails() {
    const { eventId, id } = useLocalSearchParams();
    const [event, setEvent] = useState<IEvent>();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await eventAPI.HandleEvent(`/${eventId}`);
                if (res && res.data) {
                    setEvent(res.data);
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchEvent();
    }, [eventId]);
    return (
        <ContainerComponent back isScroll title={`${t('detailsEvent.eventDetailsTitle')} ${id}`}>
            <SectionComponent>
                <View className='pb-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.eventCode')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.eventCode}</TextComponent>
                </View>
                <View className='pb-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.eventName')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.eventName}</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.location')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.locationName}</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.timeStart')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {format(event?.startAt ?? new Date(), 'MMM dd, yyyy H:mm')}
                    </TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.timeEnd')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {format(event?.endAt ?? new Date(), 'MMM dd, yyyy H:mm')}
                    </TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.status')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {checkTimeStatus(new Date(event?.startAt ?? new Date()), new Date(event?.endAt ?? new Date()))}
                    </TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.distanceLimit')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        {event?.distanceLimit ? `${event?.distanceLimit}m` : 'No limit'}
                    </TextComponent>
                </View>
                {event?.type === 'private' ? (
                    <View className='py-3 border-b-[0.5px] border-gray-200'>
                        <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                            {t('detailsEvent.securityCode')}
                        </TextComponent>
                        <TextComponent className='text-base text-blackText'>{event?.privateCode}</TextComponent>
                    </View>
                ) : (
                    <View className='py-3 border-b-[0.5px] border-gray-200'>
                        <TextComponent className='text-base text-blackText'>
                            {t('detailsEvent.publicEvent')}
                        </TextComponent>
                    </View>
                )}
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>
                        {t('detailsEvent.description')}
                    </TextComponent>
                    <TextComponent className='text-base text-blackText'>{event?.description}</TextComponent>
                </View>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title={t('detailsEvent.qrcodeButtonTitle')}
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
                    title={t('detailsEvent.listAttendanceButtonTitle')}
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
