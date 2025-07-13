import axios from "axios";
const API = axios.create({
  baseURL: 'http://192.168.1.3:1010/bluepact',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const sendOtpEmail = async (email: string) => {
  try {
    const response = await API.get('/login/userLogin', {
      params: { email: email }
    });
    return response.data;
  } catch (error) {
    console.error("sendEmail error:", error);
    throw error;
  }
};