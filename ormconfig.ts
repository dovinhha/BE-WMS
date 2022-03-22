const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'mobile_shop',
  entities: ['dist/src/entities/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  synchronize: false,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};
