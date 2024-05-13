import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ContainerComponent from '../components/ContainerComponent';
import Swiper from 'react-native-swiper';
import { appInfos } from '../constants/appInfos';
import { appColors } from '../constants/appColors';
import { router } from 'expo-router';

export default function OnBoardingScreen() {
    const [index, setIndex] = React.useState(0);

    return (
        <ContainerComponent isAuth>
            <View className='flex-1'>
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
                    <TouchableOpacity onPress={() => router.push('(auth)')}>
                        <Text className='text-gray-600'>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (index < 2 ? setIndex(index + 1) : router.push('(auth)'))}>
                        <Text className='text-gray-800 font-bold'>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
