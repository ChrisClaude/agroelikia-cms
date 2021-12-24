module.exports = ({env}) => ({
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: ["https://agroelikia-frontend-app.vercel.app", "http://localhost:4200", "http://localhost:1337", "https://peaceful-ravine-69370.herokuapp.com"]
    }
  }
})

