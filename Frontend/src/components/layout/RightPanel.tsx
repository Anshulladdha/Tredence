// src/components/layout/RightPanel.tsx
import React from 'react';
import { NodeConfigPanel } from '../../panels/NodeConfigPanel';
// import { SandboxPanel } from '../../panels/SandboxPanel';

export const RightPanel: React.FC = () => {
  return (
    <aside
      style={{
        width: 320,
        borderLeft: '1px solid #e5e7eb',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
      }}
    >
      <div
        style={{
          borderBottom: '1px solid #e5e7eb',
          padding: '8px 12px',
          fontWeight: 600,
        }}
      >
        Node Configuration
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <NodeConfigPanel />
      </div>
      {/* <div
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '8px 12px',
          fontWeight: 600,
        }}
      >
        Workflow Sandbox
      </div>
      <div style={{ height: 200, overflow: 'auto' }}>
        <SandboxPanel />
      </div> */}
    </aside>
  );
};
