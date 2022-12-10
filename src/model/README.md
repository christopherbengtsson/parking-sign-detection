`/tfjs-model-converted-example` just contains an example model, trained with 15 images with only one tag - "sign". You might need to manually download the bin files.
![exmaple-model](./compact_s1/tfjs-model-converted-example/image.png 'Example Model')

Both the example model and the main model are trained with Microsoft Custom Vision, where they're exported as a `SavedModel`. At the moment (10-12-2022) Custom Vision export the TensoflowJS models as an older version whtch requires a long running postprocess after predictions, so they are manually converted with the following command:

```
tensorflowjs_converter \
--input_format=tf_saved_model \
--saved_model_tags=serve \
TensorFlowSavedModel tfjs-model-converted
```

Tip, use a python virtual environment in this directory when installing `tensorflowjs_converter`.
