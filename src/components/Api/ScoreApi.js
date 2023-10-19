import axios from 'axios';
import env from 'react-dotenv';

const scoreApi = axios.create({ baseURL: env.SCORE_URL });

export async function getByUsername(username, type = 'TGNAME') {
  try {
    const response = await scoreApi.get(`/contact/${username}/${type}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
