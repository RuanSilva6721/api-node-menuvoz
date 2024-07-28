import { openDb } from '../configDB.js';

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Categoria ( id INTEGER PRIMARY KEY, nome TEXT )');
    });
}

export async function selectCategories(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM Categoria')
        .then(categories => res.json(categories));
    });
}

export async function selectCategory(req, res) {
    let id = req.body.id;
    openDb().then(db => {
        db.get('SELECT * FROM Categoria WHERE id=?', [id])
        .then(category => res.json(category));
    });
}

export async function insertCategory(req, res) {
    let category = req.body;
    openDb().then(db => {
        db.run('INSERT INTO Categoria (nome) VALUES (?)', [category.nome]);
    });
    res.json({
        "statusCode": 200
    });
}

export async function updateCategory(req, res) {
    let category = req.body;
    openDb().then(db => {
        db.run('UPDATE Categoria SET nome=? WHERE id=?', [category.nome, category.id]);
    });
    res.json({
        "statusCode": 200
    });
}

export async function deleteCategory(req, res) {
    let id = req.body.id;
    openDb().then(db => {
        db.get('DELETE FROM Categoria WHERE id=?', [id])
        .then(res => res);
    });
    res.json({
        "statusCode": 200
    });
}
