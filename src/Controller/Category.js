import db from '../configDB.js';

export async function createCategoryTable() {
  await db.none('CREATE TABLE IF NOT EXISTS Categoria ( id SERIAL PRIMARY KEY, nome TEXT )');
}

export async function selectCategories(req, res) {
  const categories = await db.any('SELECT * FROM Categoria');
  res.json(categories);
}

export async function selectCategory(req, res) {
  const { id } = req.body;
  const category = await db.oneOrNone('SELECT * FROM Categoria WHERE id = $1', [id]);
  res.json(category);
}

export async function insertCategory(req, res) {
  const { nome } = req.body;
  await db.none('INSERT INTO Categoria (nome) VALUES ($1)', [nome]);
  res.json({ "statusCode": 200 });
}

export async function updateCategory(req, res) {
  const { id, nome } = req.body;
  await db.none('UPDATE Categoria SET nome = $1 WHERE id = $2', [nome, id]);
  res.json({ "statusCode": 200 });
}

export async function deleteCategory(req, res) {
  const { id } = req.body;
  await db.none('DELETE FROM Categoria WHERE id = $1', [id]);
  res.json({ "statusCode": 200 });
}
