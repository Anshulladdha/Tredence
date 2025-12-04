import React from 'react';
import type { ChangeEvent } from 'react';
import type { WorkflowNode, ApprovalNodeData } from '../../types/workflow';

interface Props {
  node: WorkflowNode;
  updateNodeData: (data: Partial<ApprovalNodeData>) => void;
}

export const ApprovalForm: React.FC<Props> = ({ node, updateNodeData }) => {
  const data = node.data as ApprovalNodeData;

  const onChange =
    (field: keyof ApprovalNodeData) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      updateNodeData({ [field]: e.target.value });
    };

  return (
    <div className="p-3 space-y-2 text-xs">
      <div className="font-semibold">Approval Node</div>

      <label className="block">
        <span>Title</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.label}
          onChange={onChange('label')}
        />
      </label>

      <label className="block">
        <span>Approver Role</span>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          placeholder="Manager / HRBP / Director"
          value={data.approverRole}
          onChange={onChange('approverRole')}
        />
      </label>

      <label className="block">
        <span>Auto-approve threshold</span>
        <input
          type="number"
          className="mt-1 w-full border rounded px-2 py-1"
          value={data.autoApproveThreshold ?? ''}
          onChange={(e) =>
            updateNodeData({
              autoApproveThreshold: e.target.value
                ? Number(e.target.value)
                : undefined,
            })
          }
        />
      </label>
    </div>
  );
};
