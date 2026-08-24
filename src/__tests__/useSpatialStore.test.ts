import { useSpatialStore } from '../store/useSpatialStore';
import { MeshNode } from '../types/spatial';

describe('useSpatialStore Engine', () => {
  beforeEach(() => {
    useSpatialStore.setState({ nodes: new Map(), selectedNodeId: null });
  });

  it('should initialize with an empty map', () => {
    const state = useSpatialStore.getState();
    expect(state.nodes.size).toBe(0);
    expect(state.selectedNodeId).toBeNull();
  });

  it('should correctly set nodes in state', () => {
    const mockNodes: MeshNode[] = [
      {
        id: 'node-1',
        position: [1, 2, 3],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: '#ff0000',
      },
    ];

    useSpatialStore.getState().setNodes(mockNodes);

    const state = useSpatialStore.getState();
    expect(state.nodes.size).toBe(1);
    expect(state.nodes.get('node-1')).toEqual(mockNodes[0]);
  });

  it('should update specific node properties via partial mutations', () => {
    const mockNodes: MeshNode[] = [
      {
        id: 'node-1',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: '#ff0000',
      },
    ];

    useSpatialStore.getState().setNodes(mockNodes);
    useSpatialStore.getState().updateNode('node-1', { position: [10, 20, 30] });

    const updatedNode = useSpatialStore.getState().nodes.get('node-1');
    expect(updatedNode?.position).toEqual([10, 20, 30]);
    expect(updatedNode?.color).toBe('#ff0000');
  });

  it('should update selected node state', () => {
    useSpatialStore.getState().selectNode('node-1');
    expect(useSpatialStore.getState().selectedNodeId).toBe('node-1');

    useSpatialStore.getState().selectNode(null);
    expect(useSpatialStore.getState().selectedNodeId).toBeNull();
  });
});