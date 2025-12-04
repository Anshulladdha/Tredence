import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { StartNodeData } from '../../../types/workflow';

export const StartNode: React.FC<NodeProps<StartNodeData>> = ({ data }) => (
  <div className="rounded-xl border px-3 py-2 bg-green-50 text-xs shadow-sm">
    <div className="font-semibold text-green-800">Start</div>
    <div className="text-[11px] text-gray-700 truncate">{data.label}</div>
    <Handle type="source" position={Position.Right} />
  </div>
);
