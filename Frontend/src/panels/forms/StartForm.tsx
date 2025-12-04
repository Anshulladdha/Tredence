import React from 'react';
import type { ChangeEvent } from 'react';
import type { WorkflowNode, StartNodeData } from '../../types/workflow';

interface Props {
  node: WorkflowNode;
  updateNodeData: (data: Partial<StartNodeData>) => void;
}

export const StartForm: React.FC<Props> = ({ node, updateNodeData }) => {
  const data = node.data as StartNodeData;

  const onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeData({ label: e.target.value });
  };

  const onMetaChange = (key: string, value: string) => {
    updateNodeData({
      metadata: {
        ...data.metadata,
        [key]: value,
      },
    });
  };

  return (
    <div className="p-3 space-y-2 text-xs">
      <div className="font-semibold">Start Node</div>

      <label className="block">
        <span>Title</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.label}
          onChange={onLabelChange}
        />
      </label>

      <div>
        <div className="font-medium mb-1">Metadata</div>
        {Object.keys(data.metadata).map((key) => (
          <div key={key} className="flex gap-1 mb-1">
            <input
              className="w-1/2 border rounded px-1 py-0.5"
              value={key}
              disabled
            />
            <input
              className="w-1/2 border rounded px-1 py-0.5"
              value={data.metadata[key]}
              onChange={(e) => onMetaChange(key, e.target.value)}
            />
          </div>
        ))}

        <button
          type="button"
          className="text-blue-600 mt-1"
          onClick={() =>
            onMetaChange(`key_${Object.keys(data.metadata).length + 1}`, '')
          }
        >
          + Add metadata
        </button>
      </div>
    </div>
  );
};
