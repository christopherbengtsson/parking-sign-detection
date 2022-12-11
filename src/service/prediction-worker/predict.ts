import * as tf from '@tensorflow/tfjs-node';
import { logPerformance } from '../../utils/logPerformanceTime';
import { postProcessPredictions } from './postprocess';
import { isMainThread, parentPort } from 'node:worker_threads';
import { loadModel } from '../tensorflow-model/model';
import { IImageSize } from '../../types';

let model: tf.GraphModel<string>;

export const initModel = async () => {
  const loadedModel = await loadModel();
  model = loadedModel;
};

if (!isMainThread) {
  initModel().then(() => {
    parentPort?.postMessage({ loaded: true });
  });

  parentPort?.on('message', async ({ image, threshold }) => {
    const predictions = await predictLocal({ image, threshold });
    parentPort?.postMessage(predictions);
  });
}

const predictLocal = async ({
  image,
  threshold,
}: {
  image: Express.Multer.File;
  threshold: number;
}) => {
  const t1 = performance.now();

  const originalImageSize: IImageSize = {
    width: 0,
    height: 0,
  };

  const batchedT4d = tf.tidy(() => {
    const inputSize = model.inputs[0].shape?.at(1) ?? 320;

    const imageTensor = tf.node.decodeImage(image.buffer, 3);
    originalImageSize.height = imageTensor.shape[0];
    originalImageSize.width = imageTensor.shape[1];

    return tf.image.resizeBilinear(
      imageTensor.expandDims().toFloat() as tf.Tensor3D | tf.Tensor4D,
      [inputSize, inputSize],
    );
  });

  let outputs: tf.Tensor<tf.Rank>[];

  try {
    const t1 = performance.now();
    outputs = (await model.executeAsync(batchedT4d, [
      'detected_boxes:0',
      'detected_classes:0',
      'detected_scores:0',
    ])) as tf.Tensor<tf.Rank>[];
    const t2 = performance.now();

    logPerformance(t1, t2, 'executeAsync()');
  } catch (err) {
    throw err;
  }

  try {
    const predictions = await Promise.all(outputs.map((t) => t.array()));
    const t2 = performance.now();
    logPerformance(t1, t2, 'predictLocal()');

    const mappedPredictions = postProcessPredictions(
      JSON.parse(JSON.stringify(predictions)) as (number[] | number[][])[],
      originalImageSize,
      threshold,
    );

    return {
      mappedPredictions,
      originalImageSize,
    };
  } catch (err) {
    throw err;
  } finally {
    batchedT4d.dispose();
    tf.dispose(outputs);
    tf.disposeVariables();
  }
};

export default predictLocal;
