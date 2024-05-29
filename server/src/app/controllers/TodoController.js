import TodoRepository from '../repositories/TodoRepository.js';

class TodoController {

    terms(req, res) {
        return res.json({
            message: 'Service Terms'
        });
    }

    async index(req, res) {
        try {
            const row = await TodoRepository.findAll();
            if (!row || row.length < 1) {
                throw new Error('Erro. Nenhum to-do foi encontrado.');
            }
            res.status(200).json(row)
        } catch (error) {
            res.status(404).json({'error': error.message});
        }
    }

    async show(req, res) {
        try {
            const row = await TodoRepository.findById(req.params.id);
            if (!row || row.length < 1) {
                throw new Error('Erro. O to-do não foi encontrado.');
            }
            res.status(200).json(row);
        } catch (error) {
            res.status(404).json({'error': error.message});
        }
    }

    async store(req, res) {
        try {
            const row = await TodoRepository.create(req.body)
            if (!row) {
                throw new Error('Erro. O to-do não pôde ser criado.');
            }
            res.status(201).json(row);
        } catch (error) {
            res.status(404).json({'error': error.message});
        }
    }

    async update(req, res) {
        try {
            const row = await TodoRepository.update(req.params.id, req.body);
            if (!row || row.length < 1) {
                throw new Error('Erro. O to-do não foi encontrado.');
            }
            res.status(200).json(row);
        } catch (error) {
            res.status(404).json({'error': error.message});
        }
    }

    async delete(req, res) {
        try {
            const row = await TodoRepository.delete(req.params.id)
            if (!row || row.length < 1) {
                throw new Error('Erro. O to-do não foi encontrado.');
            }
            res.status(200).json({'message': 'Todo apagado com sucesso.'});
        } catch (error) {
            res.status(404).json({'error': error.message});
        }
    }
}

export default new TodoController;
