import React, { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { simulateWorkflowApi } from '../api/client';

export const SandboxPanel: React.FC = () => {
  // ✅ use simple selectors, not a big object (prevents infinite loops)
  const simulationLog = useWorkflowStore((s) => s.simulationLog);
  const simulationErrors = useWorkflowStore((s) => s.simulationErrors);
  const simulationRunning = useWorkflowStore((s) => s.simulationRunning);
  const setSimulationState = useWorkflowStore((s) => s.setSimulationState);

  const [localError, setLocalError] = useState<string | null>(null);

  const onRun = async () => {
    setLocalError(null);
    setSimulationState({
      simulationRunning: true,
      simulationLog: [],
      simulationErrors: [],
    });

    try {
      // ✅ get graph from store only when button is clicked
      const graph = useWorkflowStore.getState().asGraph();
      const res = await simulateWorkflowApi(graph);

      setSimulationState({
        simulationRunning: false,
        simulationLog: res.log,
        simulationErrors: res.errors,
      });
    } catch (err: unknown) {
      setSimulationState({ simulationRunning: false });

      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('Simulation failed');
      }
    }
  };

  return (
    <div className="p-2 text-xs">
      <button
        onClick={onRun}
        disabled={simulationRunning}
        className="mb-2 border rounded px-2 py-1 text-xs bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
      >
        {simulationRunning ? 'Running…' : 'Run Simulation'}
      </button>

      {localError && (
        <div className="mb-1 text-red-600">Request error: {localError}</div>
      )}

      {simulationErrors.length > 0 && (
        <div className="mb-2 text-red-600">
          <div className="font-semibold">Validation Errors:</div>
          <ul className="list-disc ml-4">
            {simulationErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {simulationLog.length > 0 && (
        <div>
          <div className="font-semibold mb-1">Execution Log:</div>
          <ol className="list-decimal ml-4 space-y-1">
            {simulationLog.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
