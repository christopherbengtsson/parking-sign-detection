import fs from 'node:fs';
import path from 'node:path';

export const CLASS_LABELS = fs
  .readFileSync(
    path.join(__dirname, '..', '../model/compact_s1/tfjs-model-converted/labels.txt'),
    'utf8',
  )
  .split('\n');
