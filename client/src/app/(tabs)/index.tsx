import {
    CalendarComponent,
    ContainerComponent,
    EventCard,
    ListAttendanceHome,
    MyAttendanceCard,
    SectionComponent,
    SpaceComponent,
    TextComponent,
    TodayListEvent,
} from '@/components';
import FirstTimeModal from '@/modals/FirstTimeModal';
import { authSelector, logout } from '@/redux/reducers/authReducer';
import { Ionicons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    console.log(date);

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
    const modal = () => <FirstTimeModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />;

    return (
        <ContainerComponent isScroll>
            <StatusBar barStyle='dark-content' />
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
                <CalendarComponent
                    onDatePress={(fulDate) => {
                        setDate(fulDate);
                    }}
                    date={date}
                />
            </SectionComponent>
            <SectionComponent className='bg-gray-100 rounded-[25px] min-h-[70vh]'>
                <TodayListEvent date={date} />

                <SpaceComponent height={40} />

                <ListAttendanceHome />
            </SectionComponent>
            {/* {modal()} */}
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
