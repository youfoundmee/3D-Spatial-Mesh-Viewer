import { useSpatialStore } from '../store/useSpatialStore';

export class TelemetrySimulator {
  private timer: number | null = null;

  start(updatesPerSecond = 30) {
    if (this.timer) return;

    const intervalMs = 1000 / updatesPerSecond;

    this.timer = window.setInterval(() => {
      const { nodes, updateNode } = useSpatialStore.getState();
      const nodeIds = Array.from(nodes.keys());
      if (nodeIds.length === 0) return;

      // Mutate 10 random nodes per tick to simulate live spatial drift
      for (let i = 0; i < 10; i++) {
        const randomId = nodeIds[Math.floor(Math.random() * nodeIds.length)];
        const currentNode = nodes.get(randomId);
        if (!currentNode) continue;

        const [x, y, z] = currentNode.position;
        updateNode(randomId, {
          position: [
            x + (Math.random() - 0.5) * 0.1,
            y + (Math.random() - 0.5) * 0.1,
            z + (Math.random() - 0.5) * 0.1,
          ],
        });
      }
    }, intervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const telemetrySimulator = new TelemetrySimulator();