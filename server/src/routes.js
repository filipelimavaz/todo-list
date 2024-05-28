import { Router } from 'express'
import cors from 'cors';
import TodoController from './app/controllers/TodoController.js';

const router = Router()

router.use(cors({
    origin: 'http://localhost:5173'
}));

router.get("/todos", TodoController.index);
router.get("/todos/:id", TodoController.show);
router.post("/todos", TodoController.store);
router.put("/todos/:id", TodoController.update);
router.delete("/todos/:id", TodoController.delete);

export default router