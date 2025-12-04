import React from 'react';
import type { ChangeEvent } from 'react';
import type { WorkflowNode, AutomatedNodeData } from '../../types/workflow';
import { useWorkflowStore } from '../../store/workflowStore';

interface Props {
  node: WorkflowNode;
  updateNodeData: (data: Partial<AutomatedNodeData>) => void;
}

export const AutomatedForm: React.FC<Props> = ({ node, updateNodeData }) => {
  const data = node.data as AutomatedNodeData;
  const automations = useWorkflowStore((s) => s.automations);

  const selectedAction = automations.find((a) => a.id === data.actionId);

  const onActionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateNodeData({ actionId: e.target.value, params: {} });
  };

  const onParamChange = (key: string, value: string) => {
    updateNodeData({
      params: {
        ...data.params,
        [key]: value,
      },
    });
  };

  return (
    <div className="p-3 space-y-2 text-xs">
      <div className="font-semibold">Automated Step</div>

      <label className="block">
        <span>Title</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.label}
          onChange={(e) => updateNodeData({ label: e.target.value })}
        />
      </label>

      <label className="block">
        <span>Action</span>
        <select
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.actionId ?? ''}
          onChange={onActionChange}
        >
          <option value="">Select action</option>
          {automations.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </label>

      {selectedAction &&
        selectedAction.params.map((param) => (
          <label key={param} className="block">
            <span>{param}</span>
            <input
              className="mt-1 w-full border rounded px-2 py-1"
              value={data.params[param] ?? ''}
              onChange={(e) => onParamChange(param, e.target.value)}
            />
          </label>
        ))}
    </div>
  );
};
