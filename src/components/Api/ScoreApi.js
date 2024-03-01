import axios from 'axios';
import env from 'react-dotenv';

const scoreApi = axios.create({ baseURL: env.SCORE_URL });

export async function getScreeningInfo(username, type = 'TGID', signal) {
  try {
    const response = await scoreApi.get(`/user/${username}/${type}`, {
      signal,
    });
    return response.data;
  } catch (e) {
    return { error: e?.code };
  }
}

export async function checkScreeningInfo(
  value,
  type = 'TGID',
  priority = true
) {
  try {
    const response = await scoreApi.post(`/user?priority=${priority}`, {
      value,
      type,
    });
    return response?.data;
  } catch (error) {
    return;
  }
}
