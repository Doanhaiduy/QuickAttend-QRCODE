import authenticationAPI from '@apis/authApi';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    TextComponent,
} from '@components/index';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingModal from '@modals/LoadingModal';
import { authSelector } from '@redux/reducers/authReducer';
import { schemasCustom } from '@utils/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { z } from 'zod';

const schema = z
    .object({
        currentPassword: z.string().min(0, { message: 'Current password is required' }),
        password: schemasCustom.password('SignUp'),
        confirmPassword: schemasCustom.confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof schema>;

export default function ChangePasswordScreen() {
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
    const auth = useSelector(authSelector);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);
        const { password, currentPassword } = data;
        try {
            const res = await authenticationAPI.HandleAuthentication(
                '/changePassword',
                { id: auth.id, currentPassword, newPassword: password },
                'post'
            );
            setIsLoading(false);
            Alert.alert('Success', t('changePassword.newPasswordSuccessPasswordUpdated'));
            router.back();
        } catch (error: any) {
            setIsLoading(false);
            console.log(error);
            setError('root', {
                type: 'manual',
                message: error,
            });
        }
    };

    return (
        <ContainerComponent back isScroll title={t('changePassword.changePasswordTitle')}>
            <SectionComponent className='justify-between '>
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <InputComponent
                            label={t('changePassword.currentPassword')}
                            placeholder={t('changePassword.enterCurrentPassword')}
                            isPassword
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            err={errors.currentPassword?.message}
                        />
                    )}
                    name='currentPassword'
                />
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <InputComponent
                            label={t('changePassword.newPassword')}
                            placeholder={t('changePassword.enterNewPassword')}
                            isPassword
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            err={errors.password?.message}
                        />
                    )}
                    name='password'
                />
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <InputComponent
                            label={t('changePassword.confirmPassword')}
                            placeholder={t('changePassword.enterNewPasswordAgain')}
                            isPassword
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            err={errors.confirmPassword?.message}
                        />
                    )}
                    name='confirmPassword'
                />
            </SectionComponent>
            {errors.root && <TextComponent className='text-error text-center'>{errors.root.message}</TextComponent>}
            <SectionComponent>
                <ButtonComponent
                    title={t('changePassword.changePasswordButton')}
                    type='primary'
                    size='large'
                    onPress={handleSubmit(onSubmit)}
                />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
