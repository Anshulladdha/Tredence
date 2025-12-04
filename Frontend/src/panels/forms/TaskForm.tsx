import React from 'react';
import type { ChangeEvent } from 'react';
import type { WorkflowNode, TaskNodeData } from '../../types/workflow';

interface Props {
  node: WorkflowNode;
  updateNodeData: (data: Partial<TaskNodeData>) => void;
}

export const TaskForm: React.FC<Props> = ({ node, updateNodeData }) => {
  const data = node.data as TaskNodeData;

  const onChange =
    (field: keyof TaskNodeData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateNodeData({ [field]: e.target.value });
    };

  return (
    <div className="p-3 space-y-2 text-xs">
      <div className="font-semibold mb-1">Task Node</div>

      <label className="block">
        <span>Title *</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.label}
          onChange={onChange('label')}
          required
        />
      </label>

      <label className="block">
        <span>Description</span>
        <textarea
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.description ?? ''}
          onChange={onChange('description')}
        />
      </label>

      <label className="block">
        <span>Assignee</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.assignee ?? ''}
          onChange={onChange('assignee')}
        />
      </label>

      <label className="block">
        <span>Due date</span>
        <input
          type="date"
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.dueDate ?? ''}
          onChange={onChange('dueDate')}
        />
      </label>
    </div>
  );
};
