const env = process.env.NODE_ENV
const config = require(`./env/${env}`).default
export default config
