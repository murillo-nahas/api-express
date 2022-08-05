import { db } from "../database/db";
import { Product } from "../entities/Product";

const IProductRepository = {
  create: (product: Product, func: (id?: number) => void) => {
    const sql = "INSERT INTO product (name, description) VALUES (?,?)";

    const params = [product.name, product.description];

    db.run(sql, params, function (err) {
      func(this?.lastID);
    });
  },

  get: (id: number, func: (product?: Product) => void) => {
    const sql = "SELECT * FROM product WHERE id = ?";
    const params = [id];
    db.get(sql, params, (_err, row) => func(row));
  },

  getAll: (func: (product: Product[]) => void) => {
    const sql = "SELECT * FROM product";
    const params: any[] = [];
    db.all(sql, params, (err, rows) => func(rows));
  },

  put: (id: number, product: Product, func: (notFound: boolean) => void) => {
    const sql = "UPDATE product SET name = ?, description = ? WHERE id = ?";
    const params = [product.name, product.description, id];
    db.run(sql, params, function (err) {
      func(this.changes === 0);
    });
  },

  delete: (id: number, func: (notFound: boolean) => void) => {
    const sql = "DELETE FROM product WHERE id = ?";
    const params = [id];
    db.run(sql, params, function (err) {
      func(this.changes === 0);
    });
  },
};

export { IProductRepository };
