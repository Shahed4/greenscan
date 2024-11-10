// object-detection.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "../utils/render-predictions";
import { useRouter } from "next/navigation";
import { uniqueDisplayNames } from "../utils/render-predictions";
import styles from "./object-detection.module.css";

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  async function runCoco() {
    setIsLoading(true);
    const net = await cocoSSDLoad();
    setIsLoading(false);

    const detectFrame = async () => {
      await runObjectDetection(net);
      requestAnimationFrame(detectFrame);
    };
    detectFrame();
  }

  const goGen = () => {
    router.push("/image-processing/gen-ai");
  };

  async function runObjectDetection(net) {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const detectedObjects = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, ctx);
    }
  }

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>Loading AI Model...</div>
      ) : (
        <>
          <div className={styles.videoContainer}>
            <Webcam
              ref={webcamRef}
              audio={false}
              className={styles.webcam}
            />
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
          <button className={styles.button} onClick={goGen}>
            Complete Scan
          </button>
        </>
      )}
    </div>
  );
};

export default ObjectDetection;
