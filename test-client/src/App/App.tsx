import { FormEvent, useEffect, useRef, useState } from 'react';
import { calcStuff } from '../processPredictions';
import { readSignData } from '../rules';
import TimeShift from 'timeshift-js';
import { getTime, setHours } from 'date-fns';

// Date = TimeShift.Date;

// TimeShift.setTime(setHours(new Date(), 23).getTime());

console.log(new Date());

const drawSignBoundry = (
  ctx: any,
  {
    left,
    top,
    width,
    height,
  }: { left: number; top: number; width: number; height: number },
  label: string,
  probability: number,
  nestedSigns?: any[],
) => {
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 4;

  ctx.beginPath();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(
    label + ' - ' + Math.round(parseFloat(`${probability}`) * 100) + '% prob',
    left,
    top - 10,
  );
  ctx.fill();

  ctx.fillStyle = 'rgba(4,170,109,0.3)';

  ctx.rect(left, top, width, height);
  ctx.fill();
  ctx.stroke();

  if (nestedSigns?.length) {
    console.log(nestedSigns);
    nestedSigns.forEach((props: any) => {
      drawSignBoundry(
        ctx,
        props.boundingBoxes,
        props.label,
        props.probability,
        props.nestedSigns,
      );
    });
  }
};

const drawTextBoundry = (ctx: any, textContent: any) => {
  textContent?.forEach(({ content, textBoundry, normalizedTextBoundry }) => {
    const { left, top, width, height } = normalizedTextBoundry;

    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.rect(left, top, width, height);
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.fillText(content, textBoundry[0], textBoundry[1] - 10);
    ctx.moveTo(textBoundry[0], textBoundry[1]);
    ctx.lineTo(textBoundry[2], textBoundry[3]);
    ctx.lineTo(textBoundry[4], textBoundry[5]);
    ctx.lineTo(textBoundry[6], textBoundry[7]);
    ctx.closePath();
    ctx.stroke();
  });
};

const drawBounries = (
  ctx: CanvasRenderingContext2D,
  res: any[],
  width: number,
  height: number,
) => {
  // ctx.clearRect(0, 0, width, height);
  res?.forEach((obj) => {
    drawSignBoundry(
      ctx,
      obj.boundingBoxes,
      obj.label,
      obj.probability,
      obj.nestedSigns,
    );
    drawTextBoundry(ctx, obj.textContent);
  });
};

export function App() {
  //   const [result, setResult] = useState({});
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctxScale, setCtxScake] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);
  const [result, setResult] = useState(null);

  const draw = () => {
    if (image && canvasRef?.current) {
      canvasRef.current.width = image.width;
      canvasRef.current.height = image.height;

      const ctx = canvasRef.current.getContext('2d');
      ctx?.drawImage(image, ctxScale, ctxScale);
    }
  };

  useEffect(() => {
    draw();
  }, [image]);

  useEffect(() => {
    draw();
    console.log(ctxScale);
  }, [ctxScale]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (result && canvasRef?.current && image) {
      setResult(null);
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(ctxScale, ctxScale, image?.width, image?.height);
      ctx?.drawImage(image, ctxScale, ctxScale);
    }

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('threshold', '0.2');

    fetch('http://localhost:8080/api/predict-and-ocr', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res.result);
        if (canvasRef?.current) {
          drawBounries(
            canvasRef.current.getContext('2d')!,
            res.result,
            image!.width,
            image!.height,
          );
          readSignData(res.result);
          // calcStuff(canvasRef.current.getContext("2d")!, image!, res.result);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileChange = ({
    target,
  }: {
    target: EventTarget & HTMLInputElement;
  }) => {
    if (target?.files?.length) {
      setResult(null);
      setImage(null);
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result as string;
        setImage(image);
      };
    }
  };

  return (
    <div className="app">
      <form
        action="/upload"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          id="image"
          name="image"
          disabled={loading}
          onChange={handleFileChange}
        />
        <button type="submit">Ladda upp</button>
      </form>
      <button onClick={() => setCtxScake((old) => old + 10)}>+</button>
      <canvas
        ref={canvasRef}
        style={{ maxWidth: '100vw', maxHeight: '95vh' }}
      />
    </div>
  );
}
