import * as migration_20261024_204219_initial from './20261024_204219_initial';
import * as migration_20261024_214207_media_hardening from './20261024_214207_media_hardening';
import * as migration_20261024_224042_form_submissions from './20261024_224042_form_submissions';
import * as migration_20261025_012033_pages_and_site_settings from './20261025_012033_pages_and_site_settings';
import * as migration_20261025_015005_services_sections from './20261025_015005_services_sections';
import * as migration_20261025_020045_audience_blocks from './20261025_020045_audience_blocks';
import * as migration_20261025_021751_about_team_blocks from './20261025_021751_about_team_blocks';
import * as migration_20261025_023043_contact_forms from './20261025_023043_contact_forms';
import * as migration_20261025_024415_faq_legal from './20261025_024415_faq_legal';

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
    name: '20261024_224042_form_submissions',
  },
  {
    up: migration_20261025_012033_pages_and_site_settings.up,
    down: migration_20261025_012033_pages_and_site_settings.down,
    name: '20261025_012033_pages_and_site_settings',
  },
  {
    up: migration_20261025_015005_services_sections.up,
    down: migration_20261025_015005_services_sections.down,
    name: '20261025_015005_services_sections',
  },
  {
    up: migration_20261025_020045_audience_blocks.up,
    down: migration_20261025_020045_audience_blocks.down,
    name: '20261025_020045_audience_blocks',
  },
  {
    up: migration_20261025_021751_about_team_blocks.up,
    down: migration_20261025_021751_about_team_blocks.down,
    name: '20261025_021751_about_team_blocks',
  },
  {
    up: migration_20261025_023043_contact_forms.up,
    down: migration_20261025_023043_contact_forms.down,
    name: '20261025_023043_contact_forms',
  },
  {
    up: migration_20261025_024415_faq_legal.up,
    down: migration_20261025_024415_faq_legal.down,
    name: '20261025_024415_faq_legal'
  },
];
