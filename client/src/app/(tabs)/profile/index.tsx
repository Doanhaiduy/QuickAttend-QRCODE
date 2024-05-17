import { ButtonComponent, ContainerComponent, SectionComponent, TextComponent } from '@/components';
import { appColors } from '@/constants/appColors';
import { authSelector, logout, setAuthData } from '@/redux/reducers/authReducer';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image, Platform, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import userAPI from '@/apis/userApi';
import LoadingModal from '@/modals/LoadingModal';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            handleUploadAvatar(result.assets[0]);
        }
    };

    const handleUploadAvatar = async (avatar: any) => {
        setIsLoading(true);
        if (avatar) {
            try {
                const uri = avatar.uri;
                const mimeType = avatar.mimeType;
                const formData = new FormData();

                console.log('fixbug: ', { avatar: avatar.uri.replace('file://', '') });
                formData.append(
                    'avatar',
                    JSON.parse(
                        JSON.stringify({
                            uri: Platform.OS === 'android' ? avatar.uri.replace('file://', '') : uri,
                            type: mimeType,
                            name: 'avatar',
                        })
                    )
                );
                const res = await userAPI.HandleUser(`/upload-avatar/${auth.id}`, formData, 'put');

                console.log(res?.data);
                const newAuthData = { ...auth, imageURL: res?.data?.imageURL };
                await AsyncStorage.setItem('auth', JSON.stringify(newAuthData));
                dispatch(setAuthData(newAuthData));

                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        } else {
            console.log('No image selected');
            setIsLoading(false);
        }
    };

    return (
        <ContainerComponent isScroll>
            <SectionComponent className='justify-center items-center'>
                <View className='items-center'>
                    <View className='p-2 bg-primary-500/10 rounded-full relative'>
                        <View className='p-2 bg-primary-500/20 rounded-full'>
                            <Image
                                source={{
                                    uri:
                                        auth.imageURL ||
                                        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                                }}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                        </View>
                        <Pressable
                            onPress={pickImage}
                            className='absolute bottom-2 right-2 items-center justify-center p-2 bg-primary-500 rounded-2xl '
                        >
                            <Feather name='camera' size={20} color={appColors.white} />
                        </Pressable>
                    </View>
                    <TextComponent className='text-xl font-bold mt-2'>{auth.fullName}</TextComponent>
                    <TextComponent className='text-sm'>@{auth.username}</TextComponent>
                </View>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    type='primary'
                    size='large'
                    title='Edit profile'
                    onPress={() => {
                        router.push({
                            pathname: '/profile/editProfile',
                        });
                    }}
                />
            </SectionComponent>
            <SectionComponent>
                <TouchableOpacity className='flex-row flex-1 justify-between py-3 items-center border-b-[0.5px] border-gray-100'>
                    <View className='flex-row items-center gap-4'>
                        <View className='justify-center items-center p-4 bg-gray-500/10 rounded-full'>
                            <Ionicons name='person' size={20} color='black' />
                        </View>
                        <TextComponent className='text-base font-inter700'>My Profile</TextComponent>
                    </View>
                    <Ionicons name='chevron-forward' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity className='flex-row flex-1 justify-between py-3 items-center border-b-[0.5px] border-gray-100'>
                    <View className='flex-row items-center gap-4'>
                        <View className='justify-center items-center p-4 bg-gray-500/10 rounded-full'>
                            <Ionicons name='settings' size={20} color='black' />
                        </View>
                        <TextComponent className='text-base font-inter700'>Setting</TextComponent>
                    </View>
                    <Ionicons name='chevron-forward' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity className='flex-row flex-1 justify-between py-3 items-center border-b-[0.5px] border-gray-100'>
                    <View className='flex-row items-center gap-4'>
                        <View className='justify-center items-center p-4 bg-gray-500/10 rounded-full'>
                            <Ionicons name='help-circle' size={20} color='black' />
                        </View>
                        <TextComponent className='text-base font-inter700'>Terms & Conditions</TextComponent>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color='black' />
                </TouchableOpacity>
                <TouchableOpacity className='flex-row flex-1 justify-between py-3 items-center border-b-[0.5px] border-gray-100'>
                    <View className='flex-row items-center gap-4'>
                        <View className='justify-center items-center p-4 bg-gray-500/10 rounded-full'>
                            <Ionicons name='shield-checkmark' size={20} color='black' />
                        </View>
                        <TextComponent className='text-base font-inter700'>Privacy Policy</TextComponent>
                    </View>
                    <Ionicons name='chevron-forward' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity
                    className='flex-row flex-1 justify-between py-3 items-center border-b-[0.5px] border-gray-100'
                    onPress={() => dispatch(logout())}
                >
                    <View className='flex-row items-center gap-4'>
                        <View className='justify-center items-center p-4 bg-error2/10 rounded-full'>
                            <Ionicons name='log-out' size={20} color={appColors.error2} />
                        </View>
                        <TextComponent className='text-base font-inter700'>Log out</TextComponent>
                    </View>
                    <Ionicons name='chevron-forward' size={24} color='black' />
                </TouchableOpacity>
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
