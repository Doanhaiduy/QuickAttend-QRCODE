import { appInfos } from '../constants/appInfos';
import axiosClient from './axiosClient';

class EventAPI {
    HandleEvent = async (url: string, data?: any, method?: 'get' | 'post' | 'put' | 'delete') => {
        return await axiosClient(`${appInfos.BASE_URL}/events${url}`, {
            method: method || 'get',
            data,
        });
    };
}

const eventAPI = new EventAPI();

export default eventAPI;
