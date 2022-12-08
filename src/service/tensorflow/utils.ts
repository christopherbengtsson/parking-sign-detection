import fs from 'fs';
import path from 'path';

export const getClassLabels = () =>
  fs
    .readFileSync(
      path.join(__dirname, '..', '../data/compact_s1/labels.txt'),
      'utf8',
    )
    .split('\n');
