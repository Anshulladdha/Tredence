Tredence – HR Workflow Designer
Architecture

This project is built using a Frontend + Mock Backend architecture.

Frontend: React + TypeScript

Workflow Canvas: React Flow (nodes, edges, drag & drop)

State Management: Zustand

Backend: Node.js + Express (mock APIs only)

The frontend is responsible for rendering and managing the workflow graph, node configuration, and workflow simulation UI.
The backend provides mock APIs to simulate real automation actions and workflow execution.

The workflow graph (nodes and edges) is maintained as a single source of truth in the frontend state store.

How to Run
Backend
cd backend
npm install
npm run dev


Backend runs on:

http://localhost:4000

Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

Design Decisions

React Flow was used to build a visual workflow editor with drag-and-drop and edge connections.

Zustand was chosen for simple and efficient global state management without boilerplate.

TypeScript with strict settings was used to ensure type-safety and scalability.

Dynamic node configuration forms allow each node type to have customizable fields.

Mock APIs simulate backend behavior without persistence or authentication, keeping the focus on frontend architecture.

The system is designed to be easily extendable with new node types or integrations.

Completed Scope

Workflow canvas with drag-and-drop support

Custom workflow nodes (Start, Task, Approval, Automated, End)

Node configuration panel

Dynamic automated action configuration from mock API

Workflow serialization and simulation

Validation and execution log display

Modular, scalable frontend architecture

What I Would Add With More Time

Import and export workflows as JSON

Undo / redo support

Visual validation indicators on nodes

Auto layout for complex workflows

Backend persistence using a database

Authentication and role-based access control

Unit and integration tests

Improved UI/UX styling
