import axios from 'axios'

export const http = axios.create({
  baseUrl: '/',
  timeout: 10000,
}) 