import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import TextComponent from './TextComponent';
import { appColors } from '@/constants/appColors';

interface Props {
    name: string;
    image: any;
    onSelect?: () => void;
    selected?: boolean;
}

export default function LanguageItem(props: Props) {
    const { name, image, selected, onSelect } = props;

    return (
        <TouchableOpacity
            className={`p-4 border-[2px] flex-row rounded-[16px]  justify-between items-center mb-5 ${
                selected ? 'border-primary-500 bg-primary-500/5 ' : 'border-gray-700'
            }`}
            onPress={onSelect}
        >
            <View className='flex-row gap-2 items-center'>
                <Image source={image} className='w-9 h-9 object-cover' />
                <TextComponent className='text-base font-semibold'>{name}</TextComponent>
            </View>
            <View>
                {selected ? (
                    <FontAwesome6 name='check-circle' size={27} color={appColors.primary} />
                ) : (
                    <FontAwesome6 name='circle' size={27} color={appColors.text} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
