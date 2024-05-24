import userAPI from '@apis/userApi';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    TextComponent,
} from '@components/index';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingModal from '@modals/LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSelector, setAuthData } from '@redux/reducers/authReducer';
import { schemasCustom } from '@utils/zod';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

const schema = z.object({
    fullName: schemasCustom.fullName,
    phone: schemasCustom.phone.optional().or(z.literal('')),
    email: schemasCustom.email,
    username: z.string().min(1, { message: 'Username is required' }),
    address: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function EditProfileScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [otherData, setOtherData] = useState<{
        phone: string;
        address: string;
    }>();

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormFields>({
        defaultValues: {
            fullName: auth.fullName || '',
            phone: otherData?.phone || '',
            email: auth.email || '',
            username: auth.username || '',
            address: otherData?.address || '',
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);
        try {
            const res = await userAPI.HandleUser(`/${auth.id}`, data, 'put');
            const newData = {
                fullName: res.data.fullName,
                username: res.data.username,
            };
            const newAuthData = { ...auth, ...newData };
            await AsyncStorage.setItem('auth', JSON.stringify(newAuthData));
            dispatch(setAuthData(newAuthData));
            Alert.alert('Success', t('editProfile.successAlertMessage'));
            router.back();
            setIsLoading(false);
        } catch (error: any) {
            setError(`${error.startsWith('username') ? 'username' : 'root'}`, { type: 'manual', message: error });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    const getProfileData = async () => {
        try {
            const res = await userAPI.HandleUser(`/${auth.id}`, null, 'get');
            setOtherData({
                phone: res.data.phone,
                address: res.data.address,
            });
        } catch (error) {
            // setError('root', { type: 'manual', message: 'Error' });
        }
    };

    return (
        <ContainerComponent isScroll back title={t('editProfile.editProfileTitle')}>
            <SectionComponent>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            label={t('editProfile.fullNameLabel')}
                            placeholder={t('editProfile.fullNamePlaceholder')}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            err={errors.fullName?.message}
                        />
                    )}
                    name='fullName'
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            isDisabled
                            label='Email'
                            placeholder={t('editProfile.emailPlaceholder')}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            err={errors.email?.message}
                        />
                    )}
                    name='email'
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            label={t('editProfile.phoneLabel')}
                            placeholder={t('editProfile.phonePlaceholder')}
                            value={value || otherData?.phone || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            err={errors.phone?.message}
                        />
                    )}
                    name='phone'
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            label={t('editProfile.usernameLabel')}
                            placeholder={t('editProfile.usernamePlaceholder')}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            err={errors.username?.message}
                        />
                    )}
                    name='username'
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            label={t('editProfile.addressLabel')}
                            placeholder={t('editProfile.addressPlaceholder')}
                            value={value || otherData?.address || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            err={errors.address?.message}
                        />
                    )}
                    name='address'
                />
                {errors.root && <TextComponent className='text-error'>{errors.root.message}</TextComponent>}
                <ButtonComponent
                    title={t('editProfile.saveButtonTitle')}
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
