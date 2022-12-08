import * as tf from '@tensorflow/tfjs-node';
import { logPerformance } from '../utils/logPerformanceTime';
import { postProcessPredictions } from '../service/tensorflow/postprocess';
import { parentPort, isMainThread } from 'worker_threads';
import TensorflowModelClass from '../service/tensorflow/model';
import logger from '../logger';

let model: tf.GraphModel<string>;

if (!isMainThread) {
  const modelInstance = TensorflowModelClass.getInstance();
  modelInstance.loadModel().then(() => {
    model = modelInstance.getModel();
    logger.info('Model loaded in worker');
  });

  parentPort?.on('message', async ({ image, threshold }) => {
    const predictions = await predictLocal({ image, threshold });
    parentPort?.postMessage(predictions);
  });
} else {
  logger.warning('Worker code available in main thread');
}

const predictLocal = async ({
  image,
  threshold,
}: {
  image: Express.Multer.File;
  threshold: number;
}) => {
  const t1 = performance.now();

  const originalImageSize = {
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
      'detected_scores',
      'detected_boxes',
      'detected_classes',
    ])) as tf.Tensor<tf.Rank>[];
    const t2 = performance.now();

    logPerformance(t1, t2, 'to execute model');
  } catch (err) {
    throw err;
  }

  try {
    const predictions = await Promise.all(outputs.map((t) => t.array()));
    const t2 = performance.now();
    logPerformance(t1, t2, 'to run `predictLocal()`');

    const mappedPredictions = postProcessPredictions(
      JSON.parse(JSON.stringify(predictions)) as (number[] | number[][])[],
      originalImageSize,
      threshold,
    );

    return {
      mappedPredictions,
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
