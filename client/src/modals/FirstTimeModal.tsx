import { ButtonComponent, SpaceComponent, TextComponent } from '@/components';
import { appColors } from '@/constants/appColors';
import React from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, View } from 'react-native';
interface Props {
    visible: boolean;
    onClose: () => void;
}

export default function FirstTimeModal(props: Props) {
    const { visible, onClose } = props;
    const [isVisible, setIsVisible] = React.useState(visible);

    return (
        <Modal style={{ flex: 1 }} visible={isVisible} transparent statusBarTranslucent animationType='slide'>
            <View className='flex-1 bg-black/70 '>
                <View className='bg-white h-1/2 items-center justify-center my-auto mx-5 rounded-[30px] p-5'>
                    <Image source={require('../assets/images/welcome.png')} className='w-full h-1/2' />
                    <TextComponent className='text-[28px] font-inter700 mb-2'>Congratulation 🎉</TextComponent>
                    <TextComponent className='text-grayText text-base text-center'>
                        Your account is ready to use
                    </TextComponent>
                    <SpaceComponent height={20} />
                    <ButtonComponent
                        onPress={() => {
                            setIsVisible(!visible);
                        }}
                        title='Get Started'
                        type='primary'
                        size='large'
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({});
