import TodoController from "../../app/controllers/TodoController.js";
import TodoRepository from "../../app/repositories/TodoRepository.js";

jest.mock("../../app/repositories/TodoRepository.js", () => ({
    create: jest.fn(),
    update: jest.fn()
}));

describe('Todo Update', () => {
    describe('update', () => {
        let req, res;

        beforeEach(() => {
            req = {
                params: { id: 1 },
                body: { title: 'Updated Title', description: 'Updated Description', status: 'completed' }
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        it('should update the todo and return status 200', async () => {
            const todo = { id: 1, title: 'Updated Title', description: 'Updated Description', status: 'completed', creation_date: '2024-04-29' };
            TodoRepository.update.mockResolvedValue(todo);

            await TodoController.update(req, res);

            expect(TodoRepository.update).toHaveBeenCalledWith(1, req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(todo);
        });

        it('should return status 404 if the todo is not found', async () => {
            TodoRepository.update.mockResolvedValue(null);

            await TodoController.update(req, res);

            expect(TodoRepository.update).toHaveBeenCalledWith(1, req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Erro. O to-do não foi encontrado.'
            });
        });

        it('should return status 404 in case of exception', async () => {
            TodoRepository.update.mockRejectedValue(new Error('Database error'));

            await TodoController.update(req, res);

            expect(TodoRepository.update).toHaveBeenCalledWith(1, req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Database error'
            });
        });
    });
});
