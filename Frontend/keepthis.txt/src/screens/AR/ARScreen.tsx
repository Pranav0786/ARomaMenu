import React, { useState, useEffect } from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
} from '@reactvision/react-viro';
import { StyleSheet, View } from 'react-native';

const modelPath = 'https://fihtpzjtefcqzjdyvbxi.supabase.co/storage/v1/object/public/products//burgar_04.glb';

const HelloWorldSceneAR = () => {
  const [modelScale, setModelScale] = useState<[number, number, number]>([0.05, 0.05, 0.05]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Continuous rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(([x, y, z]) => [x, y + 1, z]); 
    }, 30); 

    return () => clearInterval(interval); 
  }, []);

  const handlePinch = (pinchState: number, scaleFactor: number, source: any) => {
    if (pinchState === 3) return;

    const minScale = 0.02;
    const maxScale = 0.2;

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
          source={{ uri: modelPath }}
          position={[0, 0.1, 0]}
          scale={modelScale}
          rotation={rotation}
          type="GLB"
          onPinch={handlePinch}
        />
      </ViroNode>
    </ViroARScene>
  );
};

const ARScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: HelloWorldSceneAR }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default ARScreen;