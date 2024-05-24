import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props extends React.ComponentProps<typeof Text> {
    children: React.ReactNode;
}

export default function TextComponent(props: Props) {
    const { children, ...textProps } = props;

    return (
        <Text className='font-inter' {...textProps} style={textProps.style}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({});
