import axios from 'axios';
import env from 'react-dotenv';

const scoreApi = axios.create({ baseURL: env.SCORE_URL });

export async function getScreeningInfo(username, type = 'TGID') {
  try {
    const response = await scoreApi.get(`/user/${username}/${type}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
