import * as migration_20261024_204219_initial from './20261024_204219_initial';
import * as migration_20261024_214207_media_hardening from './20261024_214207_media_hardening';
import * as migration_20261024_224042_form_submissions from './20261024_224042_form_submissions';

export const migrations = [
  {
    up: migration_20261024_204219_initial.up,
    down: migration_20261024_204219_initial.down,
    name: '20261024_204219_initial',
  },
  {
    up: migration_20261024_214207_media_hardening.up,
    down: migration_20261024_214207_media_hardening.down,
    name: '20261024_214207_media_hardening',
  },
  {
    up: migration_20261024_224042_form_submissions.up,
    down: migration_20261024_224042_form_submissions.down,
    name: '20261024_224042_form_submissions'
  },
];
