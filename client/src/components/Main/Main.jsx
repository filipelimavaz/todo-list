import React, { useState, useEffect } from 'react';
import CreateTodo from './CreateTodo/CreateTodo';
import TodoItem from './TodoItem/TodoItem';
import EditTodo from './EditTodo/EditTodo';
import styles from './main.module.css';

const Main = ({ getSearch }) => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (getSearch) {
      const filtered = todos.filter(todo =>
        todo.title.toLowerCase().includes(getSearch.toLowerCase()) ||
        todo.description.toLowerCase().includes(getSearch.toLowerCase())
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todos);
    }
  }, [getSearch, todos]);

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${selectedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(prevTodos => prevTodos.map(todo => (todo.id === selectedTodo.id ? updatedTodo : todo)));
      handleEditClose();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (todo) => {
    await fetch(`http://localhost:5000/todos/${todo.id}`, { method: 'DELETE' });
    setTodos((prevTodos) => prevTodos.filter(t => t.id !== todo.id));
  };

  return (
    <div className={styles.main}>
      <CreateTodo onCreate={handleCreate} />
      <div className={styles.todoContainer}>
        <div className={styles.todoList}>
          <ul className={styles.mainHeader}>
            <li id={styles.title}>Titulo</li>
            <li id={styles.description}>Descrição</li>
            <li id={styles.status}>Status</li>
            <li id={styles.date}>Data</li>
            <li id={styles.edit}>Editar</li>
            <li id={styles.delete}>Deletar</li>
          </ul>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {showEditModal && (
            <EditTodo todo={selectedTodo} onUpdate={handleUpdate} onClose={handleEditClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
