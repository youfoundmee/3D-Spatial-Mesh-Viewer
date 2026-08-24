import { create } from 'zustand';
import { SpatialState, MeshNode } from '../types/spatial';

export const useSpatialStore = create<SpatialState>((set) => ({
  nodes: new Map<string, MeshNode>(),
  selectedNodeId: null,

  setNodes: (nodesList: MeshNode[]) =>
    set(() => {
      const nodeMap = new Map<string, MeshNode>();
      nodesList.forEach((node) => nodeMap.set(node.id, node));
      return { nodes: nodeMap };
    }),

  updateNode: (id: string, update: Partial<MeshNode>) =>
    set((state) => {
      const updatedNodes = new Map(state.nodes);
      const existingNode = updatedNodes.get(id);
      if (existingNode) {
        updatedNodes.set(id, { ...existingNode, ...update });
      }
      return { nodes: updatedNodes };
    }),

  selectNode: (id: string | null) => set({ selectedNodeId: id }),
}));