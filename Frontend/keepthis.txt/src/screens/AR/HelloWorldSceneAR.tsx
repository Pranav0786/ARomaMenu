import React, { useState, useEffect } from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroARSceneNavigator,
} from '@reactvision/react-viro';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

type ARSceneProps = { 
  modelUrl: string;
};

const HelloWorldSceneAR = ({ modelUrl }: ARSceneProps) => {
  const [modelScale, setModelScale] = useState<[number, number, number]>([0.2, 0.2, 0.2]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  const handleLoadEnd = () => {
    if (modelUrl.includes('pizza')) {
      setModelScale([1.5, 1.5, 1.5]);
    } else if (modelUrl.includes('sushi')) {
      setModelScale([0.15, 0.15, 0.15]);
    } else if (modelUrl.includes('burger')) {
      setModelScale([0.18, 0.18, 0.18]);
    } else {
      setModelScale([0.2, 0.2, 0.2]); // default larger scale
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(([x, y, z]) => [x, y + 1, z]);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handlePinch = (pinchState: number, scaleFactor: number) => {
    if (pinchState === 3) return;
    const minScale = 0.02;
    const maxScale = 0.3;

    const newScale: [number, number, number] = modelScale.map((s) => {
      const scaled = s * scaleFactor;
      return Math.max(minScale, Math.min(maxScale, scaled));
    }) as [number, number, number];

    setModelScale(newScale);
  };

  return (
    <ViroARScene onTrackingUpdated={() => {}}>
      <ViroAmbientLight color="#aaaaaa" />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />

      <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => {}}>
        <Viro3DObject
          source={{ uri: modelUrl }}
          position={[0, 0.1, 0]}
          scale={modelScale}
          rotation={rotation}
          type="GLB"
          onPinch={handlePinch}
          onLoadEnd={handleLoadEnd}
          onError={(err) => console.warn('Failed to load model:', err)}
        />
      </ViroNode>
    </ViroARScene>
  );
};

const ARScreen = () => {
  const route = useRoute();
  const { modelUrl } = route.params as { modelUrl: string };

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <HelloWorldSceneAR modelUrl={modelUrl} />,
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default ARScreen;
