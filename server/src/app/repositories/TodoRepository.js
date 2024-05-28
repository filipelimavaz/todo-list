import { connectionQuery } from '../database/connection.js';

class TodoRepository {
    async create(todo) {
        const { title, description, status, creation_date } = todo;
        const sql = "INSERT INTO todos (title, description, status, creation_date) VALUES ($1, $2, $3, COALESCE($4, CURRENT_TIMESTAMP)) RETURNING *";
        return await connectionQuery(sql, [title, description, status, creation_date], "Error creating todo");
    }

    async findAll() {
        const sql = "SELECT * FROM todos";
        return await connectionQuery(sql, [], "Error retrieving all todos");
    }

    async findById(id) {
        const sql = "SELECT * FROM todos WHERE id = $1";
        return await connectionQuery(sql, [id], "Error retrieving todo by id");
    }

    async update(id, todo) {
        const { title, description, status, creation_date } = todo;
        const sql = "UPDATE todos SET title = $1, description = $2, status = $3, creation_date = $4 WHERE id = $5 RETURNING *";
        return await connectionQuery(sql, [title, description, status, creation_date, id], "Error updating todo");
    }

    async delete(id) {
        const sql = "DELETE FROM todos WHERE id = $1 RETURNING *";
        return await connectionQuery(sql, [id], "Error deleting todo");
    }
}

export default new TodoRepository();
