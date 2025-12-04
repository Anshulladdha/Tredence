import type { Node, Edge } from 'reactflow';

export type NodeKind =
  | 'start'
  | 'task'
  | 'approval'
  | 'automated'
  | 'end';

export interface BaseNodeData {
  type: NodeKind;
  label: string;
}

export interface StartNodeData extends BaseNodeData {
  metadata: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole: string;
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  actionId?: string;
  params: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  endMessage?: string;
  summaryFlag: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export interface AutomationDefinition {
  id: string;
  label: string;
  params: string[];
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
