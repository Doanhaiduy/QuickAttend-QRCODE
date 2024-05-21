import { appInfos } from '../constants/appInfos';
import axiosClient from './axiosClient';

class AttendanceAPI {
    HandleAttendance = async (url: string, data?: any, method?: 'get' | 'post' | 'put' | 'delete') => {
        return await axiosClient(`${appInfos.BASE_URL}/attendances${url}`, {
            method: method || 'get',
            data,
        });
    };
}

const attendanceAPI = new AttendanceAPI();

export default attendanceAPI;
