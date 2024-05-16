import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
    ButtonComponent,
    ContainerComponent,
    DetailsAttendanceCard,
    SectionComponent,
    SpaceComponent,
    StatisticalCard,
} from '@/components';
import { Octicons } from '@expo/vector-icons';
import { appColors } from '@/constants/appColors';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function AttendanceScreen() {
    return (
        <ContainerComponent
            isScroll
            title='Attendance'
            iconRight={
                <Pressable onPress={() => router.push('/(tabs)/attendance/createEvent')}>
                    <Octicons name='diff-added' size={24} color='black' />
                </Pressable>
            }
        >
            <StatusBar style='dark' />
            <SectionComponent className='flex flex-row flex-wrap -mt-5'>
                <StatisticalCard type='Balance' color={appColors.primary} value={20} />
                <StatisticalCard type='Approved' color={'#a8d344'} value={5} />
                <StatisticalCard type='Pending' color={appColors.success2} value={2} />
                <StatisticalCard type='Rejected' color={appColors.error2} value={3} />
            </SectionComponent>

            <SectionComponent>
                <View className='flex-row items-center justify-center'>
                    <ButtonComponent height={55} type='primary' size='medium' onPress={() => {}} title='All' />
                    <SpaceComponent width={5} />
                    <ButtonComponent height={55} type='outline' size='medium' onPress={() => {}} title='Coming' />
                    <SpaceComponent width={5} />
                    <ButtonComponent height={55} type='outline' size='medium' onPress={() => {}} title='Past' />
                </View>
            </SectionComponent>
            <SectionComponent>
                <DetailsAttendanceCard
                    type='Approved'
                    color='#a8d344'
                    onPress={() => router.push('/(tabs)/attendance/20302')}
                />
                <DetailsAttendanceCard type='Pending' color={appColors.success2} />
                <DetailsAttendanceCard type='Rejected' color={appColors.error2} />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
