import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComponent, ContainerComponent, SectionComponent, SpaceComponent } from '@/components';
import { router, useLocalSearchParams } from 'expo-router';

export default function ShowQrCodeScreen() {
    const { QrCode } = useLocalSearchParams();
    console.log({
        QrCode,
    });
    return (
        <ContainerComponent isModal title='QRCode' back>
            <SectionComponent className='justify-center items-center'>
                <Image source={{ uri: QrCode?.toString() }} style={{ width: 400, height: 400 }} />
            </SectionComponent>
            <SectionComponent className='flex-row justify-center'>
                <ButtonComponent title='Close' onPress={() => router.back()} size='small' type='error' />
                <SpaceComponent width={8} />
                <ButtonComponent title='Save' onPress={() => {}} size='small' type='success' />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
