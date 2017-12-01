const env = process.env.NODE_ENV
const config = import(`./env/${env}`)
export default config
