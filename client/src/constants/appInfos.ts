import { Dimensions } from 'react-native';

export const appInfos = {
    sizes: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    BASE_URL: 'http://192.168.1.9:3000/api/v1',
};
