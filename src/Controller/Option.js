import { openDb } from '../configDB.js';

// Cria a tabela Opcao se não existir
export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Opcao ( id INTEGER PRIMARY KEY, nome TEXT, categoriaId INTEGER, FOREIGN KEY(categoriaId) REFERENCES Categoria(id) )')
    })
}

// Seleciona todas as opções
export async function selectOptions(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Opcao')
        .then(options => res.json(options))
    });
}

// Seleciona uma opção pelo id
export async function selectOption(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Opcao WHERE id=?', [id])
        .then(option => res.json(option));
    });
}

// Insere uma nova opção
export async function insertOption(req, res){
    let option = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Opcao (nome, categoriaId) VALUES (?,?)', [option.nome, option.categoriaId]);
    });
    res.json({
        "statusCode": 200
    })
}

// Atualiza uma opção existente
export async function updateOption(req, res){
    let option = req.body;
    openDb().then(db=>{
        db.run('UPDATE Opcao SET nome=?, categoriaId=? WHERE id=?', [option.nome, option.categoriaId, option.id]);
    });
    res.json({
        "statusCode": 200
    })
}

// Deleta uma opção pelo id
export async function deleteOption(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Opcao WHERE id=?', [id])
        .then(res => res)
    });
    res.json({
        "statusCode": 200
    })
}
