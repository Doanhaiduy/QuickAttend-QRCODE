import { ContainerComponent, NotificationCard, SectionComponent } from '@components/index';
import React from 'react';
import { StyleSheet } from 'react-native';

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
