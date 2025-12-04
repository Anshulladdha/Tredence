import React from 'react';
import { Handle, Position} from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { TaskNodeData } from '../../../types/workflow';

export const TaskNode: React.FC<NodeProps<TaskNodeData>> = ({ data }) => (
  <div className="rounded-xl border px-3 py-2 bg-white text-xs shadow-sm">
    <div className="font-semibold">Task</div>
    <div className="text-[11px] text-gray-700 truncate">{data.label}</div>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </div>
);
