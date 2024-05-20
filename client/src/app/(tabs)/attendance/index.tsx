import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
    ButtonComponent,
    ContainerComponent,
    DetailsAttendanceCard,
    SectionComponent,
    SpaceComponent,
    StatisticalCard,
    TextComponent,
} from '@/components';
import { Octicons } from '@expo/vector-icons';
import { appColors } from '@/constants/appColors';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import eventAPI from '@/apis/eventApi';
import { TimeStatus } from '@/types/Auth';
import { checkTimeStatus } from '@/helpers';
import { format } from 'date-fns';
import { ActivityIndicator } from 'react-native';
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

    const handleGetEvents = async () => {
        setIsLoading(true);
        try {
            const res = await eventAPI.HandleEvent(`/get-all?status=${activeTab}`);
            if (res && res.data) {
                setEvents(res.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
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
        fetchData();
    }, []);

    useEffect(() => {
        handleGetEvents();
    }, [activeTab]);
    return (
        <ContainerComponent
            isScroll
            title='Attendance'
            iconRight={
                <Pressable onPress={() => router.push('/(tabs)/attendance/createEvent')}>
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
                    <TextComponent>No event found</TextComponent>
                )}
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
