import axios from 'axios'
import { stringify } from 'querystring'
import mockAdapter from './mock'

const api = axios.create({
  baseURL: 'https://api.example.com/v2/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  adapter: mockAdapter
})

export const createFoo = async (req: any) => {
  const { data } = await api.post('/foo', stringify(req))
  return data
}
