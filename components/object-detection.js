// object-detection.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "../utils/render-predictions";
import { useRouter } from "next/navigation"; // Import useRouter
import { uniqueDisplayNames } from "../utils/render-predictions";

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Initialize router

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  async function runCoco() {
    setIsLoading(true); // Indicate that the model is loading
    const net = await cocoSSDLoad();
    setIsLoading(false); // Model has loaded

    const detectFrame = async () => {
      await runObjectDetection(net);
      requestAnimationFrame(detectFrame);
    };
    detectFrame();
  }

  const goHome = () => {
    console.log("Went Home");
    router.push("/"); // Route to home page
    console.log("End: ", uniqueDisplayNames);
  };

  async function runObjectDetection(net) {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;

      // Get video properties
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video and canvas width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const detectedObjects = await net.detect(video);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, ctx);
    }
  }

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading ? (
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Loading AI Model...
        </div>
      ) : (
        <>
          <div
            style={{
              position: "relative",
              width: "640px",
              height: "480px",
              margin: "0 auto",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            {/* Webcam video */}
            <Webcam
              ref={webcamRef}
              audio={false}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
            />

            {/* Canvas overlay */}
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
            />
          </div>

          {/* Button positioned underneath the webcam */}
          <div style={{}}>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "8px",
              }}
              onClick={goHome} // Call goHome on click
            >
              Wow
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ObjectDetection;
