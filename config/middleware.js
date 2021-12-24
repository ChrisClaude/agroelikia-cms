module.exports = ({env}) => ({
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: ["https://agroelikia-frontend-app.vercel.app", "http://localhost:4200"]
    }
  }
})

