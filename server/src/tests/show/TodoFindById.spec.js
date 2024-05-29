import TodoController from "../../app/controllers/TodoController.js";
import TodoRepository from "../../app/repositories/TodoRepository.js";

// Mock TodoRepository with all necessary methods
jest.mock("../../app/repositories/TodoRepository.js", () => ({
    create: jest.fn(),
    findById: jest.fn()
}));

describe('Todo Show', () => {
    describe('show', () => {
        let req, res;

        beforeEach(() => {
            req = {
                params: { id: 1 }
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        it('should return the todo with status 200', async () => {
            const todo = { id: 1, title: 'Todo 1', description: 'Description 1', status: 'completed', creation_date: '2024-04-29' };
            TodoRepository.findById.mockResolvedValue(todo);

            await TodoController.show(req, res);

            expect(TodoRepository.findById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(todo);
        });

        it('should return status 404 if the todo is not found', async () => {
            TodoRepository.findById.mockResolvedValue(null);

            await TodoController.show(req, res);

            expect(TodoRepository.findById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Erro. O to-do não foi encontrado.'
            });
        });

        it('should return status 404 in case of exception', async () => {
            TodoRepository.findById.mockRejectedValue(new Error('Database error'));

            await TodoController.show(req, res);

            expect(TodoRepository.findById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Database error'
            });
        });
    });
});
