import automations from '../data/automations.json' assert { type: 'json' };
import { simulateWorkflow } from '../services/workflowSimulator.js';

export const getAutomations = (_req, res) => {
  res.json(automations);
};

export const simulate = (req, res) => {
  try {
    const graph = req.body;
    const result = simulateWorkflow(graph);
    res.json(result);
  } catch (err) {
    console.error('Simulation error:', err);
    res.status(500).json({ message: 'Simulation failed', error: err.message });
  }
};
