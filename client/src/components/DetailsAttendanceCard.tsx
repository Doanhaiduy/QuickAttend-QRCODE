import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import TextComponent from './TextComponent';
import getDateFnsLocale from '@utils/dateFns';
interface Data {
    title: string;
    startAt: string;
    location: string;
    description: string;
    code: string;
}
interface Props {
    type: string;
    color: string;
    onPress?: () => void;
    data: Data;
}

export default function DetailsAttendanceCard(props: Props) {
    const { type, color, onPress, data } = props;
    const { t } = useTranslation();
    const locale = getDateFnsLocale();

    return (
        <Pressable onPress={onPress} className='p-4 bg-white shadow-xl rounded-[18px] my-3'>
            <View>
                <View className='flex-row justify-between items-center'>
                    <TextComponent className='text-lg font-bold max-w-[70%]'>
                        {data.title.toLocaleUpperCase()} - {data.code}
                    </TextComponent>
                    <View
                        className='px-2 py-2  rounded-xl items-center w-[90px]'
                        style={{
                            backgroundColor: `${color}1A`,
                        }}
                    >
                        <TextComponent className=' font-medium ' style={{ color }}>
                            {type === 'private' ? t('attendance.private') : t('attendance.public')}
                        </TextComponent>
                    </View>
                </View>
                <TextComponent className='text-lg font-inter700'>
                    {format(data?.startAt, 'MMM dd, yyyy', {
                        locale,
                    })}{' '}
                    -{' '}
                    <TextComponent className='text-base font-medium'>
                        ({formatDistanceToNow(data?.startAt, { addSuffix: true, locale })})
                    </TextComponent>
                </TextComponent>
                <View className='h-[0.5px] w-full bg-gray-200 my-5' />
            </View>
            <View className='flex-row items-start justify-center gap-1'>
                <View className=' mr-4'>
                    <TextComponent className='text-base font-inter700'>{t('attendance.timeLabel')}</TextComponent>
                    <TextComponent className='text-sm '>
                        {format(data?.startAt, 'p', {
                            locale,
                        })}
                    </TextComponent>
                </View>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>{t('attendance.locationLabel')}</TextComponent>
                    <TextComponent className='text-sm '>{data?.location || t('attendance.noLocation')}</TextComponent>
                </View>
                <View className='flex-1'>
                    <TextComponent className='text-base font-inter700'>
                        {t('attendance.descriptionLabel')}
                    </TextComponent>
                    <TextComponent className='text-sm' numberOfLines={1}>
                        {data?.description || t('attendance.noDescription')}
                    </TextComponent>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
