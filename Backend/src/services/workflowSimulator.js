import automations from '../data/automations.json' assert { type: 'json' };

export function validateWorkflow(graph) {
  const errors = [];

  if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
    errors.push('Invalid graph format: nodes or edges missing.');
    return { isValid: false, errors };
  }

  const startNodes = graph.nodes.filter((n) => n.data?.type === 'start');
  const endNodes = graph.nodes.filter((n) => n.data?.type === 'end');

  if (startNodes.length === 0) errors.push('At least one Start Node is required.');
  if (startNodes.length > 1) errors.push('Only one Start Node is allowed.');
  if (endNodes.length === 0) errors.push('At least one End Node is required.');

  // simple connectivity check: every non-start node must have at least one incoming edge
  const incomingByNode = {};
  graph.edges.forEach((e) => {
    incomingByNode[e.target] = true;
  });

  graph.nodes.forEach((node) => {
    if (node.data?.type !== 'start' && !incomingByNode[node.id]) {
      errors.push(`Node "${node.data?.label || node.id}" has no incoming connection.`);
    }
  });

  const isValid = errors.length === 0;
  return { isValid, errors };
}

export function simulateWorkflow(graph) {
  const { isValid, errors } = validateWorkflow(graph);
  const log = [];

  if (!isValid) {
    return {
      success: false,
      errors,
      log,
    };
  }

  const nodeById = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
  const outgoing = {};
  graph.edges.forEach((e) => {
    if (!outgoing[e.source]) outgoing[e.source] = [];
    outgoing[e.source].push(e.target);
  });

  const start = graph.nodes.find((n) => n.data?.type === 'start');
  const queue = [start.id];
  const visited = new Set();

  while (queue.length) {
    const currentId = queue.shift();
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = nodeById[currentId];
    if (!node) continue;

    const base = `${node.data?.type?.toUpperCase()} – ${node.data?.label || node.id}`;

    switch (node.data?.type) {
      case 'start':
        log.push(`Start workflow at: ${base}`);
        break;
      case 'task':
        log.push(`Execute human task: ${base} (assignee: ${node.data.assignee || 'N/A'})`);
        break;
      case 'approval':
        log.push(
          `Approval step: ${base} (role: ${node.data.approverRole || 'N/A'}, threshold: ${
            node.data.autoApproveThreshold ?? 'none'
          })`,
        );
        break;
      case 'automated': {
        const action = automations.find((a) => a.id === node.data.actionId);
        const actionLabel = action?.label || node.data.actionId || 'Unknown action';
        log.push(`Automated step: ${base} → ${actionLabel}`);
        break;
      }
      case 'end':
        log.push(`End workflow at: ${base} (summary: ${node.data.summaryFlag ? 'yes' : 'no'})`);
        break;
      default:
        log.push(`Visit node: ${base}`);
    }

    (outgoing[currentId] || []).forEach((nextId) => queue.push(nextId));
  }

  return {
    success: true,
    errors: [],
    log,
  };
}
