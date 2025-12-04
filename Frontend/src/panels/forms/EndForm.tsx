import React from 'react';
import type { WorkflowNode, EndNodeData } from '../../types/workflow';

interface Props {
  node: WorkflowNode;
  updateNodeData: (data: Partial<EndNodeData>) => void;
}

export const EndForm: React.FC<Props> = ({ node, updateNodeData }) => {
  const data = node.data as EndNodeData;

  return (
    <div className="p-3 space-y-2 text-xs">
      <div className="font-semibold">End Node</div>

      <label className="block">
        <span>End message</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.endMessage ?? ''}
          onChange={(e) => updateNodeData({ endMessage: e.target.value })}
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.summaryFlag}
          onChange={(e) =>
            updateNodeData({ summaryFlag: e.target.checked })
          }
        />
        <span>Show summary at end</span>
      </label>
    </div>
  );
};
