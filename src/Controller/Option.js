import db from '../configDB.js';

// Cria a tabela Opcao se não existir
export async function createOptionTable() {
  await db.none(`
    CREATE TABLE IF NOT EXISTS Opcao (
      id SERIAL PRIMARY KEY,
      nome TEXT,
      descricao TEXT,
      preco NUMERIC,
      imagem JSONB,
      categoriaId INTEGER REFERENCES Categoria(id)
    )
  `);
}


// Seleciona todas as opções
export async function selectOptions(req, res) {
  const options = await db.any('SELECT * FROM Opcao');
  res.json(options);
}

// Seleciona uma opção pelo id
export async function selectOption(req, res) {
  const { id } = req.body;
  const option = await db.oneOrNone('SELECT * FROM Opcao WHERE id = $1', [id]);
  res.json(option);
}

// Insere uma nova opção
export async function insertOption(req, res) {
  const { nome, categoriaId } = req.body;
  await db.none('INSERT INTO Opcao (nome, categoriaId) VALUES ($1, $2)', [nome, categoriaId]);
  res.json({
    "statusCode": 200
  });
}

// Atualiza uma opção existente
export async function updateOption(req, res) {
  const { id, nome, categoriaId } = req.body;
  await db.none('UPDATE Opcao SET nome = $1, categoriaId = $2 WHERE id = $3', [nome, categoriaId, id]);
  res.json({
    "statusCode": 200
  });
}

// Deleta uma opção pelo id
export async function deleteOption(req, res) {
  const { id } = req.body;
  await db.none('DELETE FROM Opcao WHERE id = $1', [id]);
  res.json({
    "statusCode": 200
  });
}
