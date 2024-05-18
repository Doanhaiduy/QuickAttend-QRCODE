import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '../constants/appColors';
import clsx from 'clsx';
import TextComponent from './TextComponent';

interface Props {
    placeholder?: string;
    label?: string;
    value: string;
    onChange: (val: string) => void;
    onEnd?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isPassword?: boolean;
    err?: string;
    isDisabled?: boolean;
    type?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
    numberOfLines?: number;
    multiline?: boolean;
    iconRight?: React.ReactNode;
    height?: number;
    search?: boolean;
}

export default function InputComponent(props: Props) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const {
        placeholder,
        label,
        value,
        onChange,
        onEnd,
        onFocus,
        onBlur,
        isPassword,
        err,
        isDisabled,
        type,
        numberOfLines,
        multiline,
        iconRight,
        height,
    } = props;

    const ContainerClasses = clsx(
        'min-h-[56px] max-h-[56px] w-full px-4 py-2 justify-center rounded-[10px] border-[1px] border-primary-500 ',
        { 'border-error': err },
        { 'border-gray-300': isDisabled },
        { 'max-h-[200px] h-[150px] ': multiline }
    );

    return (
        <View className='mb-4 w-full'>
            <View
                className={ContainerClasses}
                style={{
                    height: height ? height : 'auto',
                }}
            >
                {!multiline && (
                    <Text
                        className={clsx('text-[11px] text-primary-500', {
                            'text-error': err,
                            'text-gray-800': isDisabled,
                        })}
                    >
                        {label}
                    </Text>
                )}
                <View className={`flex-1 flex-row bg-white ${multiline && 'h-[150px]'} ${iconRight && 'pr-10'}`}>
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={(val) => onChange(val)}
                        onEndEditing={onEnd}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        secureTextEntry={isPassword && !isShowPassword}
                        editable={!isDisabled}
                        textAlignVertical='top'
                        keyboardType={type}
                        numberOfLines={numberOfLines}
                        multiline={multiline}
                        placeholderTextColor={'#A1A1A1'}
                        className={`flex-1 text-sm text-blackText placeholder:text-blackText ${
                            multiline && 'h-[150px]'
                        }`}
                    />
                    {isPassword ? (
                        <Pressable className='pl-2' onPress={() => setIsShowPassword(!isShowPassword)}>
                            <Ionicons name={isShowPassword ? 'eye' : 'eye-off'} size={24} color={appColors.text} />
                        </Pressable>
                    ) : (
                        value &&
                        !isDisabled &&
                        !iconRight && (
                            <Pressable className='pl-2' onPress={() => onChange('')}>
                                <Ionicons name='close' size={20} color={appColors.text} />
                            </Pressable>
                        )
                    )}
                </View>
                {iconRight && <View className='absolute right-5'>{iconRight}</View>}
            </View>
            {err && <TextComponent className='text-error text-left text-[11px] ml-2'>{err}</TextComponent>}
        </View>
    );
}

const styles = StyleSheet.create({});
