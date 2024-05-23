import { ContainerComponent, TextComponent } from '@/components';
import { appColors } from '@/constants/appColors';
import { appInfos } from '@/constants/appInfos';
import { authSelector, setAuthData } from '@/redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, router } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';

export default function OnBoardingScreen() {
    const [index, setIndex] = React.useState(0);
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const checkAuth = async () => {
        const res = await AsyncStorage.getItem('auth');
        if (res) {
            const authData = JSON.parse(res);
            console.log(authData);
            dispatch(setAuthData(authData));
        }
    };

    const checkTheFirstTime = async () => {
        const res = await AsyncStorage.getItem('IsFirstTime');
        if (res) {
            router.replace('/login');
        }
    };

    useEffect(() => {
        checkAuth();
        checkTheFirstTime();
    }, []);

    if (auth.accessToken) {
        return <Redirect href={'/'} />;
    }

    return (
        <ContainerComponent isAuth isOnboarding>
            <View className='flex-1 bg-white'>
                <Swiper
                    loop={false}
                    onIndexChanged={(num) => setIndex(num)}
                    index={index}
                    dotColor={'#101317'}
                    activeDotColor={appColors.primary}
                >
                    <Image
                        source={require('../assets/images/onboarding-1.png')}
                        style={{
                            flex: 1,
                            width: appInfos.sizes.WIDTH,
                            height: appInfos.sizes.HEIGHT,
                            resizeMode: 'cover',
                        }}
                    />
                    <Image
                        source={require('../assets/images/onboarding-2.png')}
                        style={{
                            flex: 1,
                            width: appInfos.sizes.WIDTH,
                            height: appInfos.sizes.HEIGHT,
                            resizeMode: 'cover',
                        }}
                    />
                    <Image
                        source={require('../assets/images/onboarding-3.png')}
                        style={{
                            flex: 1,
                            width: appInfos.sizes.WIDTH,
                            height: appInfos.sizes.HEIGHT,
                            resizeMode: 'cover',
                        }}
                    />
                </Swiper>
                <View
                    style={[
                        {
                            paddingHorizontal: 22,
                            paddingVertical: 20,
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                    ]}
                >
                    <TouchableOpacity onPress={() => router.replace('/login')}>
                        <TextComponent className='text-gray-600'>{t('onBoarding.skip')}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (index < 2 ? setIndex(index + 1) : router.replace('/login'))}>
                        <TextComponent className='text-gray-800 font-bold'>{t('onBoarding.next')}</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
