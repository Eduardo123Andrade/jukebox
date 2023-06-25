import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://difficult-clever-moray.gigalixirapp.com/api',
  // baseURL: 'http://localhost:4000/api',
})
