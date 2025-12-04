import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ApprovalNodeData } from '../../../types/workflow';

export const ApprovalNode: React.FC<NodeProps<ApprovalNodeData>> = ({ data }) => {
  return (
    <div className="rounded-xl border px-3 py-2 bg-yellow-50 text-xs shadow-sm">
      <div className="font-semibold text-yellow-800">Approval</div>
      <div className="text-[11px] text-gray-700 truncate">{data.label}</div>
      {data.approverRole && (
        <div className="text-[10px] text-gray-600">Role: {data.approverRole}</div>
      )}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
