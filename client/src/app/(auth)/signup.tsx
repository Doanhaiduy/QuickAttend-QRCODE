import authenticationAPI from '@apis/authApi';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@components/index';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingModal from '@modals/LoadingModal';
import { schemasCustom } from '@utils/zod';
import Checkbox from 'expo-checkbox';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
            email: 'haiduytbt2k3@gmail.com',
            password: '12345678a',
            confirmPassword: '12345678a',
        },
        resolver: zodResolver(schema),
    });

    const [isCheck, setIsCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            if (!isCheck) {
                setError('root', { type: 'manual', message: t('signUp.pleaseAgreeToTerms') });
            } else {
                setIsLoading(true);
                const { fullName, email, password } = data;
                const res = await authenticationAPI.HandleAuthentication(
                    '/verification',
                    {
                        email,
                        fullName,
                    },
                    'post'
                );
                setIsLoading(false);
                console.log(res);
                router.push({
                    pathname: '/verification',
                    params: {
                        fullName,
                        email,
                        password,
                        code: res.data.code,
                        type: 'signup',
                    },
                });
            }
        } catch (error) {
            console.log(error);
            setError('email', { type: 'manual', message: t('signUp.emailAlreadyExists') });
            setIsLoading(false);
        }
    };

    return (
        <ContainerComponent isAuth isScroll>
            <KeyboardAwareScrollView>
                <StatusBar style='dark' />
                <SectionComponent>
                    <Image source={require('@assets/images/logo.png')} className='w-[80px] h-[80px]' />
                    <SpaceComponent height={20} />
                    <TextComponent className='text-[28px] font-inter700'>{t('signUp.registerAccount')}</TextComponent>
                    <TextComponent className='text-[28px] font-inter700'>
                        {t('signUp.toQuickAttend')}{' '}
                        <TextComponent className='text-primary-500 font-inter700'>QuickAttend</TextComponent>
                    </TextComponent>
                    <TextComponent className='text-sm text-grayText'>
                        {t('signUp.helloRegisterToContinue')}
                    </TextComponent>
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
                                placeholder={t('signUp.enterFullName')}
                                label={t('signUp.fullNameLabel')}
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
                                placeholder={t('signUp.enterEmail')}
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
                                placeholder={t('signUp.enterPassword')}
                                label={t('signUp.passwordLabel')}
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
                                placeholder={t('signUp.confirmPasswordPlaceholder')}
                                label={t('signUp.confirmPasswordLabel')}
                                isPassword
                                err={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Pressable className='flex-row max-w-[90%] ' onPress={() => setIsCheck(!isCheck)}>
                        <Checkbox value={isCheck} onValueChange={setIsCheck} className='mr-2' />
                        <TextComponent className='font-inter'>
                            {t('signUp.agreeToTerms')}{' '}
                            <Link href={'/'} className='text-primary-500'>
                                {t('signUp.termsAndConditions')}
                            </Link>{' '}
                            {t('signUp.setOutByThisSite')}
                        </TextComponent>
                    </Pressable>
                </SectionComponent>
                {errors.root && <TextComponent className='text-error text-center'>{errors.root.message}</TextComponent>}
                <SectionComponent>
                    <ButtonComponent
                        size='large'
                        type='primary'
                        onPress={handleSubmit(onSubmit)}
                        title={t('signUp.register')}
                    />
                    <SpaceComponent height={20} />
                    <TextComponent className='text-sm text-grayText text-center'>
                        {t('signUp.orContinueWithSocialAccount')}
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
                        {t('signUp.alreadyHaveAccount')}
                        <SpaceComponent width={2} />
                        <Link href='/login' className='text-primary-500 '>
                            {t('signUp.login')}
                        </Link>
                    </TextComponent>
                </SectionComponent>
                <LoadingModal visible={isLoading} message={t('signUp.registering')} />
            </KeyboardAwareScrollView>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
