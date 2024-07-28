import { createCategoryTable } from './Controller/Category.js';
import { createOptionTable } from './Controller/Option.js';
// Importe outras funções de criação de tabela conforme necessário

export async function initializeDatabase() {
  await createCategoryTable();
  await createOptionTable();
  // Chame outras funções de criação de tabela conforme necessário
}
