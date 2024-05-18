import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputComponent from './InputComponent';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import useDebounce from '@/hooks/useDebounce';

interface Props {
    searchLocation: string;
    setSearchLocation: (val: string) => void;
    handleChooseLocation: (val: string) => void;
}

export default function SearchComponent(props: Props) {
    const { searchLocation, setSearchLocation, handleChooseLocation } = props;
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const debounceValue = useDebounce(searchLocation, 500);

    const handleSearchLocation = async () => {
        try {
            const apiKey = 'zQooxv0iylfvwq46LeAidvzavSl9RIuhgBkvBF9-0JY';
            const api = `https://revgeocode.search.hereapi.com/v1/autocomplete?q=${debounceValue}&lang=vi-VN&apiKey=${apiKey}&limit=10`;
            const res = await axios(api);
            if (res && res.status === 200) {
                setRecentSearches(res.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(debounceValue);
        if (debounceValue === '' && searchLocation.length > 0) {
            setRecentSearches([]);
        } else {
            handleSearchLocation();
        }

        console.log(1234);
    }, [debounceValue]);
    return (
        <View className=''>
            <InputComponent
                value={searchLocation === 'Choose location' ? '' : searchLocation}
                onChange={(val) => setSearchLocation(val)}
                placeholder='Enter Location'
                multiline
                height={70}
                label='Location'
                iconRight={
                    <Pressable onPress={handleSearchLocation}>
                        <Ionicons name='search' size={24} color='#000' />
                    </Pressable>
                }
            />
            <View
                className=' bg-white'
                style={{
                    zIndex: 1000,
                }}
            >
                {recentSearches.map((item: any, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            handleChooseLocation(item.address.label);
                            setRecentSearches([]);
                        }}
                        className='px-2 py-4 text-lg border-b border-gray-200'
                    >
                        <Text>{item.address.label}</Text>
                    </TouchableOpacity>
                ))}
                {recentSearches.length === 0 && debounceValue && (
                    <View className='px-2 py-4 text-lg border-b border-gray-200'>
                        <Text>No result found</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
