import { appColors } from '@constants/appColors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import getDateFnsLocale from '@utils/dateFns';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';

interface Props {
    type: 'date' | 'time';
    value: Date;
    onChange: (e: DateTimePickerEvent, val: any) => void;
    label: string;
    placeholder: string;
    iconRight?: React.ReactNode;
}

export default function InputDateTimePicker(props: Props) {
    const { type, value, onChange, label, placeholder, iconRight } = props;
    const locale = getDateFnsLocale();

    const [show, setShow] = useState(false);

    return (
        <View className='mb-4 min-h-[56px] max-h-[56px] flex-1 mx-2 px-4 py-2 justify-center rounded-[10px] border-[1px] border-primary-500'>
            <View className='flex flex-row justify-between items-center'>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <TextComponent className='text-primary-500 text-[11px] mb-1'>{label}</TextComponent>
                    <TextComponent>
                        {type === 'date'
                            ? format(value, 'MMM dd, yyyy', {
                                  locale,
                              })
                            : format(value, 'H:mm ')}
                    </TextComponent>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        className='absolute top-0 left-0'
                        value={value}
                        mode={type}
                        display='default'
                        onChange={(e, val) => {
                            console.log(val?.toLocaleString());
                            onChange(e, val);
                            setShow(false);
                        }}
                        is24Hour={type === 'time' ? true : false}
                        accentColor={appColors.primary}
                        minimumDate={new Date()}
                        textColor='red'
                        timeZoneName='GMT+7'
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
