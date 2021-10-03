import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  }
});

const fileInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    accept: 'application/json',
    // 'content-type': 'multipart/form-data',
  }
})


export const api = {
  get: ({ params, path }) => instance.get(path, { params } ),
  post: ({ params, path }) => instance.post(path, params),
  postFile: ({ params, path }) => fileInstance.post(path, params),
  delete: ({ params, path }) => instance.delete(path, params),
};