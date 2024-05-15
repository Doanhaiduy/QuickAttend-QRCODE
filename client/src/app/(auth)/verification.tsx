import authenticationAPI from '@/apis/authApi';
import { ButtonComponent, ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '@/components';
import { appColors } from '@/constants/appColors';
import LoadingModal from '@/modals/LoadingModal';
import { setAuthData } from '@/redux/reducers/authReducer';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useDispatch } from 'react-redux';
import { set } from 'zod';
export default function VerificationScreen() {
    const { fullName, email, password, code, type } = useLocalSearchParams();
    const [otp, setOtp] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const dispatch = useDispatch();

    const handleVerify = async (inputCode: string) => {
        setIsLoading(true);
        console.log(code, inputCode);
        if (code !== inputCode) {
            setIsLoading(false);
            setError('Invalid code');
            return;
        }

        try {
            if (type === 'signup') {
                const res = await authenticationAPI.HandleAuthentication(
                    '/register',
                    { fullName, email, password },
                    'post'
                );
                console.log(res);
                dispatch(setAuthData(res.data));
                setIsLoading(false);
                Alert.alert('Success', 'Register successfully');
            }
            if (type === 'forgot') {
                setIsLoading(false);
                router.push({
                    pathname: '/newPassword',
                    params: {
                        email,
                    },
                });
            }
        } catch (error) {
            setError('Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        <ContainerComponent isAuth isScroll back>
            <SectionComponent>
                <TextComponent className='text-[28px] font-inter700 mb-2'>Enter Verification Code</TextComponent>
                <TextComponent className=' text-grayText text-base'>
                    We have sent the code verification to your email address
                </TextComponent>
            </SectionComponent>
            <SectionComponent className='w-[100%] h-[250px]'>
                <Image source={require('../../assets/images/verification.png')} className='w-full h-full' />
            </SectionComponent>
            <SpaceComponent height={20} />
            <SectionComponent>
                <OtpInput
                    numberOfDigits={4}
                    autoFocus
                    focusColor={appColors.primary}
                    onTextChange={(text) => setOtp(text)}
                    onFilled={(code) => handleVerify(code)}
                    theme={{
                        pinCodeContainerStyle: {
                            width: 70,
                            height: 70,
                            backgroundColor: appColors.white,
                            borderColor: error ? appColors.error : appColors.primary,
                        },
                    }}
                />
                <View className='flex-row items-end self-end mt-4'>
                    <TextComponent className='mr-1'>Didn't receive the code?</TextComponent>
                    <Pressable className='' onPress={() => {}}>
                        <TextComponent className='text-primary-500'>Resend</TextComponent>
                    </Pressable>
                </View>
                {error && <TextComponent className='text-error mt-2 text-center'>{error}</TextComponent>}
            </SectionComponent>
            <SpaceComponent height={80} />
            <SectionComponent>
                <ButtonComponent title='Verify' onPress={() => handleVerify(otp)} size='large' type='primary' />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
