let BASE_URL = ''
const TIMEOUT = 10000

const env: string = process.env.NODE_ENV

if (env === 'development') {
  BASE_URL = '/api'
} else if (env === 'production') {
  BASE_URL = ''
}

export { BASE_URL, TIMEOUT }
