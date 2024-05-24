import React from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';

export default function Splash() {
    return (
        <ImageBackground
            source={require('@assets/images/splash.png')}
            resizeMode='cover'
            className='flex-1 justify-center items-center'
        >
            <View className='mt-[150px]'>
                <ActivityIndicator size='small' color='#fff' />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({});
