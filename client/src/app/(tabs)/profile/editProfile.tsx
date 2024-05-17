import userAPI from '@/apis/userApi';
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from '@/components';
import LoadingModal from '@/modals/LoadingModal';
import { authSelector, setAuthData } from '@/redux/reducers/authReducer';
import { schemasCustom } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
            Alert.alert('Success', 'Update profile successfully');
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
        <ContainerComponent isScroll back title='Edit Profile'>
            <SectionComponent>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputComponent
                            label='Full Name'
                            placeholder='Enter your full name'
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
                            label='Email'
                            isDisabled
                            placeholder='Enter your email'
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
                            label='Phone'
                            placeholder='Enter your phone number'
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
                            label='Username'
                            placeholder='Enter your username'
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
                            label='Address'
                            placeholder='Enter your address'
                            value={value || otherData?.address || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            err={errors.address?.message}
                        />
                    )}
                    name='address'
                />
                {errors.root && <TextComponent className='text-error'>{errors.root.message}</TextComponent>}
                <ButtonComponent title='Save' type='primary' size='large' onPress={handleSubmit(onSubmit)} />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
