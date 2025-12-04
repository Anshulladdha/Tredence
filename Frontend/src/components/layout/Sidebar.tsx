// src/components/layout/Sidebar.tsx
import React from 'react';
import type { NodeKind } from '../../types/workflow';
import { NODE_DRAG_TYPE } from '../../constants/dragTypes';

const palette: { type: NodeKind; label: string }[] = [
  { type: 'start', label: 'Start Node' },
  { type: 'task', label: 'Task Node' },
  { type: 'approval', label: 'Approval Node' },
  { type: 'automated', label: 'Automated Step' },
  { type: 'end', label: 'End Node' },
];

export const Sidebar: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeKind,
  ) => {
    event.dataTransfer.setData(NODE_DRAG_TYPE, nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside
      style={{
        width: 220,
        borderRight: '1px solid #e5e7eb',
        background: '#f9fafb',
        padding: 12,
        fontSize: 12,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Node Types</div>
      <div>
        {palette.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '6px 8px',
              marginBottom: 6,
              background: '#fff',
              cursor: 'grab',
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </aside>
  );
};
