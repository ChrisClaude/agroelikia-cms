module.exports = ({env}) => ({
  settings: {
    cors: {
      enabled: true,
      origin: env('CORS_ORIGIN', 'https://agroelikia-frontend-app.vercel.app/').split(',')
    }
  }
})
