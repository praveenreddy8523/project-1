import sequelize from "./database.js";

export class DatabaseContext {
  constructor() {
    this.db = sequelize;
  }

  async execute(queryFunc) {
    const transaction = await this.db.transaction();
    try {
      const result = await queryFunc(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      console.error("DB Transaction Error:", error);
      throw error;
    }
  }
}

export const dbContext = new DatabaseContext();
