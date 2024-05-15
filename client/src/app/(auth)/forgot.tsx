import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Regex } from '@/helpers';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@/components';

export default function ForgotScreen() {
    const [email, setEmail] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    const handleCheckEmail = (email: string) => {
        if (!Regex.email.test(email)) {
            setIsError(true);
            return;
        }
        setIsError(false);
    };

    const router = useRouter();
    return (
        <ContainerComponent isAuth isScroll back>
            <SectionComponent>
                <TextComponent className='text-[28px] font-inter700 mb-2'>Enter Verification Code</TextComponent>
                <TextComponent className=' text-grayText text-base'>
                    Enter your email address to receive a verification code
                </TextComponent>
            </SectionComponent>
            <SectionComponent className='w-[100%] h-[250px]'>
                <Image source={require('../../assets/images/forgot.png')} className='w-full h-full' />
            </SectionComponent>
            <SpaceComponent height={20} />
            <SectionComponent>
                <InputComponent
                    value={email}
                    onChange={(val) => setEmail(val)}
                    placeholder='example@mail.com'
                    label='Email Address'
                    onEnd={() => handleCheckEmail(email)}
                    err={`${isError ? 'Invalid email address' : ''}`}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title='Continue'
                    onPress={() => {
                        // router.push('/verification');
                        router.push('/newPassword');
                    }}
                    size='large'
                    type='primary'
                    disabled={isError}
                />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
