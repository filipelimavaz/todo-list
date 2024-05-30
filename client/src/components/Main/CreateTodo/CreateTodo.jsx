import React from 'react';
import styles from './createTodo.module.css';
import TodoForm from '../TodoForm/TodoForm';

const CreateTodo = ({ onCreate }) => {
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create todo');
            }

            const responseData = await response.json();
            alert("Tarefa criada com sucesso");
            onCreate(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.createContainer}>
            <TodoForm onSubmit={onSubmit} defaultValues={null}></TodoForm>
        </div>
    );
};

export default CreateTodo;
