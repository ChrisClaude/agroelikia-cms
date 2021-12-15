const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

console.log(config);

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: config.host,
//       port: parseInt(config.port),
//       database: config.database,
//       username: config.user,
//       password: config.password,
//       ssl: {
//         rejectUnauthorized: false
//       },
//     },
//     debug: false,
//   },
// });

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: "postgres",
        host: config.host,
        port: parseInt(config.port),
        database: config.database,
        username: config.user,
        password: config.password,
        ssl: true
      },
      options: {
        ssl: true,
      },
    },
  },
});

