import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { clsx } from 'clsx';

interface Props {
    title: string;
    type: 'primary' | 'outline' | 'error' | 'success';
    size: 'large' | 'medium' | 'small';
    disabled?: boolean;
    onPress: () => void;
    icon?: React.ReactNode;
    iconFlex?: 'left' | 'right';
    height?: number;
}

const variantContainer = {
    default: 'rounded-[10px] shadow-md flex flex-row items-center justify-center min-h-[56px]',
    primary: 'bg-primary-500',
    outline: 'bg-[#fbfbfb] ',
    error: 'bg-error2',
    success: 'bg-success2',
};

const variantText = {
    default: 'text-white',
    primary: 'text-white text-base',
    outline: 'text-blackText',
    error: 'text-white',
    success: 'text-white',
};

export default function ButtonComponent(props: Props) {
    const { title, type, size, disabled, onPress, icon, iconFlex, height } = props;

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            className={clsx(variantContainer.default, variantContainer[type], {
                'w-full min-h-[56px]': size === 'large',
                'max-w-[168px] min-h-[48px] px-5 flex-1': size === 'medium',
                'min-w-[145px] min-h-[40px] px-5': size === 'small',
                'opacity-70': disabled,
            })}
            style={{
                height: height,
            }}
        >
            <>
                {icon && iconFlex !== 'right' && <View className='mr-2'>{icon}</View>}
                <Text
                    className={clsx(variantText.default, variantText[type], {
                        'text-base': size === 'medium',
                        'text-sm': size === 'small',
                        'opacity-70': disabled,
                    })}
                >
                    {title}
                </Text>
                {icon && iconFlex === 'right' && <View className=''>{icon}</View>}
            </>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
