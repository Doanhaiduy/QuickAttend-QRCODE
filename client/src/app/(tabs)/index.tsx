import {
    AttendanceCard,
    ButtonComponent,
    CalendarComponent,
    ContainerComponent,
    MyAttendanceCard,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@/components';
import FirstTimeModal from '@/modals/FirstTimeModal';
import { authSelector, logout } from '@/redux/reducers/authReducer';
import { Ionicons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const checkFirstTime = async () => {
    const value = await AsyncStorage.getItem('theWelcome');
    console.log('tf', value);
    if (value === null) {
        await AsyncStorage.setItem('theWelcome', 'false');
        return true;
    } else {
        return false;
    }
};

const initialValue = checkFirstTime();

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(!!initialValue);

    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    useEffect(() => {
        checkTokenExpire();
    }, []);

    const checkTokenExpire = async () => {
        const auth = await AsyncStorage.getItem('auth');
        if (auth) {
            if (JSON.parse(auth).accessToken === 'TokenExpired') {
                dispatch(logout());
                router.navigate('/login');
            }
        } else {
            router.navigate('/login');
            dispatch(logout());
        }
    };
    console.log(!!initialValue);
    const modal = useMemo(
        () => <FirstTimeModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />,
        []
    );
    return (
        <ContainerComponent isScroll>
            <SectionComponent className='flex-row items-center'>
                <View className='flex-row flex-1 items-center'>
                    <Image
                        source={{
                            uri:
                                auth.imageURL ||
                                'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                        }}
                        className='w-12 h-12 rounded-full mr-3'
                    />
                    <View className='flex-1'>
                        <TextComponent className='text-xl font-inter500'>{auth.fullName}</TextComponent>
                        <TextComponent>@{auth.username}</TextComponent>
                    </View>
                </View>
                <View>
                    <Pressable>
                        <Octicons name='diff-added' size={24} color='black' />
                    </Pressable>
                </View>
            </SectionComponent>
            <SectionComponent>
                <CalendarComponent />
            </SectionComponent>
            <SectionComponent className='bg-gray-100 rounded-[25px]'>
                <FlatList
                    data={[12, 3, 4, 5]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => <AttendanceCard />}
                    contentContainerStyle={{ marginHorizontal: -8 }}
                    ListHeaderComponent={() => (
                        <TextComponent className='text-lg font-inter500 ml-4 mb-4'>Today Attendance</TextComponent>
                    )}
                    ItemSeparatorComponent={() => <View className='h-4 w-4' />}
                    numColumns={2}
                    scrollEnabled={false}
                />
                <SpaceComponent height={40} />

                <FlatList
                    data={[12, 3, 4, 5]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => <MyAttendanceCard />}
                    contentContainerStyle={{ marginHorizontal: -8 }}
                    ListHeaderComponent={() => (
                        <View className='flex-row justify-between items-center'>
                            <TextComponent className='text-lg font-inter500 ml-4 mb-4 '>Your Activity</TextComponent>
                            <Pressable className='mr-4'>
                                <TextComponent className='text-primary-500'>View All</TextComponent>
                            </Pressable>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View className='h-4 w-4' />}
                    scrollEnabled={false}
                />
            </SectionComponent>
            {modal}
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
