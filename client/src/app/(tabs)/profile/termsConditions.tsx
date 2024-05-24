import { ContainerComponent, SectionComponent, TextComponent } from '@components/index';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export default function TermsConditionsScreen() {
    const { t } = useTranslation();

    return (
        <ContainerComponent isScroll back title={t('termsAndConditions.termsAndConditionsTitle')}>
            <SectionComponent>
                <TextComponent className='text-gray-600 font-medium'>
                    {t('termsAndConditions.lastUpdated')}
                </TextComponent>
                <TextComponent className='text-blackText text-base font-medium mt-2'>
                    {t('termsAndConditions.readTermsCarefully')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('termsAndConditions.conditionsOfUsesTitle')}
                </TextComponent>

                <TextComponent className='text-blackText text-base mt-2'>
                    {t('termsAndConditions.conditionsOfUsesText')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('termsAndConditions.termsOfUseTitle')}
                </TextComponent>
                <TextComponent className='text-blackText text-base mt-2'>
                    {t('termsAndConditions.termsOfUseText')}
                </TextComponent>
                <TextComponent className='text-primary-500 text-lg font-semibold mt-4'>
                    {t('termsAndConditions.communicationTitle')}
                </TextComponent>

                <TextComponent className='text-blackText text-base mt-2'>
                    {t('termsAndConditions.communicationText')}
                </TextComponent>
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
