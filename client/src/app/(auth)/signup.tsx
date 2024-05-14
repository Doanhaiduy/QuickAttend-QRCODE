import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ContainerComponent from '@/src/components/ContainerComponent';
import SectionComponent from '@/src/components/SectionComponent';
import { StatusBar } from 'expo-status-bar';
import SpaceComponent from '@/src/components/SpaceComponent';
import InputComponent from '@/src/components/InputComponent';
import Checkbox from 'expo-checkbox';
import TextComponent from '@/src/components/TextComponent';
import { Link, router } from 'expo-router';
import ButtonComponent from '@/src/components/ButtonComponent';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCheck, setIsCheck] = useState(false);

    return (
        <ContainerComponent isAuth isScroll>
            <StatusBar style='dark' />
            <SectionComponent>
                <Image source={require('../../assets/images/logo.png')} className='w-[80px] h-[80px]' />
                <SpaceComponent height={20} />
                <TextComponent className='text-[28px] font-inter700'>Register Account</TextComponent>
                <TextComponent className='text-[28px] font-inter700'>
                    to <TextComponent className='text-primary-500 font-inter700'>QuickAttend</TextComponent>
                </TextComponent>
                <TextComponent className='text-sm text-grayText'>Hello there, Register to continue</TextComponent>
            </SectionComponent>
            <SpaceComponent height={4} />
            <SectionComponent>
                <InputComponent
                    value={fullName}
                    onChange={(val) => setFullName(val)}
                    placeholder='John Doe'
                    label='Full Name'
                />
                <InputComponent
                    value={email}
                    onChange={(val) => setEmail(val)}
                    placeholder='example@mail.com'
                    label='Email'
                />
                <InputComponent
                    value={password}
                    onChange={(val) => setPassword(val)}
                    isPassword
                    placeholder='Enter Password'
                    label='Password'
                />
                <InputComponent
                    value={confirmPassword}
                    onChange={(val) => setConfirmPassword(val)}
                    isPassword
                    placeholder='Confirm Password'
                    label='Confirm Password'
                />

                <Pressable className='flex-row max-w-[90%] ' onPress={() => setIsCheck(!isCheck)}>
                    <Checkbox value={isCheck} onValueChange={setIsCheck} className='mr-2' />
                    <TextComponent className='font-inter'>
                        I agree to the{' '}
                        <Link href={'/'} className='text-primary-500'>
                            Terms & Conditions & Privacy Policy
                        </Link>{' '}
                        set out by this site.
                    </TextComponent>
                </Pressable>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    size='large'
                    type='primary'
                    onPress={() => {
                        router.push('verification');
                    }}
                    title='Register'
                />
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
            <SectionComponent>
                <TextComponent className='text-sm text-center'>
                    Already have an account?
                    <SpaceComponent width={2} />
                    <Link href='/login' className='text-primary-500 '>
                        Login
                    </Link>
                </TextComponent>
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
