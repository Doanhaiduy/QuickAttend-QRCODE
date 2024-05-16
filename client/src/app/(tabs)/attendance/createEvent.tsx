import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    InputDateTimePicker,
    SectionComponent,
    TextComponent,
} from '@/components';
import { appColors } from '@/constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CreateEventScreen() {
    const [eventName, setEventName] = React.useState('');
    const [location, setLocation] = React.useState('Choose location');
    const [securityCode, setSecurityCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    return (
        <ContainerComponent isScroll back title='Add Event'>
            <StatusBar style='dark' />
            <SectionComponent>
                <InputComponent
                    value={eventName}
                    onChange={(val) => setEventName(val)}
                    label='Event Name'
                    placeholder='Enter event name'
                />

                <View className='flex-row -mx-2'>
                    <InputDateTimePicker
                        value={dateStart}
                        type='date'
                        onChange={(e, val) => setDateStart(val)}
                        label='Date start'
                        placeholder='click to set'
                    />

                    <InputDateTimePicker
                        value={dateStart}
                        type='time'
                        onChange={(e, val) => setDateStart(val)}
                        label='time start'
                        placeholder='click to set'
                    />
                </View>

                <View className='flex-row -mx-2'>
                    <InputDateTimePicker
                        value={dateEnd}
                        type='date'
                        onChange={(e, val) => setDateEnd(val)}
                        label='Date end'
                        placeholder='click to set'
                    />

                    <InputDateTimePicker
                        value={dateEnd}
                        type='time'
                        onChange={(e, val) => setDateEnd(val)}
                        label='time end'
                        placeholder='click to set'
                    />
                </View>

                <TouchableOpacity>
                    <InputComponent
                        value={location}
                        onChange={(val) => setLocation(val)}
                        label='Location'
                        placeholder='Enter location'
                        iconRight={<Ionicons name='arrow-forward' size={24} color={appColors.black} />}
                    />
                </TouchableOpacity>

                <InputComponent
                    value={securityCode}
                    onChange={(val) => setSecurityCode(val)}
                    label='Security Code'
                    placeholder='Enter Security Code'
                />

                <TextComponent className='text-primary-500 text-[12px] mb-[2px]'>Description</TextComponent>
                <InputComponent
                    value={description}
                    onChange={(val) => setDescription(val)}
                    label='Description'
                    placeholder='Enter description'
                    multiline
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title='Add Event'
                    type='primary'
                    size='large'
                    onPress={() => {
                        const timeStart = dateStart.getTime();
                        const timeEnd = dateEnd.getTime();
                        console.log({
                            eventName,
                            timeStart,
                            timeEnd,
                            location,
                            securityCode,
                            description,
                        });
                    }}
                />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
