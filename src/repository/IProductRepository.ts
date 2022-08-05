import { db } from "../database/db";
import { Product } from "../entities/Product";

const IProductRepository = {
  create: (product: Product, callback: (id?: number) => void) => {
    const sql = "INSERT INTO product (name, description) VALUES (?,?)";

    const params = [product.name, product.description];

    db.run(sql, params, function (err) {
      callback(this?.lastID);
    });
  },

  get: (id: number, callback: (product?: Product) => void) => {
    const sql = "SELECT * FROM product WHERE id = ?";
    const params = [id];
    db.get(sql, params, (_err, row) => callback(row));
  },

  getAll: (callback: (product: Product[]) => void) => {
    const sql = "SELECT * FROM product";
    const params: any[] = [];
    db.all(sql, params, (err, rows) => callback(rows));
  },

  put: (
    id: number,
    product: Product,
    callback: (notFound: boolean) => void
  ) => {
    const sql = "UPDATE product SET name = ?, description = ? WHERE id = ?";
    const params = [product.name, product.description, id];
    db.run(sql, params, function (err) {
      callback(this.changes === 0);
    });
  },

  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM product WHERE id = ?";
    const params = [id];
    db.run(sql, params, function (err) {
      callback(this.changes === 0);
    });
  },
};

export { IProductRepository };
