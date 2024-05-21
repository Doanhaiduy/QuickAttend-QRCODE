import { Alert, Button, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@/components';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { set } from 'date-fns';
import { appColors } from '@/constants/appColors';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { decryptData, sleep } from '@/helpers';
import attendanceAPI from '@/apis/attendanceApi';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/reducers/authReducer';
import LoadingModal from '@/modals/LoadingModal';

import * as Location from 'expo-location';
import { getDistance } from 'geolib';

export default function ScanQRScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const { data } = useLocalSearchParams();
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateCode, setPrivateCode] = useState('');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState('');
    const [dataScan, setDataScan] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const modalizeSuccessRef = React.useRef<Modalize>(null);
    const modalizeCancelRef = React.useRef<Modalize>(null);

    const auth = useSelector(authSelector);

    const onOpenSuccess = () => {
        modalizeSuccessRef.current?.open();
    };

    const onOpenCancel = () => {
        modalizeCancelRef.current?.open();
    };

    const getCurrentLocation: any = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (!permission.canAskAgain || permission.status === 'denied') {
            Alert.alert('Permission Required', 'Please enable location permission to use this feature', [
                {
                    text: 'Close',
                    onPress: () => router.back(),
                },
                {
                    text: 'Open Settings',
                    onPress: () => Linking.openSettings(),
                },
            ]);
        } else {
            if (permission.status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                console.log(location.coords);
                return { lat: location.coords.latitude, long: location.coords.longitude };
            }
        }
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

    const validCheck = async (dataDecrypt: any) => {
        const dataParse = JSON.parse(data as string);
        if (dataDecrypt?.eventCode !== dataParse?.eventCode) {
            setErrorModal('Invalid QR code');
            onOpenCancel();
            return false;
        }

        const currentLocation: {
            lat: number;
            long: number;
        } = await getCurrentLocation();

        const distance = getDistance(
            { latitude: currentLocation.lat, longitude: currentLocation.long },
            { latitude: dataDecrypt?.location?.latitude, longitude: dataDecrypt?.location?.longitude }
        );

        if (distance < dataDecrypt?.distanceLimit) {
            setErrorModal('You are too far from the event location');
            onOpenCancel();
            return false;
        }
        return true;
    };

    const handelAddAttendance = async (dataDecrypt: any) => {
        setIsLoading(true);
        const checked = await validCheck(dataDecrypt);
        if (checked) {
            try {
                const data = {
                    userId: auth.id,
                    eventCode: dataDecrypt?.eventCode,
                    attendanceTime: new Date().toISOString(),
                    location: {
                        latitude: 0,
                        longitude: 0,
                    },
                    locationName: 'HCM',
                };
                // const res = await attendanceAPI.HandleAttendance('/create', data, 'post');
                setIsLoading(false);
                onOpenSuccess();
            } catch (error: any) {
                setIsLoading(false);
                setErrorModal(error);
                onOpenCancel();
            }
        }
    };

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        try {
            const parsedData = JSON.parse(data);
            if (!parsedData.data) {
                setErrorModal('Invalid QR code');
                onOpenCancel();
                return;
            }
            const cipherText = parsedData.data;
            const dataDecrypt = decryptData(cipherText, process.env.EXPO_PUBLIC_ENCRYPT_KEY!);
            if (dataDecrypt) {
                setDataScan(dataDecrypt);
                handelAddAttendance(dataDecrypt);
            } else {
                setErrorModal('Invalid QR code');
                onOpenCancel();
            }
        } catch (error: any) {
            setErrorModal('Invalid QR code');
            onOpenCancel();
        }
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
            <Portal>
                <Modalize
                    ref={modalizeSuccessRef}
                    adjustToContentHeight
                    onOverlayPress={() => {
                        router.dismissAll();
                    }}
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
                                onPress={async () => {
                                    modalizeSuccessRef.current?.close();
                                    router.dismissAll();
                                }}
                                type='primary'
                                size='large'
                            />
                        </View>
                    </View>
                </Modalize>
            </Portal>
            <Portal>
                <Modalize
                    ref={modalizeCancelRef}
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
                            <Ionicons name='close-circle' size={100} color={appColors.error2} />
                        </View>
                        <View className='justify-center items-center'>
                            <TextComponent className='text-center text-xl font-bold'>Failed attendance</TextComponent>
                            <TextComponent className='mt-2 text-center text-sm max-w-[70%] '>
                                You have failed to take attendance! Please try again.
                            </TextComponent>
                            <TextComponent className='mt-2 text-center text-sm max-w-[70%] text-error'>
                                {errorModal}
                            </TextComponent>
                        </View>

                        <View className='flex-row justify-center'>
                            <SpaceComponent width={6} />
                            <ButtonComponent
                                title='Try Again'
                                onPress={async () => {
                                    modalizeCancelRef.current?.close();
                                    await sleep(1000);
                                    setScanned(false);
                                }}
                                type='primary'
                                size='small'
                            />
                        </View>
                    </View>
                </Modalize>
            </Portal>
            <LoadingModal visible={isLoading} message='Analyzing QR code...' />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
