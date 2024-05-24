import authenticationAPI from '@apis/authApi';
import {
    ButtonComponent,
    ContainerComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@components/index';
import { appColors } from '@constants/appColors';
import LoadingModal from '@modals/LoadingModal';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OtpInput } from 'react-native-otp-entry';

export default function VerificationScreen() {
    const { fullName, email, password, code, type } = useLocalSearchParams();
    const [otp, setOtp] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const { t } = useTranslation();

    const handleVerify = async (inputCode: string) => {
        setIsLoading(true);
        console.log(code, inputCode);
        if (code !== inputCode) {
            setIsLoading(false);
            setError(t('verification.invalidCode'));
            return;
        }

        try {
            if (type === 'signup') {
                const res = await authenticationAPI.HandleAuthentication(
                    '/register',
                    { fullName, email, password },
                    'post'
                );
                setIsLoading(false);
                Alert.alert('Success', t('verification.registerSuccess'));
            }
            if (type === 'forgot') {
                setIsLoading(false);
                router.push({
                    pathname: '/newPassword',
                    params: {
                        email,
                    },
                });
                Alert.alert('Success', t('verification.verificationSuccess'));
            }
        } catch (error) {
            setError(t('verification.somethingWentWrong'));
            setIsLoading(false);
        }
    };

    return (
        <ContainerComponent isAuth isScroll back>
            <KeyboardAwareScrollView>
                <SectionComponent>
                    <TextComponent className='text-[28px] font-inter700 mb-2'>
                        {t('verification.enterVerificationCode')}
                    </TextComponent>
                    <TextComponent className=' text-grayText text-base'>
                        {t('verification.verificationCodeSent')}
                    </TextComponent>
                </SectionComponent>
                <SectionComponent className='w-[100%] h-[250px]'>
                    <Image source={require('@assets/images/verification.png')} className='w-full h-full' />
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
                        <TextComponent className='mr-1'>{t('verification.didNotReceiveCode')}</TextComponent>
                        <Pressable className='' onPress={() => {}}>
                            <TextComponent className='text-primary-500'>{t('verification.resend')}</TextComponent>
                        </Pressable>
                    </View>
                    {error && <TextComponent className='text-error mt-2 text-center'>{error}</TextComponent>}
                </SectionComponent>
                <SpaceComponent height={80} />
                <SectionComponent>
                    <ButtonComponent
                        title={t('verification.verify')}
                        onPress={() => handleVerify(otp)}
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
