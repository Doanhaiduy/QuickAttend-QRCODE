import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextComponent from './TextComponent';
import EventCard from './EventCard';
import eventAPI from '@/apis/eventApi';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/reducers/authReducer';
import { useTranslation } from 'react-i18next';

export default function TodayListEvent(props: { date: string }) {
    const [data, setData] = useState<any[]>([]);
    const { t } = useTranslation();

    const { date } = props;
    const auth = useSelector(authSelector);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await eventAPI.HandleEvent(`/get-all?authorId=${auth.id}&date=${date}`);
                setData(res.data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchData();
    }, [date]);

    return (
        <>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?._id}
                renderItem={({ item, index }) => <EventCard data={item} />}
                contentContainerStyle={{ marginHorizontal: -8 }}
                ListHeaderComponent={() => (
                    <TextComponent className='text-lg font-inter500 ml-4 mb-4'>
                        {date === new Date().toISOString().split('T')[0]
                            ? t('home.todayEvent')
                            : `${t('attendance.event')} ${date}`}
                    </TextComponent>
                )}
                ItemSeparatorComponent={() => <View className='h-4 w-4' />}
                numColumns={2}
                scrollEnabled={false}
            />
            {data.length === 0 && (
                <View className='flex-1 justify-center items-center'>
                    <TextComponent className='text-lg text-gray-400'>{t('home.noEvent')}</TextComponent>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({});
