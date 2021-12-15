const parse = require('pg-connection-string').parse;
const config = parse("postgres://reqiirajaeatgs:576d6be29c44ac119143aed0394de42fb569d4f19e263adf3b6488eb15781564@ec2-54-147-107-18.compute-1.amazonaws.com:5432/d8t8eed4tm0nb0");

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
