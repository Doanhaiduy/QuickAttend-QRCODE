import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComponent, ContainerComponent, SectionComponent, TextComponent } from '@/components';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetails() {
    const { id } = useLocalSearchParams();
    return (
        <ContainerComponent back isScroll title={`Event Details ${id}`}>
            <SectionComponent>
                <View className='pb-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Title</TextComponent>
                    <TextComponent className='text-base text-blackText'>Sick Leave</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Location</TextComponent>
                    <TextComponent className='text-base text-blackText'>New York</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Time Start</TextComponent>
                    <TextComponent className='text-base text-blackText'> August 26, 2024 9:00 AM</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Time End</TextComponent>
                    <TextComponent className='text-base text-blackText'> August 26, 2024 11:00 AM</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Status</TextComponent>
                    <TextComponent className='text-base text-blackText'>Live</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Security Code</TextComponent>
                    <TextComponent className='text-base text-blackText'>123456</TextComponent>
                </View>
                <View className='py-3 border-b-[0.5px] border-gray-200'>
                    <TextComponent className='text-[12px] text-grayText mb-[2px]'>Description</TextComponent>
                    <TextComponent className='text-base text-blackText'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui at ante consectetur
                        consectetur. Nulla nec dui at ante consectetur consectetur.
                    </TextComponent>
                </View>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title='QRCODE'
                    type='primary'
                    size='large'
                    onPress={() => {}}
                    icon={<Ionicons name='chevron-forward' size={24} color='white' />}
                    iconFlex='right'
                />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
