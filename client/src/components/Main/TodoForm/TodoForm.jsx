import React from 'react';
import { useForm } from "react-hook-form";
import styles from './todoForm.module.css';
import Button from '../../Button/Button';

const TodoForm = ({ onSubmit, defaultValues = {} }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    return (
        <>
            <h2>{defaultValues ? "Atualizar Tarefa" : "Criar Tarefa"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label>Título</label>
                    <input
                        className={errors?.title && styles.inputError}
                        type="text"
                        placeholder="Título da tarefa"
                        {...register("title", { required: true })}
                    />
                    {errors?.title?.type === "required" && (
                        <p className={styles.errorMessage}>O título é obrigatório.</p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label>Descrição</label>
                    <textarea
                        className={errors?.description && styles.inputError}
                        placeholder="Descrição da tarefa"
                        {...register("description", { required: true })}
                    />
                    {errors?.description?.type === "required" && (
                        <p className={styles.errorMessage}>A descrição é obrigatória.</p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                        className={errors?.status && styles.inputError}
                        {...register("status", { validate: (value) => value !== "0" })}
                    >
                        <option value="0">Selecione uma opção</option>
                        <option value="pending">Pendente</option>
                        <option value="in progress">Em Progresso</option>
                        <option value="completed">Concluída</option>
                    </select>
                    {errors?.status?.type === "validate" && (
                        <p className={styles.errorMessage}>O status é obrigatório.</p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label>Data</label>
                    <input
                        className={errors?.date && styles.inputError}
                        type="date"
                        {...register("date")}
                    />
                </div>

                <div className={styles.formGroup}>
                    <Button type={"submit"}>{defaultValues ? "Atualizar Tarefa" : "Criar Tarefa"}</Button>
                </div>
            </form>
        </>

    );
};

export default TodoForm;
