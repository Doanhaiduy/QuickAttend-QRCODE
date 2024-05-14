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
import { z } from 'zod';
import { schemasCustom } from '@/src/utils/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/src/helpers';
import LoadingModal from '@/src/modals/LoadingModal';

const schema = z.object({
    email: schemasCustom.email,
    password: schemasCustom.password('Login'),
});

type FormFields = z.infer<typeof schema>;

export default function LoginScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormFields>({
        defaultValues: {
            email: 'haiduy@gmail.com',
            password: '12345678a',
        },
        resolver: zodResolver(schema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);
        try {
            await sleep(1000);
            const { email, password } = data;
            console.log({ email, password });
            setIsLoading(false);
            router.push('home');
        } catch (error) {
            setIsLoading(false);
            setError('root', {
                type: 'manual',
                message: 'Email or password is incorrect',
            });
        }
    };
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
                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder='Enter Email'
                            label='Email'
                            err={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder='Enter Password'
                            label='Password'
                            isPassword
                            err={errors.password?.message}
                        />
                    )}
                />

                <Link href='/forgot' className='text-primary-500 text-sm text-right mt-[-6px]'>
                    Forgot password?
                </Link>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent size='large' title='Login' type='primary' onPress={handleSubmit(onSubmit)} />
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
                    onPress={() => {}}
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
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
