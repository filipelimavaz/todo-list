import TodoController from "../../app/controllers/TodoController.js";
import TodoRepository from "../../app/repositories/TodoRepository.js";

jest.mock("../../app/database/connection.js", () => ({
  connectionQuery: jest.fn()
}));

jest.mock("../../app/repositories/TodoRepository.js", () => ({
  create: jest.fn()
}));

describe('Todo Store', () => {
    describe('store', () => {
        let req, res;

        beforeEach(() => {
            req = {
                body: {
                    title: 'Test To-do',
                    description: 'This is a test to-do item',
                    status: 'pending',
                    creation_date: '2024-05-29'
                }
            };

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        });

        it('should create a new to-do and return 201 status', async () => {
            TodoRepository.create.mockResolvedValue({
                id: 1,
                title: 'Test To-do',
                description: 'This is a test to-do item',
                status: 'pending',
                creation_date: '2024-05-29'
            });

            await TodoController.store(req, res);

            expect(TodoRepository.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                id: 1,
                title: 'Test To-do',
                description: 'This is a test to-do item',
                status: 'pending',
                creation_date: '2024-05-29'
            });
        });

        it('should return 404 status if pass wrong status enumeration', async () => {
            TodoRepository.create.mockRejectedValue(new Error('a nova linha da relação "todos" viola a restrição de verificação "todos_status_check"'));
        
            await TodoController.store(req, res);
        
            expect(TodoRepository.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'a nova linha da relação "todos" viola a restrição de verificação "todos_status_check"'
            });
        });

        it('should return 404 status if creation fails', async () => {
            TodoRepository.create.mockResolvedValue(null);

            await TodoController.store(req, res);

            expect(TodoRepository.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Erro. O to-do não pôde ser criado.'
            });
        });

        it('should return 404 status and error message on exception', async () => {
            TodoRepository.create.mockRejectedValue(new Error('Database error'));

            await TodoController.store(req, res);

            expect(TodoRepository.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                "error": 'Database error'
            });
        });
    });
});
