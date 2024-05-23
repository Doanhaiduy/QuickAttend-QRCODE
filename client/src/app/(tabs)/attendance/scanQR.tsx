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
import axios from 'axios';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

    let location:
        | {
              lat: number;
              long: number;
          }
        | undefined;

    const auth = useSelector(authSelector);

    const onOpenSuccess = () => {
        modalizeSuccessRef.current?.open();
    };

    const onOpenCancel = () => {
        modalizeCancelRef.current?.open();
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

    const reverseLocation = async (lat: number, long: number) => {
        try {
            const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VN&apiKey=${process
                .env.EXPO_PUBLIC_HERE_LOCATION_API_KEY!}`;
            const res = await axios(api);
            if (res && res.status === 200) {
                console.log(res.data.items[0].title);
                return res.data.items[0].title;
            }
        } catch (error) {
            console.log(error);
            return t('scanQR.notFoundLocation');
        }
    };

    const getCurrentLocation: any = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (!permission.canAskAgain || permission.status === 'denied') {
            Alert.alert(t('scanQR.permissionRequired'), t('scanQR.enableLocationPermission'), [
                {
                    text: t('scanQR.close'),
                    onPress: () => router.back(),
                },
                {
                    text: t('scanQR.openSettings'),
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

    const handleVerificationCode = () => {
        const dataParse = JSON.parse(data as string);
        if (privateCode === '') {
            setError(t('scanQR.enterPrivateCode'));
            return;
        }
        if (privateCode.toLocaleUpperCase() !== dataParse.privateCode.toLocaleUpperCase()) {
            setError(t('scanQR.privateCodeIncorrect'));
            return;
        } else {
            Alert.alert(t('scanQR.verified'), t('scanQR.scanQRCodeToCheckIn'));
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
            <ContainerComponent back title={t('scanQR.scanQRTitle')}>
                <SectionComponent className='items-center'>
                    <Text className='text-base font-medium'>{t('scanQR.permissionRequiredMessage')}</Text>
                    <ButtonComponent
                        onPress={requestPermission}
                        title={t('scanQR.grantPermissionButtonTitle')}
                        size='medium'
                        type='primary'
                    />
                </SectionComponent>
            </ContainerComponent>
        );
    }

    const validCheck = async (dataDecrypt: any) => {
        const dataParse = JSON.parse(data as string);
        if (dataDecrypt?.eventCode !== dataParse?.eventCode) {
            setErrorModal(t('scanQR.invalidQRCode'));
            setIsLoading(false);
            onOpenCancel();
            return false;
        }

        const currentLocation: {
            lat: number;
            long: number;
        } = await getCurrentLocation();

        if (currentLocation) {
            location = currentLocation;
        }

        const distance = getDistance(
            { latitude: currentLocation.lat, longitude: currentLocation.long },
            { latitude: dataDecrypt?.location?.latitude, longitude: dataDecrypt?.location?.longitude }
        );

        if (distance > dataDecrypt?.distanceLimit && dataDecrypt?.distanceLimit !== 0) {
            setErrorModal(
                `${t('scanQR.tooFarFromEventLocation')} ${distance - dataDecrypt?.distanceLimit}(m) ${t(
                    'scanQR.toAttendance'
                )}`
            );
            setIsLoading(false);
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
                        latitude: location?.lat || 0,
                        longitude: location?.long || 0,
                    },
                    locationName: await reverseLocation(location?.lat || 0, location?.long || 0),
                    distance: getDistance(
                        { latitude: location?.lat || 0, longitude: location?.long || 0 },
                        { latitude: dataDecrypt?.location?.latitude, longitude: dataDecrypt?.location?.longitude }
                    ),
                };
                const res = await attendanceAPI.HandleAttendance('/create', data, 'post');
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
                setErrorModal(t('scanQR.invalidQRCode'));
                onOpenCancel();
                return;
            }
            const cipherText = parsedData.data;
            const dataDecrypt = decryptData(cipherText, process.env.EXPO_PUBLIC_ENCRYPT_KEY!);
            if (dataDecrypt) {
                setDataScan(dataDecrypt);
                handelAddAttendance(dataDecrypt);
            } else {
                setErrorModal(t('scanQR.invalidQRCode'));
                onOpenCancel();
            }
        } catch (error: any) {
            setErrorModal(t('scanQR.invalidQRCode'));
            onOpenCancel();
        }
    };

    return (
        <ContainerComponent back title={t('scanQR.scanQRTitle')}>
            {isPrivate ? (
                <SectionComponent className=''>
                    <TextComponent className='text-xl font-bold '>{t('scanQR.enterPrivateCodeTitle')}</TextComponent>
                    <TextComponent className=' my-5 text-sm'>{t('scanQR.enterPrivateCodeDescription')}</TextComponent>
                    <InputComponent
                        placeholder={t('scanQR.privateCodePlaceholder')}
                        label={t('scanQR.privateCodeLabel')}
                        value={privateCode}
                        onChange={(val) => {
                            setPrivateCode(val);
                        }}
                    />
                    {error && <TextComponent className='text-error text-left'>{error}</TextComponent>}

                    <SectionComponent className='px-0'>
                        <ButtonComponent
                            title={t('scanQR.confirmButtonTitle')}
                            onPress={handleVerificationCode}
                            type='primary'
                            size='large'
                        />
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
                                {t('scanQR.successfulAttendanceTitle')}
                            </TextComponent>
                            <TextComponent className='mt-2 text-center text-sm max-w-[70%] '>
                                {t('scanQR.successfulAttendanceDescription')}{' '}
                                <TextComponent className='font-bold'>{dataScan?.eventName}</TextComponent>
                            </TextComponent>
                        </View>

                        <View>
                            <ButtonComponent
                                title={t('scanQR.doneButtonTitle')}
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
                            <TextComponent className='text-center text-xl font-bold'>
                                {t('scanQR.failedAttendanceTitle')}
                            </TextComponent>
                            <TextComponent className='mt-2 text-center text-sm max-w-[70%] '>
                                {t('scanQR.failedAttendanceDescription')}
                            </TextComponent>
                            <TextComponent className='mt-2 text-center text-sm max-w-[70%] text-error'>
                                {errorModal}
                            </TextComponent>
                        </View>

                        <View className='flex-row justify-center'>
                            <SpaceComponent width={6} />
                            <ButtonComponent
                                title={t('scanQR.tryAgainButtonTitle')}
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
            <LoadingModal visible={isLoading} message={t('scanQR.analyzingQRMessage')} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
