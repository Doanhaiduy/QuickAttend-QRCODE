import { ButtonComponent } from '@/components';
import { logout } from '@/redux/reducers/authReducer';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function HomeScreen() {
    const dispatch = useDispatch();

    return (
        <View className='flex-1 justify-center items-center'>
            <Text>Home Screen</Text>
            <ButtonComponent type='error' size='small' title='Logout' onPress={() => dispatch(logout())} />
        </View>
    );
}

const styles = StyleSheet.create({});
