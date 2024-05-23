import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import TextComponent from '../components/TextComponent';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
    const { t } = useTranslation();
    return (
        <>
            <Stack.Screen options={{ title: t('notFound.oops') }} />
            <View style={styles.container}>
                <TextComponent style={styles.title}> {t('notFound.screenDoesNotExist')}</TextComponent>

                <Link href='/' style={styles.link}>
                    <TextComponent style={styles.linkText}> {t('notFound.goToHomeScreen')}</TextComponent>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
