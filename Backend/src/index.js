import express from 'express';
import cors from 'cors';
import workflowRoutes from './routes/workflowRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'tredence-backend' });
});

app.use('/api', workflowRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Tredence backend running on http://localhost:${PORT}`);
});
