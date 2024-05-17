import { appInfos } from '../constants/appInfos';
import axiosClient from './axiosClient';

class UserAPI {
    HandleUser = async (url: string, data?: any, method?: 'get' | 'post' | 'put' | 'delete') => {
        return await axiosClient(`${appInfos.BASE_URL}/users${url}`, {
            method: method || 'get',
            data,
        });
    };
}

const userAPI = new UserAPI();

export default userAPI;
