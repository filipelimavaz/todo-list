import React from 'react';
import styles from './editTodo.module.css';
import TodoForm from '../TodoForm/TodoForm';
import Button from '../../Button/Button';

const EditTodo = ({ todo, onUpdate, onClose }) => {
    const defaultValues = {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        date: todo.creation_date.substr(0, 10),
    };

    const onSubmit = (data) => {
        onUpdate({ ...todo, ...data });
        onClose();
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === styles.editContainer) {
            onClose();
        }
    };

    return (
        <div className={styles.editContainer} onClick={handleOutsideClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <TodoForm onSubmit={onSubmit} defaultValues={defaultValues} />
                <Button type={"button"} onClick={onClose} className={styles.cancelButton}>Cancelar</Button>
            </div>
        </div>
    );
};

export default EditTodo;