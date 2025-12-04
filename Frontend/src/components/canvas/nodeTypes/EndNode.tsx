import React from 'react';
import { Handle, Position} from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { EndNodeData } from '../../../types/workflow';

export const EndNode: React.FC<NodeProps<EndNodeData>> = ({ data }) => {
  return (
    <div className="rounded-xl border px-3 py-2 bg-red-50 text-xs shadow-sm">
      <div className="font-semibold text-red-800">End</div>
      <div className="text-[11px] text-gray-700 truncate">{data.label}</div>

      {data.summaryFlag && (
        <div className="text-[10px] text-gray-600">Summary Enabled</div>
      )}

      <Handle type="target" position={Position.Left} />
    </div>
  );
};
