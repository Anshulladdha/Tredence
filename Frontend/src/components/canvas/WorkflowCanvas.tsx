import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';
import type { Connection,OnNodesChange,OnEdgesChange, NodeMouseHandler,} from 'reactflow';

import { useWorkflowStore } from '../../store/workflowStore';
import type { WorkflowNode, WorkflowEdge,NodeKind } from '../../types/workflow';
import { StartNode } from './nodeTypes/StartNode';
import { TaskNode } from './nodeTypes/TaskNode';
import { ApprovalNode } from './nodeTypes/ApprovalNode';
import { AutomatedNode } from './nodeTypes/AutomatedNode';
import { EndNode } from './nodeTypes/EndNode';
import { NODE_DRAG_TYPE } from '../../constants/dragTypes';
import { defaultNodeData } from '../../store/workflowStore';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export const WorkflowCanvas: React.FC = () => {
  const { nodes, edges, setNodes, setEdges, selectNode } = useWorkflowStore();
  const reactFlowInstance = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes) as WorkflowNode[]),
    [nodes, setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edges) as WorkflowEdge[]),
    [edges, setEdges],
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges(addEdge({ ...connection }, edges) as WorkflowEdge[]),
    [edges, setEdges],
  );

const onNodeClick: NodeMouseHandler = (_event, node) => {
    selectNode(node.id);
  };

  const onPaneClick = () => selectNode(undefined);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData(NODE_DRAG_TYPE) as NodeKind;
    if (!type) return;

    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const newNode: WorkflowNode = {
      id: crypto.randomUUID(),
      type,
      position,
      data: defaultNodeData(type),
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <div ref={wrapperRef} className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
