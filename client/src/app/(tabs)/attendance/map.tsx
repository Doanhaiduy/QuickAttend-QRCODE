import { ButtonComponent, ContainerComponent, SearchComponent, SectionComponent } from '@/components';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Geocoder from 'react-native-geocoding';

export default function MapScreen() {
    Geocoder.init('AIzaSyCs2GujRrlTqhK7anNsFbwm_GccRFjSsI4', { language: 'en' });

    const [location, setLocation] = useState<{
        lat: number;
        long: number;
    }>();
    const [isLoading, setIsLoading] = useState(false);
    const { lat, long, locationName } = useLocalSearchParams();
    const [searchLocation, setSearchLocation] = useState<string>(locationName ? `${locationName}` : '');

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const permission = await Location.requestForegroundPermissionsAsync();
            console.log(permission);
            if (!permission.canAskAgain || permission.status === 'denied') {
                Alert.alert('Permission Required', 'Please enable location permission to use this feature', [
                    {
                        text: 'Close',
                        onPress: () => router.back(),
                    },
                    {
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings(),
                    },
                ]);
            } else {
                if (permission.status === 'granted') {
                    if (lat && long) {
                        setLocation({
                            lat: +lat,
                            long: +long,
                        });
                    } else {
                        const location = await Location.getCurrentPositionAsync({});
                        setLocation({
                            lat: location.coords.latitude,
                            long: location.coords.longitude,
                        });
                    }
                    setIsLoading(false);
                }
            }
        })();
    }, []);

    useEffect(() => {
        console.log('location changed: ', location);
    }, [location]);

    const handleSubmitLocation = () => {
        router.replace({
            pathname: '/attendance/createEvent',
            params: {
                lat: location?.lat,
                long: location?.long,
            },
        });
    };

    const handleChooseLocation = async (locationName: string) => {
        setIsLoading(true);
        const normalizeSearch = locationName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        console.log(normalizeSearch);

        Geocoder.from(normalizeSearch)
            .then((json) => {
                var location = json.results[0].geometry.location;
                setLocation({
                    lat: location.lat,
                    long: location.lng,
                });
                setIsLoading(false);
                setSearchLocation(locationName);
            })
            .catch((error) => console.warn(error));
    };

    return (
        <ContainerComponent isScroll back title='Choose Location'>
            <SectionComponent className=' '>
                <SearchComponent
                    searchLocation={searchLocation}
                    setSearchLocation={setSearchLocation}
                    handleChooseLocation={handleChooseLocation}
                />
            </SectionComponent>
            <SectionComponent className='px-0 h-[80vh] '>
                {!isLoading ? (
                    <>
                        <MapView
                            initialRegion={{
                                latitude: location?.lat || 0,
                                longitude: location?.long || 0,
                                latitudeDelta: Platform.OS === 'ios' ? 0.0064 : 0.01,
                                longitudeDelta: Platform.OS === 'ios' ? 0.0038 : 0.015,
                            }}
                            onRegionChange={(region) => {}}
                            region={{
                                latitude: location?.lat || 0,
                                longitude: location?.long || 0,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.015,
                            }}
                            mapType='standard'
                            className='w-full h-full'
                        >
                            <Marker
                                coordinate={{
                                    latitude: location?.lat || 0,
                                    longitude: location?.long || 0,
                                }}
                                // image={require('../../../assets/images/avatar.jpg')}
                                title='Current Location'
                                description="You're here"
                                draggable
                                onDragEnd={(e) => {
                                    setLocation({
                                        lat: e.nativeEvent.coordinate.latitude,
                                        long: e.nativeEvent.coordinate.longitude,
                                    });
                                }}
                            >
                                <Image
                                    source={require('../../../assets/images/avatar.jpg')}
                                    style={{ height: 35, width: 35 }}
                                />
                            </Marker>
                        </MapView>
                        <View className='absolute top-[70%] w-full  items-center justify-center'>
                            <ButtonComponent
                                onPress={handleSubmitLocation}
                                title='Submit Location'
                                size='medium'
                                type='primary'
                            />
                        </View>
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
