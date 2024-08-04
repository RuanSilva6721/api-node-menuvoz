import db from '../configDB.js';

// Cria a tabela Opcao se não existir
export async function createOptionTable() {
  await db.none(`
    CREATE TABLE IF NOT EXISTS Opcao (
      id SERIAL PRIMARY KEY,
      nome TEXT,
      descricao TEXT,
      preco NUMERIC,
      imagem TEXT,
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
  const { nome, descricao, preco, imagem, categoriaId } = req.body;
  await db.none(
    'INSERT INTO Opcao (nome, descricao, preco, imagem, categoriaId) VALUES ($1, $2, $3, $4, $5)',
    [nome, descricao, preco, imagem, categoriaId]
  );
  res.json({
    "statusCode": 200,
    "msg": "Opção inserida com sucesso"
  });
}

// Atualiza uma opção existente
export async function updateOption(req, res) {
  const { id, nome, descricao, preco, imagem, categoriaId } = req.body;
  await db.none(
    'UPDATE Opcao SET nome = $1, descricao = $2, preco = $3, imagem = $4, categoriaId = $5 WHERE id = $6',
    [nome, descricao, preco, imagem, categoriaId, id]
  );
  res.json({
    "statusCode": 200,
    "msg": "Opção atualizada com sucesso"
  });
}

// Deleta uma opção pelo id
export async function deleteOption(req, res) {
  const { id } = req.body;
  await db.none('DELETE FROM Opcao WHERE id = $1', [id]);
  res.json({
    "statusCode": 200,
    "msg": "Opção deletada com sucesso"
  });
}
export async function selectOptionsByCategory(req, res) {
  const { categoriaId } = req.body;
  const options = await db.any('SELECT * FROM Opcao WHERE categoriaId = $1', [categoriaId]);
  res.json(options);
}