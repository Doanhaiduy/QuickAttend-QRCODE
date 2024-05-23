import { StyleSheet } from 'react-native';
import React from 'react';
import { ContainerComponent, SectionComponent, TextComponent } from '@/components';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyScreen() {
    const { t } = useTranslation();

    return (
        <ContainerComponent isScroll back title={t('privatePolicy.privacyPolicyTitle')}>
            <SectionComponent>
                <TextComponent className='text-gray-600 font-medium'>{t('privatePolicy.lastUpdated')}</TextComponent>

                <TextComponent className='text-blackText text-base font-medium mt-2'>
                    {t('privatePolicy.readPrivacyPolicy')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('privatePolicy.privacyPolicyTitle')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.privacyPolicyText')}
                </TextComponent>

                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('privatePolicy.informationCollectionTitle')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.informationCollectionText')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('privatePolicy.logDataTitle')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.logDataText')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('privatePolicy.cookiesTitle')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.cookiesText')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('privatePolicy.serviceProvidersTitle')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.serviceProvidersText')}
                </TextComponent>

                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.serviceProviderReason1')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.serviceProviderReason2')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.serviceProviderReason3')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('privatePolicy.serviceProviderReason4')}
                </TextComponent>
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
