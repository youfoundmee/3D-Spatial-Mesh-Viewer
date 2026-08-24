import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpatialStore } from '../store/useSpatialStore';

const dummyMatrix = new THREE.Matrix4();
const dummyObject = new THREE.Object3D();
const frustum = new THREE.Frustum();
const projScreenMatrix = new THREE.Matrix4();
const colorHelper = new THREE.Color();

export const InstancedMeshViewer: React.FC = () => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const nodes = useSpatialStore((state) => state.nodes);
  const selectNode = useSpatialStore((state) => state.selectNode);
  const { camera } = useThree();

  const nodeList = React.useMemo(() => Array.from(nodes.values()), [nodes]);
  const count = nodeList.length;

  useLayoutEffect(() => {
    if (!instancedMeshRef.current || count === 0) return;

    nodeList.forEach((node, index) => {
      dummyObject.position.set(...node.position);
      dummyObject.rotation.set(...node.rotation);
      dummyObject.scale.set(...node.scale);
      dummyObject.updateMatrix();

      instancedMeshRef.current!.setMatrixAt(index, dummyObject.matrix);
      instancedMeshRef.current!.setColorAt(index, colorHelper.set(node.color));
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [nodeList, count]);

  useFrame(() => {
    if (!instancedMeshRef.current || count === 0) return;

    projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(projScreenMatrix);

    nodeList.forEach((node, idx) => {
      const inView = frustum.containsPoint(new THREE.Vector3(...node.position));
      if (!inView) {
        dummyMatrix.makeScale(0, 0, 0);
        instancedMeshRef.current!.setMatrixAt(idx, dummyMatrix);
      }
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.instanceId !== undefined) {
      const selectedNode = nodeList[e.instanceId];
      if (selectedNode) {
        selectNode(selectedNode.id);
      }
    }
  };

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[undefined, undefined, Math.max(count, 1)]}
      onClick={handleClick}
      data-testid="instanced-mesh"
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.3} metalness={0.8} />
    </instancedMesh>
  );
};