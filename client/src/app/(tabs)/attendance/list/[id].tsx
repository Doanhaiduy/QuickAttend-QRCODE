import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ContainerComponent, SectionComponent } from '@/components';

export default function ListScreen() {
    const { id } = useLocalSearchParams();
    return (
        <ContainerComponent isScroll>
            <SectionComponent>
                <Text>List Screen {id}</Text>
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
