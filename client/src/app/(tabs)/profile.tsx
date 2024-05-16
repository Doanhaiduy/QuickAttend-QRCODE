import { ButtonComponent, ContainerComponent, SectionComponent, TextComponent } from '@/components';
import { appColors } from '@/constants/appColors';
import { logout } from '@/redux/reducers/authReducer';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    return (
        <ContainerComponent isScroll>
            {/* <Pressable >
                <Ionicons name='log-out' size={24} color='black' />
            </Pressable> */}
            <SectionComponent className='justify-center items-center'>
                <View className='items-center'>
                    <View className='p-2 bg-primary-500/10 rounded-full'>
                        <View className='p-2 bg-primary-500/20 rounded-full'>
                            <Image
                                source={require('@/assets/images/avatar.jpg')}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                            />
                        </View>
                    </View>
                    <TextComponent className='text-xl font-bold mt-2'>Doan Hai Duy</TextComponent>
                    <TextComponent className='text-sm'>@doan.hai.duy</TextComponent>
                </View>
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent type='primary' size='large' title='Edit profile' onPress={() => {}} />
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
