import { ButtonComponent, ContainerComponent, LanguageItem, SectionComponent } from '@components/index';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { sleep } from '@helpers/index';
import LoadingModal from '@modals/LoadingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
const language = [
    {
        id: 'vi',
        name: 'Vietnamese (VI)',
        image: require('@assets/images/language-vi.png'),
    },
    {
        id: 'en',
        name: 'English (EN)',
        image: require('@assets/images/language-en.png'),
    },
];

export default function LanguageScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('vi');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.getItem('language').then((lang) => {
            setSelectedLanguage(lang || 'vi');
        });
    }, []);

    const { t, i18n } = useTranslation();

    const handleSwitchLanguage = async () => {
        setIsLoading(true);
        await sleep(2000);
        AsyncStorage.setItem('language', selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        setIsLoading(false);
        router.back();
    };

    return (
        <ContainerComponent isScroll back title={t('home.language')}>
            <SectionComponent>
                <FlatList
                    scrollEnabled={false}
                    data={language}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <LanguageItem
                            selected={selectedLanguage === item.id}
                            onSelect={() => setSelectedLanguage(item.id)}
                            name={item.name}
                            image={item.image}
                        />
                    )}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    title={t('editProfile.saveButtonTitle')}
                    onPress={() => {
                        handleSwitchLanguage();
                    }}
                    type='primary'
                    size='large'
                />
            </SectionComponent>
            <LoadingModal visible={isLoading} message={t('profile.loadingLanguage')} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
