import axios from 'axios';
const API = axios.create({
  baseURL: 'http://192.168.1.14:9090/flexouser',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const sendOtpEmail = async (email: string) => {
  try {
    const response = await API.get('/login/userLogin', {
      params: { email: email },
    });
    return response.data;
  } catch (error) {
    console.error('sendEmail error:', error);
    throw error;
  }
};

export const addUser = async (data: any) => {
  try {
    const response = await API.post('/user/addUser', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
