import { Router } from 'express';
import { selectCategories, selectCategory, insertCategory, updateCategory, deleteCategory } from './Controller/Category.js';
import { selectOptions, selectOption, insertOption, updateOption, deleteOption } from './Controller/Option.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    });
});

router.get('/database', async (req, res) => {
    try {
        await initializeDatabase();
        res.json({
            "statusCode": 200,
            "msg": "Tabelas criadas/atualizadas com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            "statusCode": 500,
            "msg": "Erro ao criar/atualizar tabelas",
            "error": error.message
        });
    }
});

// Rotas para Categorias
router.get('/categories', selectCategories);
router.get('/category', selectCategory);
router.post('/category', insertCategory);
router.put('/category', updateCategory);
router.delete('/category', deleteCategory);

// Rotas para Opções
router.get('/options', selectOptions);
router.get('/option', selectOption);
router.post('/option', insertOption);
router.put('/option', updateOption);
router.delete('/option', deleteOption);

export default router;