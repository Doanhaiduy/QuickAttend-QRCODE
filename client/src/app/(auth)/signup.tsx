import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@/components';
import { sleep } from '@/helpers';
import LoadingModal from '@/modals/LoadingModal';
import { schemasCustom } from '@/utils/zod';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from 'expo-checkbox';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Image, Pressable, StyleSheet } from 'react-native';
import { z } from 'zod';

const schema = z
    .object({
        fullName: schemasCustom.fullName,
        email: schemasCustom.email,
        password: schemasCustom.password('SignUp'),
        confirmPassword: schemasCustom.confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof schema>;

export default function SignUpScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormFields>({
        defaultValues: {
            fullName: 'Đoàn Hải Duy',
            email: 'duy@gmail.com',
            password: '12345678a',
            confirmPassword: '12345678a',
        },
        resolver: zodResolver(schema),
    });

    const [isCheck, setIsCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);
        try {
            await sleep(1000);
            const { fullName, email, password } = data;
            console.log({ fullName, email, password });
            setIsLoading(false);
            router.push('verification');
        } catch (error) {
            console.log(error);
            setError('email', { type: 'manual', message: 'Email already exists' });
            setIsLoading(false);
        }
    };

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
                <Controller
                    control={control}
                    name='fullName'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder='Enter Full Name'
                            label='Full Name'
                            err={errors.fullName?.message}
                        />
                    )}
                />
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

                <Controller
                    control={control}
                    name='confirmPassword'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder='Confirm Password'
                            label='Confirm Password'
                            isPassword
                            err={errors.confirmPassword?.message}
                        />
                    )}
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
                <ButtonComponent size='large' type='primary' onPress={handleSubmit(onSubmit)} title='Register' />
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
            <LoadingModal visible={isLoading} message='Registering...' />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
