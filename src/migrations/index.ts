import * as migration_20261024_204219_initial from './20261024_204219_initial';
import * as migration_20261024_214207_media_hardening from './20261024_214207_media_hardening';

export const migrations = [
  {
    up: migration_20261024_204219_initial.up,
    down: migration_20261024_204219_initial.down,
    name: '20261024_204219_initial',
  },
  {
    up: migration_20261024_214207_media_hardening.up,
    down: migration_20261024_214207_media_hardening.down,
    name: '20261024_214207_media_hardening'
  },
];
