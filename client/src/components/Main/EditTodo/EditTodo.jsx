import React, { useState } from 'react';
import styles from './editTodo.module.css';

const EditTodo = ({ todo, onUpdate, onClose }) => {
    const [editedTodo, setEditedTodo] = useState({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        creation_date: todo.creation_date.substr(0, 10)
    });    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editedTodo);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Edit Todo</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formField}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedTodo.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedTodo.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={editedTodo.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="creation_date">Creation Date:</label>
                        <input
                            type="date"
                            id="creation_date"
                            name="creation_date"
                            value={editedTodo.creation_date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTodo;
