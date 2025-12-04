import type { AutomationDefinition, WorkflowGraph } from '../types/workflow';

const API_BASE = 'http://localhost:4000/api';

export async function fetchAutomations(): Promise<AutomationDefinition[]> {
  const res = await fetch(`${API_BASE}/automations`);
  if (!res.ok) throw new Error('Failed to fetch automations');
  return res.json();
}

export interface SimulationResult {
  success: boolean;
  errors: string[];
  log: string[];
}

export async function simulateWorkflowApi(
  graph: WorkflowGraph,
): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graph),
  });

  if (!res.ok) {
    throw new Error('Simulation request failed');
  }

  return res.json();
}
