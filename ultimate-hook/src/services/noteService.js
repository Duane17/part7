import axios from 'axios';

const baseUrl = 'http://localhost:3005/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (note) => {
  const response = await axios.post(baseUrl, note);
  return response.data;
};

export default { getAll, create };
