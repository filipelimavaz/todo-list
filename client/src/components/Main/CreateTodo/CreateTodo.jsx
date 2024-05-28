import React, { useState } from 'react';
import styles from './createTodo.module.css';

const CreateTodo = ({ onCreate }) => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        status: 'pending',
        creation_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            if (!response.ok) {
                throw new Error('Failed to create todo');
            }
            const newTodo = await response.json();
            onCreate(newTodo); // Chama a função onCreate com o novo todo
            setTodo({
                title: '',
                description: '',
                status: 'pending',
                creation_date: ''
            });
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={styles.input}
                        value={todo.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        className={styles.textarea}
                        value={todo.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        className={styles.select}
                        value={todo.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="pending">Pendente</option>
                        <option value="in progress">Em Progresso</option>
                        <option value="completed">Concluída</option>
                    </select>
                </div>

                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="creation_date">Data</label>
                    <input
                        type="date"
                        id="creation_date"
                        name="creation_date"
                        className={styles.input}
                        value={todo.creation_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Criar Todo</button>
            </form>
        </div>
    );
};

export default CreateTodo;
