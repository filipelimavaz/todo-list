import React from 'react';
import styles from './todoItem.module.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const formatStatus = (status) => {
  switch (status) {
    case 'in progress':
      return 'Em progresso';
    case 'completed':
      return 'Concluída';
    case 'pending':
      return 'Pendente';
    default:
      return status;
  }
};

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const { title, description, status, creation_date } = todo;

  return (
    <div className={styles.todoItem}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.status}>{formatStatus(status)}</div>
      <div className={styles.date}>{formatDate(creation_date)}</div>
      <button className={`${styles.button} ${styles.editButton}`} onClick={() => onEdit(todo)}>Editar</button>
      <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => onDelete(todo)}>Deletar</button>
    </div>
  );
};

export default TodoItem;
