import _axios from 'axios';

const axios = _axios.create({
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

export default {
  ...axios,
  getProblemList(cursor) {
    let url = `/api/problem/`;
    if (cursor !== null) {
      url = `/api/problem/?cursor=${cursor}`;
    }
    return axios.get(url);
  },

  getProblem(id) {
    return axios.get(`/api/problem/${id}/`);
  },

  getSubmissionList(problemId, cursor) {
    let url = `/api/submission/?problem=${problemId}`;
    if (cursor !== null) {
      url = `/api/submission/?problem=${problemId}&cursor=${cursor}`;
    }
    return axios.get(url);
  },

  submit(problemId, code) {
    return axios.post(`/api/problem/${problemId}/submit/`, { code });
  }
}
