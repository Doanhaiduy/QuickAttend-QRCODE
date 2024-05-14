import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack, router } from 'expo-router';
import InputComponent from '@/src/components/InputComponent';
import ButtonComponent from '@/src/components/ButtonComponent';
import { Ionicons } from '@expo/vector-icons';
import ContainerComponent from '@/src/components/ContainerComponent';
import SectionComponent from '@/src/components/SectionComponent';
import { StatusBar } from 'expo-status-bar';

export default function LoginPage() {
    const [email, setEmail] = useState('');

    return (
        <ContainerComponent isAuth>
            <StatusBar style='dark' />
            <SectionComponent>
                <Image source={require('../../assets/images/logo.png')} className='w-[80px] h-[80px]' />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
