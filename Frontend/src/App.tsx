import React, { useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import { AppLayout } from './components/layout/AppLayout';
import { fetchAutomations } from './api/client';
import { useWorkflowStore } from './store/workflowStore';

const App: React.FC = () => {
  const setAutomations = useWorkflowStore((s) => s.setAutomations);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAutomations();
        setAutomations(data);
      } catch (err) {
        console.error('Failed to load automations', err);
      }
    })();
  }, [setAutomations]);

  return (
    <ReactFlowProvider>
      <AppLayout />
    </ReactFlowProvider>
  );
};

export default App;
