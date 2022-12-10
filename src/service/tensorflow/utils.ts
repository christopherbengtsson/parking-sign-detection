import fs from 'node:fs';
import path from 'node:path';

export const CLASS_LABELS = fs
  .readFileSync(
    path.join(__dirname, '..', '../data/compact_s1/labels.txt'),
    'utf8',
  )
  .split('\n');
