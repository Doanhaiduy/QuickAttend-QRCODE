import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, TextComponent } from '@/components';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { set } from 'date-fns';
import { appColors } from '@/constants/appColors';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { decryptData } from '@/helpers';

export default function ScanQRScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const { data } = useLocalSearchParams();
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateCode, setPrivateCode] = useState('');
    const [error, setError] = useState('');
    const [dataScan, setDataScan] = useState<any>();
    const modalizeRef = React.useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        const CheckPrivate = async () => {
            const dataParse = JSON.parse(data as string);
            const { type } = dataParse;
            if (type === 'private') {
                setIsPrivate(true);
            }
        };
        CheckPrivate();
    }, []);

    const handleVerificationCode = () => {
        const dataParse = JSON.parse(data as string);
        if (privateCode === '') {
            setError('Please enter the private code');
            return;
        }
        if (privateCode !== dataParse.privateCode) {
            setError('The private code is incorrect');
            return;
        } else {
            Alert.alert('Verified', 'Please scan the QR code to check in');
            setError('');
            setPrivateCode('');
            setIsPrivate(false);
        }
    };

    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
            <ContainerComponent back title='Scan QR'>
                <Text>We need your permission to show the camera</Text>
                <ButtonComponent onPress={requestPermission} title='grant permission' size='large' type='primary' />
            </ContainerComponent>
        );
    }

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        const cipherText = JSON.parse(data).data;
        const dataDecrypt = decryptData(cipherText, process.env.EXPO_PUBLIC_ENCRYPT_KEY!);
        setDataScan(dataDecrypt);
        console.log(dataDecrypt);
        onOpen();
    };

    return (
        <ContainerComponent back title='Scan QR'>
            {!isPrivate ? (
                <SectionComponent className=''>
                    <TextComponent className='text-xl font-bold '>Enter Private Code</TextComponent>
                    <TextComponent className=' my-5 text-sm'>
                        Please enter the private code given to you by the event organizer.
                    </TextComponent>
                    <InputComponent
                        placeholder='Enter the Private Code'
                        label='Private Code'
                        value={privateCode}
                        onChange={(val) => {
                            setPrivateCode(val);
                        }}
                    />
                    {error && <TextComponent className='text-error text-left'>{error}</TextComponent>}

                    <SectionComponent className='px-0'>
                        <ButtonComponent title='Confirm' onPress={handleVerificationCode} type='primary' size='large' />
                    </SectionComponent>
                </SectionComponent>
            ) : (
                <CameraView
                    facing='back'
                    className='flex-1'
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'pdf417'],
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                >
                    <View className='flex-1 items-center justify-center'>
                        <Image
                            source={require('@/assets/images/scanner-action.png')}
                            style={{ width: 350, height: 350, alignSelf: 'center' }}
                        />
                    </View>
                </CameraView>
            )}
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <Portal>
                <Modalize
                    ref={modalizeRef}
                    adjustToContentHeight
                    childrenStyle={{
                        borderTopRightRadius: 50,
                        borderTopLeftRadius: 50,
                        paddingBottom: 30,
                        paddingTop: 20,
                    }}
                >
                    <View className='shadow-xl gap-5 p-3 bg-white'>
                        <View className='border-[2px] border-white rounded-full items-center'>
                            <Ionicons name='checkmark-circle' size={100} color={appColors.primary} />
                        </View>
                        <View className='justify-center items-center'>
                            <TextComponent className='text-center text-xl font-bold'>
                                Successful attendance
                            </TextComponent>
                            <TextComponent className='mt-2 text-center text-sm max-w-[70%] '>
                                You have successfully taken attendance for{' '}
                                <TextComponent className='font-bold'>{dataScan?.eventName}</TextComponent>
                            </TextComponent>
                        </View>

                        <View>
                            <ButtonComponent
                                title='Done'
                                onPress={() => {
                                    modalizeRef.current?.close();
                                    setScanned(false);
                                }}
                                type='primary'
                                size='large'
                            />
                        </View>
                    </View>
                </Modalize>
            </Portal>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
