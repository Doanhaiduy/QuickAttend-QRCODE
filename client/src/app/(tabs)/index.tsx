import attendanceAPI from '@apis/attendanceApi';
import {
    CalendarComponent,
    ContainerComponent,
    ListAttendanceHome,
    SectionComponent,
    SpaceComponent,
    TextComponent,
    TodayListEvent,
} from '@components/index';
import { appColors } from '@constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import FirstTimeModal from '@modals/FirstTimeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSelector, logout } from '@redux/reducers/authReducer';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const saveModalState = async () => {
    try {
        await AsyncStorage.setItem('firstTimeModalShown', 'true');
    } catch (error) {
        console.error('Failed to save the modal state:', error);
    }
};

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [data, setData] = useState<any[]>();
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    useEffect(() => {
        checkTokenExpire();
        checkModalState();
        fetchDataAttendance();
    }, []);

    const fetchDataAttendance = async () => {
        try {
            const res = await attendanceAPI.HandleAttendance(`/user/${auth?.id}`);
            if (res && res.data) {
                setData(res.data);
            }
            console.log(res.data);
        } catch (error) {
            console.log('error', error);
        }
    };

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

    const checkModalState = async () => {
        try {
            const modalState = await AsyncStorage.getItem('firstTimeModalShown');
            console.log(modalState);
            if (modalState === null) {
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error('Failed to check the modal state:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        saveModalState();
    };

    return (
        <ContainerComponent isScroll handleRefresh={fetchDataAttendance}>
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
                <View className='self-start'>
                    <TouchableOpacity
                        className='p-2 bg-primary-500/10 rounded-full'
                        onPress={() => {
                            router.navigate('/notification');
                        }}
                    >
                        <Ionicons name='notifications-outline' size={24} color={appColors.primary} />
                    </TouchableOpacity>
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

                <ListAttendanceHome data={data ?? []} />
            </SectionComponent>
            <FirstTimeModal visible={isModalVisible} onClose={handleCloseModal} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
