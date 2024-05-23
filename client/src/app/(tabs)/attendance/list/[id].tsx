import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AttendancePersonItem, ContainerComponent, SectionComponent, SpaceComponent } from '@/components';
import attendanceAPI from '@/apis/attendanceApi';
import { useTranslation } from 'react-i18next';

export default function ListScreen() {
    const { id } = useLocalSearchParams();
    const [list, setList] = useState<any[]>([]);
    const { t } = useTranslation();

    const fetchList = async () => {
        try {
            const res = await attendanceAPI.HandleAttendance(`/event/${id}`);
            setList([...res.data]);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(list);
    useEffect(() => {
        fetchList();
    }, []);
    return (
        <ContainerComponent isScroll title={t('attendance.listAttendanceTitle')} back handleRefresh={fetchList}>
            <SectionComponent>
                <Text className='text-lg font-bold'>
                    {t('attendance.quantity')} {list.length}
                </Text>
            </SectionComponent>
            <SectionComponent className='bg-white'>
                <FlatList
                    data={list}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <SpaceComponent height={12} />}
                    scrollEnabled={false}
                    renderItem={({ item }) => <AttendancePersonItem data={item} />}
                />
                {list.length === 0 && (
                    <View className='flex-1 justify-center items-center'>
                        <Text className='text-lg text-gray-400'>{t('attendance.noAttendance')}</Text>
                    </View>
                )}
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
