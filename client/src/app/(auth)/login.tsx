import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack, router } from 'expo-router';
import InputComponent from '@/src/components/InputComponent';
import ButtonComponent from '@/src/components/ButtonComponent';
import { Ionicons } from '@expo/vector-icons';
import ContainerComponent from '@/src/components/ContainerComponent';
import SectionComponent from '@/src/components/SectionComponent';
import { StatusBar } from 'expo-status-bar';
import SpaceComponent from '@/src/components/SpaceComponent';
import TextComponent from '@/src/components/TextComponent';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ContainerComponent isAuth isScroll>
            <StatusBar style='dark' />
            <SectionComponent>
                <Image source={require('../../assets/images/logo.png')} className='w-[80px] h-[80px]' />
                <SpaceComponent height={20} />
                <TextComponent className='text-[28px] font-inter700'>Welcome Back 👋 </TextComponent>
                <TextComponent className='text-[28px] font-inter700'>
                    to <TextComponent className='text-primary-500 font-inter700'>QuickAttend</TextComponent>
                </TextComponent>
                <TextComponent className='text-sm text-grayText'>Hello there, login to continue</TextComponent>
            </SectionComponent>
            <SpaceComponent height={4} />
            <SectionComponent>
                <InputComponent
                    value={email}
                    onChange={(val) => setEmail(val)}
                    placeholder='example@mail.com'
                    label='Email Address'
                />
                <InputComponent
                    value={password}
                    onChange={(val) => setPassword(val)}
                    isPassword
                    placeholder='Enter Password'
                    label='Password'
                />
                <Link href='/forgot' className='text-primary-500 text-sm text-right mt-[-6px]'>
                    Forgot password?
                </Link>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent size='large' title='Login' type='primary' onPress={() => router.push('/home')} />
                <SpaceComponent height={20} />
                <TextComponent className='text-sm text-grayText text-center'>
                    Or continue with social account
                </TextComponent>
                <SpaceComponent height={20} />
                <ButtonComponent
                    size='large'
                    type='outline'
                    icon={<Ionicons name='logo-google' size={24} color={'#000'} />}
                    title='Google'
                    onPress={() => router.push('/home')}
                />
            </SectionComponent>
            <SpaceComponent height={68} />
            <SectionComponent>
                <TextComponent className='text-sm text-center'>
                    Don't have an account?
                    <SpaceComponent width={2} />
                    <Link href='/signup' className='text-primary-500 '>
                        SignUp
                    </Link>
                </TextComponent>
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
