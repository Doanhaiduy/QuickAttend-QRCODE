import attendanceAPI from '@/apis/attendanceApi';
import eventAPI from '@/apis/eventApi';
import {
    ButtonComponent,
    ContainerComponent,
    DetailsAttendanceCard,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    StatisticalCard,
    TextComponent,
} from '@/components';
import { appColors } from '@/constants/appColors';
import { checkTimeStatus } from '@/helpers';
import { authSelector } from '@/redux/reducers/authReducer';
import { TimeStatus } from '@/types/Auth';
import { FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSelector } from 'react-redux';

interface Analytic {
    total: number;
    upcoming: number;
    ongoing: number;
    expired: number;
}

export default function AttendanceScreen() {
    const [events, setEvents] = React.useState<any[]>([]);
    const [activeTab, setActiveTab] = React.useState<TimeStatus>(TimeStatus.Ongoing);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataAnalytic, setDataAnalytic] = React.useState<Analytic>();
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [eventCode, setEventCode] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const modalizeRef = React.useRef<Modalize>(null);

    const auth = useSelector(authSelector);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleGetEvents();
    }, [activeTab]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const handleGetEvents = async () => {
        setIsLoading(true);
        try {
            const res = await eventAPI.HandleEvent(`/get-all?status=${activeTab}&authorId=${auth.id}`);
            if (res && res.data) {
                setEvents(res.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    const fetchData = async () => {
        try {
            const res = await eventAPI.HandleEvent('/get-analytic');
            if (res && res.data) {
                setDataAnalytic(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkAttendance = async () => {
        try {
            const res = await attendanceAPI.HandleAttendance(`/event/${eventCode}/user/${auth.id}`);
            if (res && res.data) {
                return res.data.hasAttendance;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefresh = () => {
        fetchData();
        handleGetEvents();
    };

    const handleContinue = async () => {
        if (eventCode !== '') {
            try {
                const res = await eventAPI.HandleEvent(`/eventCode/${eventCode}`);
                if (res && res.data) {
                    if (checkTimeStatus(new Date(res.data.startAt), new Date(res.data.endAt)) === TimeStatus.Ongoing) {
                        const checkHasAttendance = await checkAttendance();
                        if (checkHasAttendance) {
                            setError('You have already checked in');
                            return;
                        }
                        setModalVisible(false);
                        setEventCode('');
                        setError('');
                        router.push({
                            pathname: `/attendance/scanQR`,
                            params: {
                                data: JSON.stringify(res.data),
                            },
                        });
                    } else {
                        setError('Event is not ongoing');
                    }
                }
            } catch (error) {
                setError('Event code is not valid');
            }
        } else {
            setError('Event code is not valid');
        }
    };

    return (
        <ContainerComponent
            handleRefresh={handleRefresh}
            isScroll
            title='Attendance'
            iconRight={
                <Pressable onPress={onOpen}>
                    <Octicons name='diff-added' size={24} color='black' />
                </Pressable>
            }
        >
            <StatusBar style='dark' />
            <SectionComponent className='flex flex-row flex-wrap -mt-5'>
                <StatisticalCard type='Total' color={appColors.primary} value={+dataAnalytic?.total!} />
                <StatisticalCard type='Ongoing' color={'#a8d344'} value={+dataAnalytic?.ongoing!} />
                <StatisticalCard type='Upcoming' color={appColors.success2} value={+dataAnalytic?.upcoming!} />
                <StatisticalCard type='Expired' color={appColors.error2} value={+dataAnalytic?.expired!} />
            </SectionComponent>

            <SectionComponent>
                <View className='flex-row items-center justify-center'>
                    <ButtonComponent
                        height={55}
                        type={activeTab === TimeStatus.Ongoing ? 'primary' : 'outline'}
                        size='medium'
                        onPress={() => {
                            setActiveTab(TimeStatus.Ongoing);
                        }}
                        title='OnGoing'
                    />

                    <SpaceComponent width={5} />
                    <ButtonComponent
                        height={55}
                        type={activeTab === TimeStatus.Upcoming ? 'primary' : 'outline'}
                        size='medium'
                        onPress={() => {
                            setActiveTab(TimeStatus.Upcoming);
                        }}
                        title='Coming'
                    />
                    <SpaceComponent width={5} />
                    <ButtonComponent
                        height={55}
                        type={activeTab === TimeStatus.Expired ? 'primary' : 'outline'}
                        size='medium'
                        onPress={() => {
                            setActiveTab(TimeStatus.Expired);
                        }}
                        title='Expired'
                    />
                </View>
            </SectionComponent>
            <SectionComponent>
                {isLoading ? (
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size='large' color={appColors.primary} />
                    </View>
                ) : events.length > 0 ? (
                    events.map((event) => (
                        <DetailsAttendanceCard
                            data={{
                                title: event.eventName,
                                startAt: event.startAt,
                                location: event.locationName,
                                description: event.description,
                                code: event.eventCode,
                            }}
                            key={event._id}
                            type={event.type}
                            color={event.type === 'public' ? appColors.primary : appColors.error2}
                            onPress={() =>
                                router.push({
                                    pathname: `/attendance/${event.eventName}`,
                                    params: {
                                        eventId: event._id,
                                    },
                                })
                            }
                        />
                    ))
                ) : (
                    <SectionComponent className='items-center justify-center'>
                        <FontAwesome name='frown-o' size={74} color={appColors.black} />
                        <TextComponent className='font-medium text-lg'>No event found!</TextComponent>
                    </SectionComponent>
                )}
            </SectionComponent>
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
                    <View className=' shadow-xl  gap-5 p-3'>
                        <TouchableOpacity
                            className='flex-row py-2 items-center'
                            onPress={() => {
                                router.push('/(tabs)/attendance/createEvent');
                                modalizeRef.current?.close();
                            }}
                        >
                            <Ionicons name='create-sharp' size={24} color='black' />
                            <TextComponent className='text-base font-medium ml-2'>Create Event</TextComponent>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='flex-row pb-2 items-center'
                            onPress={() => {
                                setModalVisible(true);
                                modalizeRef.current?.close();
                            }}
                        >
                            <Ionicons name='checkbox' size={22} color='black' />
                            <TextComponent className='text-base font-medium ml-2'>Attendance </TextComponent>
                        </TouchableOpacity>
                    </View>
                </Modalize>
            </Portal>
            <Modal
                visible={modalVisible}
                style={{
                    flex: 1,
                }}
                transparent
                statusBarTranslucent
                animationType='fade'
            >
                <View className='flex-1 bg-black/80'>
                    <View className='bg-white h-1/3  my-auto mx-5 rounded-[30px] p-5'>
                        <TextComponent className='text-xl font-bold text-center'>Enter the Event Code</TextComponent>
                        <TextComponent className=' my-5 text-sm'>
                            Please enter the code that was given to you by the event organizer to check in:
                        </TextComponent>
                        <InputComponent
                            placeholder='Enter the Event Code'
                            label='Event Code'
                            value={eventCode}
                            err={error}
                            onChange={(val) => {
                                setEventCode(val);
                                setError('');
                            }}
                        />
                        <View className='flex-row items-center justify-center mt-4'>
                            <ButtonComponent
                                title='Cancel'
                                onPress={() => setModalVisible(false)}
                                type='error'
                                size='small'
                            />
                            <SpaceComponent width={8} />
                            <ButtonComponent title='Continue' onPress={handleContinue} type='success' size='small' />
                        </View>
                    </View>
                </View>
            </Modal>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
