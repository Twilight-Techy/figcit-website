import * as migration_20261024_204219_initial from './20261024_204219_initial';

export const migrations = [
  {
    up: migration_20261024_204219_initial.up,
    down: migration_20261024_204219_initial.down,
    name: '20261024_204219_initial'
  },
];
