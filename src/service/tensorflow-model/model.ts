import {
  loadGraphModel,
  io,
  GraphModel,
  dispose,
  zeros,
} from '@tensorflow/tfjs-node';
import path from 'node:path';
import { logPerformance } from '../../utils/logPerformanceTime';
import logger from '../../logger';

export const loadModel = async () => {
  try {
    logger.info('Firing up tf-model...');
    const t1 = performance.now();

    const modelFilePath = io.fileSystem(
      path.join(__dirname, '../../model/compact_s1/tfjs-model-converted/model.json'),
    );
    const model = await loadGraphModel(modelFilePath);

    const t2 = performance.now();
    logPerformance(t1, t2, 'loadModel()');

    await warmpUpModel(model);

    return model;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const warmpUpModel = async (model: GraphModel<string>) => {
  try {
    const t1 = performance.now();

    const inputSize = model.inputs[0].shape?.at(1) ?? 320;
    const testResult = await model.executeAsync(
      zeros([1, inputSize, inputSize, 3]),
    );
    dispose(testResult);

    const t2 = performance.now();
    logPerformance(t1, t2, 'warmpUpModel()');
  } catch (error) {
    logger.error('Failed to run `warmpUpModel()`!', error);
  }
};
