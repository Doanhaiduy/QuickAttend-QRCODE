import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import TextComponent from '@/src/components/TextComponent';
import SectionComponent from '@/src/components/SectionComponent';
import SpaceComponent from '@/src/components/SpaceComponent';
import InputComponent from '@/src/components/InputComponent';
import ButtonComponent from '@/src/components/ButtonComponent';
import { router } from 'expo-router';
import { z } from 'zod';
import { schemasCustom } from '@/src/utils/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/src/helpers';
import LoadingModal from '@/src/modals/LoadingModal';

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
            await sleep(1000);
            setIsLoading(false);
            router.navigate('/login');
        } catch (error) {
            setIsLoading(false);
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
            <SectionComponent>
                <ButtonComponent title='Update Password' onPress={handleSubmit(onSubmit)} size='large' type='primary' />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
