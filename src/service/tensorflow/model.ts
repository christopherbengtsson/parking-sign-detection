import {
  loadGraphModel,
  io,
  GraphModel,
  disposeVariables,
  dispose,
  zeros,
} from '@tensorflow/tfjs-node';
import path from 'path';
import { logPerformance } from '../../utils/logPerformanceTime';

export default class TensorflowModelClass {
  private static _instance: TensorflowModelClass = new TensorflowModelClass();

  private _model: GraphModel<string>;

  private constructor() {
    if (TensorflowModelClass._instance) {
      throw new Error(
        'Error: Instantiation failed: Use TensorflowModelClass.getInstance() instead of new.',
      );
    }
    TensorflowModelClass._instance = this;
  }

  public static getInstance(): TensorflowModelClass {
    return TensorflowModelClass._instance;
  }

  public getModel(): GraphModel<string> {
    return this._model;
  }

  public setModel(model: GraphModel<string>) {
    this._model = model;
  }

  public async loadModel() {
    try {
      console.log('Firing up tf-model...');
      const t1 = performance.now();
      const modelFilePath = io.fileSystem(
        path.join(__dirname, '..', '../data/tfjs-model-converted/model.json'),
      );
      const model = await loadGraphModel(modelFilePath);
      const t2 = performance.now();
      logPerformance(t1, t2, 'to load model!');

      this._model = model;
      await this.warmpUpModel();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async warmpUpModel() {
    try {
      const t1 = performance.now();
      const inputSize = this._model.inputs[0].shape?.at(1) ?? 320;
      const testResult = await this._model.executeAsync(
        zeros([1, inputSize, inputSize, 3]),
      );
      const t2 = performance.now();
      logPerformance(t1, t2, 'to warm up model!');
      dispose(testResult);
    } catch (error) {
      console.error('Failed to warm up model!', error);
    }
  }

  public disploseModel() {
    this._model.dispose();
    disposeVariables();
  }
}
