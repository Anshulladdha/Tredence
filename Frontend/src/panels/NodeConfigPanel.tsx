import React from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import type { WorkflowNode } from '../types/workflow';
import { StartForm } from './forms/StartForm';
import { TaskForm } from './forms/TaskForm';
import { ApprovalForm } from './forms/ApprovalForm';
import { AutomatedForm } from './forms/AutomatedForm';
import { EndForm } from './forms/EndForm';

export const NodeConfigPanel: React.FC = () => {
  const { nodes, selectedNodeId, setNodes } = useWorkflowStore();
  const node = nodes.find((n) => n.id === selectedNodeId) as WorkflowNode | undefined;

  if (!node) {
    return (
      <div className="p-3 text-xs text-gray-500">
        Select a node on the canvas to edit its configuration.
      </div>
    );
  }

  const updateNodeData = (data: Partial<WorkflowNode['data']>) => {
  const updated = nodes.map((n) =>
    n.id === node.id ? { ...n, data: { ...n.data, ...data } } : n,
  );
  setNodes(updated);
};

  const commonProps = { node, updateNodeData };

  switch (node.data.type) {
    case 'start':
      return <StartForm {...commonProps} />;
    case 'task':
      return <TaskForm {...commonProps} />;
    case 'approval':
      return <ApprovalForm {...commonProps} />;
    case 'automated':
      return <AutomatedForm {...commonProps} />;
    case 'end':
      return <EndForm {...commonProps} />;
    default:
      return null;
  }
};
