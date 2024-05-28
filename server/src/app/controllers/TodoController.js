import TodoRepository from '../repositories/TodoRepository.js';

class TodoController {

    async index(req, res) {
        try {
            const row = await TodoRepository.findAll();
            res.status(200).json(row)
        } catch (error) {
            res.status(404).json({"error": error.message});
        }
    }

    async show(req, res) {
        try {
            const row = await TodoRepository.findById(req.params.id);
            res.status(200).json(row);
        } catch (error) {
            res.status(404).json({"error": error.message});
        }
    }

    async store(req, res) {
        try {
            const row = await TodoRepository.create(req.body)
            res.status(201).json(row);
        } catch (error) {
            res.status(404).json({"error": error.message});
        }
    }

    async update(req, res) {
        try {
            const row = await TodoRepository.update(req.params.id, req.body);
            res.status(200).json(row);
        } catch (error) {
            res.status(404).json({"error": error.message});
        }
    }

    async delete(req, res) {
        try {
            const row = await TodoRepository.delete(req.params.id)
            res.json(row.rows);
        } catch (error) {
            res.status(404).json({"error": error.message});
        }
    }
}

export default new TodoController;
