import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ContainerComponent, NotificationCard, SectionComponent, TodayListEvent } from '@/components';

export default function NotificationScreen() {
    return (
        <ContainerComponent isScroll title='Notification'>
            <SectionComponent>
                <NotificationCard type='Auth' />
                <NotificationCard type='Event' />
                <NotificationCard type='Event' />
                <NotificationCard type='Profile' />
                <NotificationCard type='Profile' />
                <NotificationCard type='Event' />
                <NotificationCard type='Event' />
                <NotificationCard type='Auth' />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
