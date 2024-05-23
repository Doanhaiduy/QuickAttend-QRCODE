import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { schemasCustom } from '@/utils/zod';
import authenticationAPI from '@/apis/authApi';
import { setAuthData } from '@/redux/reducers/authReducer';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@/components';
import LoadingModal from '@/modals/LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

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
            email: 'haiduytbt2k3@gmail.com',
            password: 'haiduy10',
        },
        resolver: zodResolver(schema),
    });

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);
        try {
            const { email, password } = data;
            const res = await authenticationAPI.HandleAuthentication('/login', { email, password }, 'post');
            dispatch(setAuthData(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify(res.data));
            // await AsyncStorage.setItem('IsFirstTime', 'false');
            Alert.alert('Success', t('successLogin'));
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setError('root', {
                type: 'manual',
                message: error,
            });
        }
    };

    return (
        <ContainerComponent isAuth isScroll>
            <StatusBar style='dark' />
            <SectionComponent>
                <Image source={require('../../assets/images/logo.png')} className='w-[80px] h-[80px]' />
                <SpaceComponent height={20} />
                <TextComponent className='text-[28px] max-w-[80%] font-inter700'>
                    {t('login.welcomeBack')}{' '}
                </TextComponent>
                <TextComponent className='text-[28px] font-inter700'>
                    {t('login.toQuickAttend')}{' '}
                    <TextComponent className='text-primary-500 font-inter700'>QuickAttend</TextComponent>
                </TextComponent>
                <TextComponent className='text-sm text-grayText'>{t('login.helloLoginToContinue')}</TextComponent>
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
                            placeholder={t('login.enterEmail')}
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
                            placeholder={t('login.enterPassword')}
                            label={t('login.password')}
                            isPassword
                            err={errors.password?.message}
                        />
                    )}
                />

                <Link href='/forgot' className='text-primary-500 text-sm text-right mt-[-6px]'>
                    {t('login.forgotPassword')}
                </Link>

                <TextComponent className='text-error text-sm text-center mt-4'>{errors.root?.message}</TextComponent>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    size='large'
                    title={t('login.login')}
                    type='primary'
                    onPress={handleSubmit(onSubmit)}
                />
                <SpaceComponent height={20} />
                <TextComponent className='text-sm text-grayText text-center'>
                    {t('login.orContinueWithSocialAccount')}
                </TextComponent>
                <SpaceComponent height={20} />
                <ButtonComponent
                    size='large'
                    type='outline'
                    icon={<Ionicons name='logo-google' size={24} color={'#000'} />}
                    title='Google'
                    onPress={async () => {
                        await AsyncStorage.clear();
                    }}
                />
            </SectionComponent>
            <SpaceComponent height={68} />
            <SectionComponent>
                <TextComponent className='text-sm text-center'>
                    {t('login.dontHaveAccount')}
                    <SpaceComponent width={2} />
                    <Link href='/signup' className='text-primary-500 '>
                        {t('login.signUp')}
                    </Link>
                </TextComponent>
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
