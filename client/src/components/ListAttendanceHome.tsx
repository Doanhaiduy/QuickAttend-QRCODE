import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyAttendanceCard from './MyAttendanceCard';
import TextComponent from './TextComponent';
import { authSelector } from '@/redux/reducers/authReducer';
import { useSelector } from 'react-redux';
import attendanceAPI from '@/apis/attendanceApi';
import { useTranslation } from 'react-i18next';

export default function ListAttendanceHome() {
    const [data, setData] = useState<any[]>();
    const auth = useSelector(authSelector);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await attendanceAPI.HandleAttendance(`/user/${auth?.id}`);
                if (res && res.data) {
                    setData(res.data);
                }
                console.log(res.data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?._id}
                renderItem={({ item, index }) => <MyAttendanceCard data={item} />}
                contentContainerStyle={{ marginHorizontal: -8 }}
                scrollEnabled={false}
                ListHeaderComponent={() => (
                    <View className='flex-row justify-between items-center'>
                        <TextComponent className='text-lg font-inter500 ml-4 mb-4 '>
                            {t('home.yourActivity')}
                        </TextComponent>
                        <Pressable className='mr-4'>
                            <TextComponent className='text-primary-500'>{t('home.viewAll')}</TextComponent>
                        </Pressable>
                    </View>
                )}
                ItemSeparatorComponent={() => <View className='h-4 w-4' />}
            />
            {data?.length === 0 && (
                <View className='flex-1 justify-center items-center'>
                    <TextComponent className='text-lg text-grayText'>{t('home.noActivity')}</TextComponent>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({});
