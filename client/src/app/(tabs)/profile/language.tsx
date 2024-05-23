import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonComponent, ContainerComponent, LanguageItem, SectionComponent } from '@/components';
// import { handleChangeLanguage, i18n } from '@/utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sleep } from '@/helpers';
import { router } from 'expo-router';
import LoadingModal from '@/modals/LoadingModal';
const language = [
    {
        id: 'vi',
        name: 'Vietnamese (VI)',
        image: require('@/assets/images/language-vi.png'),
    },
    {
        id: 'en',
        name: 'English (EN)',
        image: require('@/assets/images/language-en.png'),
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
