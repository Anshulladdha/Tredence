// src/components/layout/AppLayout.tsx
import React from 'react';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { WorkflowCanvas } from '../canvas/WorkflowCanvas';

export const AppLayout: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: 12,
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: 48,
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Tredence – HR Workflow Designer
        </header>
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <WorkflowCanvas />
          </div>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};
