import { create } from 'zustand';
import type {
  WorkflowNode,
  WorkflowEdge,
  AutomationDefinition,
  NodeKind,
  WorkflowGraph,
} from '../types/workflow';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId?: string;

  automations: AutomationDefinition[];
  loadingAutomations: boolean;
  automationsError?: string;

  simulationLog: string[];
  simulationErrors: string[];
  simulationRunning: boolean;

  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  selectNode: (id?: string) => void;

  setAutomations: (a: AutomationDefinition[]) => void;
  setSimulationState: (partial: Partial<WorkflowState>) => void;

  asGraph: () => WorkflowGraph;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: undefined,

  automations: [],
  loadingAutomations: false,
  automationsError: undefined,

  simulationLog: [],
  simulationErrors: [],
  simulationRunning: false,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  selectNode: (selectedNodeId) => set({ selectedNodeId }),

  setAutomations: (automations) => set({ automations }),

  setSimulationState: (partial) => set(partial),

  asGraph: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },
}));

// helper: default node data for each type
export function defaultNodeData(kind: NodeKind) {
  switch (kind) {
    case 'start':
      return {
        type: 'start' as const,
        label: 'Start',
        metadata: {},
      };
    case 'task':
      return {
        type: 'task' as const,
        label: 'Task',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: {},
      };
    case 'approval':
      return {
        type: 'approval' as const,
        label: 'Approval',
        approverRole: '',
        autoApproveThreshold: undefined,
      };
    case 'automated':
      return {
        type: 'automated' as const,
        label: 'Automated Step',
        actionId: undefined,
        params: {},
      };
    case 'end':
      return {
        type: 'end' as const,
        label: 'End',
        endMessage: '',
        summaryFlag: true,
      };
  }
}
