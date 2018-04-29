import axios from 'axios';

export default {
  getProblemList(cursor) {
    return axios.get(`/api/problem/?cursor=${cursor}`);
  },

  getProblem(id) {
    return axios.get(`/api/problem/${id}/`);
  }
}
