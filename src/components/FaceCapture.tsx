import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FaceCaptureProps {
  onCapture: (imageBlob: Blob) => void;
}

const FaceCapture = ({ onCapture }: FaceCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast({
          title: "Camera Error",
          description: "Unable to access camera. Please make sure you have granted camera permissions.",
          variant: "destructive",
        });
      }
    };

    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading face detection model:", error);
        toast({
          title: "Model Error",
          description: "Failed to load face detection model. Please try again.",
          variant: "destructive",
        });
      }
    };

    setupCamera();
    loadModel();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [toast]);

  const detectFace = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    setIsDetecting(true);
    try {
      const predictions = await model.estimateFaces(videoRef.current, false);
      
      if (predictions.length === 0) {
        toast({
          title: "No Face Detected",
          description: "Please position your face in front of the camera.",
          variant: "destructive",
        });
        setIsDetecting(false);
        return;
      }

      if (predictions.length > 1) {
        toast({
          title: "Multiple Faces Detected",
          description: "Please ensure only one face is visible.",
          variant: "destructive",
        });
        setIsDetecting(false);
        return;
      }

      // Draw the captured image on canvas
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        
        // Convert canvas to blob
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
            toast({
              title: "Success",
              description: "Face captured successfully!",
            });
          }
        }, 'image/jpeg', 0.8);
      }
    } catch (error) {
      console.error("Error during face detection:", error);
      toast({
        title: "Detection Error",
        description: "An error occurred during face detection. Please try again.",
        variant: "destructive",
      });
    }
    setIsDetecting(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-[640px] mx-auto">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg"
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="hidden"
        />
      </div>
      <Button 
        onClick={detectFace}
        disabled={isDetecting || !model}
        className="w-full"
      >
        {isDetecting ? "Detecting..." : "Capture Face"}
      </Button>
    </div>
  );
};

export default FaceCapture;