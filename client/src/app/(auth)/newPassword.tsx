import React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { schemasCustom } from '@/utils/zod';
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from '@/components';
import LoadingModal from '@/modals/LoadingModal';
import authenticationAPI from '@/apis/authApi';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const schema = z
    .object({
        password: schemasCustom.password('SignUp'),
        confirmPassword: schemasCustom.confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof schema>;
export default function NewPasswordScreen() {
    const { email } = useLocalSearchParams();
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);
        const { password } = data;
        try {
            const res = await authenticationAPI.HandleAuthentication(
                '/resetPassword',
                { email, newPassword: password },
                'post'
            );
            setIsLoading(false);
            Alert.alert('Success', t('newPassword.successPasswordUpdated'));
            router.navigate('/login');
        } catch (error: any) {
            setIsLoading(false);
            setError('root', {
                type: 'manual',
                message: error,
            });
        }
    };
    return (
        <ContainerComponent isAuth isScroll back>
            <KeyboardAwareScrollView>
                <SectionComponent>
                    <TextComponent className='text-[28px] font-inter700 mb-2'>
                        {t('newPassword.enterNewPassword')}
                    </TextComponent>
                    <TextComponent className=' text-grayText text-base'>
                        {t('newPassword.pleaseEnterNewPassword')}
                    </TextComponent>
                </SectionComponent>
                <SectionComponent className='w-[100%] h-[240px]'>
                    <Image source={require('../../assets/images/new-password.png')} className='w-full h-full' />
                </SectionComponent>
                <SectionComponent>
                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <InputComponent
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={t('newPassword.enterNewPasswordPlaceholder')}
                                label={t('newPassword.newPasswordLabel')}
                                err={errors.password?.message}
                                isPassword
                            />
                        )}
                        name='password'
                    />

                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <InputComponent
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                placeholder={t('newPassword.reenterNewPasswordPlaceholder')}
                                label={t('newPassword.confirmNewPasswordLabel')}
                                err={errors.confirmPassword?.message}
                                isPassword
                            />
                        )}
                        name='confirmPassword'
                    />
                </SectionComponent>
                {errors.root && <TextComponent className='text-error text-center'>{errors.root.message}</TextComponent>}
                <SectionComponent>
                    <ButtonComponent
                        title={t('newPassword.updatePassword')}
                        onPress={handleSubmit(onSubmit)}
                        size='large'
                        type='primary'
                    />
                </SectionComponent>
                <LoadingModal visible={isLoading} />
            </KeyboardAwareScrollView>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
