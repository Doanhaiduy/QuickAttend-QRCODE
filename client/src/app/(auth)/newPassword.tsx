import React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { schemasCustom } from '@/utils/zod';
import { sleep } from '@/helpers';
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from '@/components';
import LoadingModal from '@/modals/LoadingModal';
import authenticationAPI from '@/apis/authApi';

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
            Alert.alert('Success', 'Password updated successfully');
            router.navigate('/login');
        } catch (error: any) {
            setIsLoading(false);
            setError('root', error);
        }
    };
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
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <InputComponent
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            placeholder='Enter New Password'
                            label='New Password'
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
                            placeholder='Re-enter New Password'
                            label='Confirm New Password'
                            err={errors.confirmPassword?.message}
                            isPassword
                        />
                    )}
                    name='confirmPassword'
                />
            </SectionComponent>
            {errors.root && <TextComponent className='text-error text-center'>{errors.root.message}</TextComponent>}
            <SectionComponent>
                <ButtonComponent title='Update Password' onPress={handleSubmit(onSubmit)} size='large' type='primary' />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
