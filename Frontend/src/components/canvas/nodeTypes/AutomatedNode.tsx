import React from 'react';
import { Handle, Position} from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { AutomatedNodeData } from '../../../types/workflow';

export const AutomatedNode: React.FC<NodeProps<AutomatedNodeData>> = ({ data }) => {
  return (
    <div className="rounded-xl border px-3 py-2 bg-blue-50 text-xs shadow-sm">
      <div className="font-semibold text-blue-800">Automated</div>
      <div className="text-[11px] text-gray-700 truncate">{data.label}</div>

      {data.actionId && (
        <div className="text-[10px] text-gray-600">
          Action: {data.actionId}
        </div>
      )}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
