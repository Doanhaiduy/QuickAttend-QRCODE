import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import TextComponent from '@/src/components/TextComponent';
import SectionComponent from '@/src/components/SectionComponent';
import SpaceComponent from '@/src/components/SpaceComponent';
import InputComponent from '@/src/components/InputComponent';
import ButtonComponent from '@/src/components/ButtonComponent';
import { router } from 'expo-router';

export default function NewPasswordScreen() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    return (
        <ContainerComponent isAuth isScroll back>
            <SectionComponent>
                <TextComponent className='text-[28px] font-inter700 mb-2'>Enter New Password</TextComponent>
                <TextComponent className=' text-grayText text-base'>Please enter your new password</TextComponent>
            </SectionComponent>
            <SectionComponent className='w-[100%] h-[240px]'>
                <Image source={require('../../assets/images/new-password.png')} className='w-full h-full' />
            </SectionComponent>
            <SectionComponent>
                <InputComponent
                    value={password}
                    onChange={(val) => setPassword(val)}
                    placeholder='Enter New Password'
                    label='New Password'
                />
                <InputComponent
                    value={password}
                    onChange={(val) => setPassword(val)}
                    placeholder='Re-enter New Password'
                    label='Confirm New Password'
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title='Update Password'
                    onPress={() => {
                        router.navigate('/login');
                    }}
                    size='large'
                    type='primary'
                />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
