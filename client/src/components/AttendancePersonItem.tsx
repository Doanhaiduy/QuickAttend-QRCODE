import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextComponent from './TextComponent';
import userAPI from '@/apis/userApi';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface Data {
    attendanceTime: string;
    distance: number;
    locationName: string;
    userId: string;
}

export default function AttendancePersonItem(props: { data: Data }) {
    const { data } = props;
    const [user, setUser] = useState<any>({});
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userAPI.HandleUser(`/${data.userId}`);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <View className='p-3 bg-white rounded-xl border-primary-500 border-[1px]'>
            <View className='flex-row items-center gap-2 bg-white'>
                <Image
                    source={{
                        uri:
                            user.imageURL ||
                            'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                    }}
                    className='w-11 h-11 object-cover rounded-full'
                />
                <View>
                    <TextComponent numberOfLines={1} className='font-medium text-base'>
                        {user.fullName || ''} -{' '}
                        <TextComponent className='text-sm font-normal'>@{user.username || ''}</TextComponent>
                    </TextComponent>
                    <TextComponent className='font-bold mt-1'>
                        {format(new Date(data.attendanceTime), 'MMM dd, yyyy - p')}
                    </TextComponent>
                </View>
            </View>
            <View className='flex-row items-start mt-3 justify-between'>
                <View className='flex-row items-start max-w-[40%] '>
                    <TextComponent className='text-sm font-medium'>{t('home.locationLabel')} </TextComponent>
                    <TextComponent className='text-sm'>{data.locationName || t('home.noLocation')}</TextComponent>
                </View>
                <View className='flex-row items-center'>
                    <TextComponent className='text-sm font-medium'>{t('home.distanceLabel')} </TextComponent>
                    <TextComponent className='text-sm'>{data.distance} (m)</TextComponent>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
