import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { Redirect, Stack, router } from 'expo-router';
import ContainerComponent from '@/src/components/ContainerComponent';
import { appColors } from '@/src/constants/appColors';
import { appInfos } from '@/src/constants/appInfos';

export default function OnBoardingScreen() {
    const [index, setIndex] = React.useState(0);

    const [isFirstTime, setIsFirstTime] = React.useState(false);

    if (isFirstTime) {
        return <Redirect href='/login' />;
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
                        source={require('../../assets/images/onboarding-1.png')}
                        style={{
                            flex: 1,
                            width: appInfos.sizes.WIDTH,
                            height: appInfos.sizes.HEIGHT,
                            resizeMode: 'cover',
                        }}
                    />
                    <Image
                        source={require('../../assets/images/onboarding-2.png')}
                        style={{
                            flex: 1,
                            width: appInfos.sizes.WIDTH,
                            height: appInfos.sizes.HEIGHT,
                            resizeMode: 'cover',
                        }}
                    />
                    <Image
                        source={require('../../assets/images/onboarding-3.png')}
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
                        <Text className='text-gray-600'>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (index < 2 ? setIndex(index + 1) : router.replace('/login'))}>
                        <Text className='text-gray-800 font-bold'>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
