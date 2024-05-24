import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props extends React.ComponentProps<typeof View> {
    children: React.ReactNode;
}

export default function SectionComponent(props: Props) {
    const { children, style } = props;

    return (
        <View className='px-5 py-4' style={style}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({});
