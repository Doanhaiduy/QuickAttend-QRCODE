import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyAttendanceCard from './MyAttendanceCard';
import TextComponent from './TextComponent';
import { useTranslation } from 'react-i18next';

export default function ListAttendanceHome(props: { data: any[] }) {
    const { data } = props;
    const { t } = useTranslation();

    return (
        <>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?._id}
                renderItem={({ item, index }) => <MyAttendanceCard data={item} />}
                contentContainerStyle={{ marginHorizontal: -8 }}
                scrollEnabled={false}
                ListHeaderComponent={() => (
                    <View className='flex-row justify-between items-center'>
                        <TextComponent className='text-lg font-inter500 ml-4 mb-4 '>
                            {t('home.yourActivity')}
                        </TextComponent>
                        <Pressable className='mr-4'>
                            <TextComponent className='text-primary-500'>{t('home.viewAll')}</TextComponent>
                        </Pressable>
                    </View>
                )}
                ItemSeparatorComponent={() => <View className='h-4 w-4' />}
            />
            {data?.length === 0 && (
                <View className='flex-1 justify-center items-center'>
                    <TextComponent className='text-lg text-grayText'>{t('home.noActivity')}</TextComponent>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({});
