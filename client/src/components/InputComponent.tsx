import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { appColors } from '../constants/appColors';
import clsx from 'clsx';

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
    } = props;

    const ContainerClasses = clsx(
        'min-h-[56px] max-h-[56px] w-full px-4 py-2 rounded-[10px] border-[1px] border-primary-500 ',
        { 'border-error': err },
        { 'border-gray-300': isDisabled }
    );

    return (
        <View className='mb-4 w-full'>
            <View className={ContainerClasses}>
                <Text
                    className={clsx('text-[11px] text-primary-500', {
                        'text-error': err,
                    })}
                >
                    {label}
                </Text>
                <View className='flex-1 flex-row bg-white'>
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={(val) => onChange(val)}
                        onEndEditing={onEnd}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        secureTextEntry={isPassword && isShowPassword}
                        editable={!isDisabled}
                        keyboardType={type}
                        numberOfLines={numberOfLines}
                        multiline={multiline}
                        className='flex-1 text-sm text-blackText'
                    />
                    {isPassword ? (
                        <Pressable className='pl-2' onPress={() => setIsShowPassword(!isShowPassword)}>
                            <Ionicons name={isShowPassword ? 'eye-off' : 'eye'} size={24} color={appColors.text} />
                        </Pressable>
                    ) : (
                        value && (
                            <Pressable className='pl-2' onPress={() => onChange('')}>
                                <Ionicons name='close' size={20} color={appColors.text} />
                            </Pressable>
                        )
                    )}
                </View>
            </View>
            {err && <Text className='text-error text-left text-[11px] ml-2'>{err}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({});
