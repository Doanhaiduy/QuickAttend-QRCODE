import { Dimensions } from 'react-native';

export const appInfos = {
    sizes: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    BASE_URL: 'http://localhost:3000',
};
