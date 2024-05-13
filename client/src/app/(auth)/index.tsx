import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import InputComponent from '@/src/components/InputComponent';
import ButtonComponent from '@/src/components/ButtonComponent';
import { Ionicons } from '@expo/vector-icons';

export default function LoginPage() {
    const [email, setEmail] = useState('');

    return (
        <View className='flex-1 justify-center items-center font-inter'>
            <Text className='font-inter'>Login Page</Text>
            <Link href={'/register'}>Register</Link>
            <Link href={'/(tabs)'}>Tabs</Link>
            <Link href={'/onBoarding'}>onBoarding</Link>
            <InputComponent
                label='Email Address'
                placeholder='abc@gmail.com'
                onChange={(val) => setEmail(val)}
                value={email}
                err='email is required'
                // isPassword
            />
            <ButtonComponent onPress={() => {}} size='large' title='Login' type='primary' />
            <ButtonComponent onPress={() => {}} size='medium' title='Login' type='error' />
            <ButtonComponent onPress={() => {}} size='medium' title='Login' type='success' />
            <ButtonComponent onPress={() => {}} size='medium' title='Login' type='outline' />
            <ButtonComponent
                onPress={() => {}}
                size='small'
                title='Login'
                type='success'
                icon={<Ionicons name='add' size={16} color='white' />}
            />
            <ButtonComponent onPress={() => {}} size='small' title='Login' type='error' />
        </View>
    );
}

const styles = StyleSheet.create({});
