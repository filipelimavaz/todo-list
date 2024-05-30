CREATE DATABASE todo_db;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'in progress', 'completed')) NOT NULL,
    creation_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO todos (title, description, status, creation_date) VALUES
('Comprar mantimentos', 'Ir ao supermercado e comprar frutas, legumes e pão.', 'pending', '2024-05-01'),
('Consulta médica', 'Consulta anual com o clínico geral.', 'in progress', '2024-05-02'),
('Reunião de equipe', 'Reunião semanal com a equipe para discutir o progresso do projeto.', 'completed', '2024-05-03'),
('Pagar contas', 'Pagar a conta de luz e água.', 'pending', '2024-05-04'),
('Limpar a casa', 'Fazer uma faxina completa na casa.', 'in progress', '2024-05-05'),
('Estudar para prova', 'Estudar para a prova de matemática da próxima semana.', 'completed', '2024-05-06'),
('Enviar relatório', 'Enviar relatório mensal para o gerente.', 'pending', '2024-05-07'),
('Agendar dentista', 'Marcar consulta com o dentista para limpeza.', 'in progress', '2024-05-08'),
('Treino na academia', 'Ir à academia e fazer o treino de musculação.', 'completed', '2024-05-09'),
('Organizar escritório', 'Organizar e limpar o escritório em casa.', 'pending', '2024-05-10');