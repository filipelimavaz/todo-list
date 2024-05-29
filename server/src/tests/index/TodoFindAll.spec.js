import TodoController from "../../app/controllers/TodoController.js";
import TodoRepository from "../../app/repositories/TodoRepository.js";

jest.mock("../../app/repositories/TodoRepository.js", () => ({
    create: jest.fn(),
    findAll: jest.fn()
}));

describe('Todo Index', () => {
    describe('index', () => {
        let req, res;

        beforeEach(() => {
            req = {};

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        it('should return all todos with status 200', async () => {
            const todos = [
                { id: 1, title: 'Todo 1', description: 'Description 1', status: 'completed', creation_date: '2024-04-29' },
                { id: 2, title: 'Todo 2', description: 'Description 2', status: 'in progress', creation_date: '2024-05-29' }
            ];
            TodoRepository.findAll.mockResolvedValue(todos);

            await TodoController.index(req, res);

            expect(TodoRepository.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(todos);
        });

        it('should return status 404 if no todos are found', async () => {
            TodoRepository.findAll.mockResolvedValue([]);

            await TodoController.index(req, res);

            expect(TodoRepository.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Erro. Nenhum to-do foi encontrado.'
            });
        });

        it('should return status 404 in case of exception', async () => {
            TodoRepository.findAll.mockRejectedValue(new Error('Database error'));

            await TodoController.index(req, res);

            expect(TodoRepository.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Database error'
            });
        });
    });
});
