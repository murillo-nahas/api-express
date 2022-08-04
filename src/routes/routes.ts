import { Router } from "express";
import { Product } from "../entities/Product";

const routes = Router();

routes.post("/product", (req, res) => {
  const products: Product = req.body;

  const id = 12345;
  res.status(201).location(`/product/${id}`).send();
});

routes.get("/product", (req, res) => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Product 1 description",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Product 2 description",
    },
  ];
  res.json(products);
});

routes.get("/product/:id", (req, res) => {
  const id: number = +req.params.id;

  const products: Product = {
    id: id,
    name: `Product ${id}`,
    description: `Product description ${id}`,
  };
  res.json(products);
});

routes.put("/product/:id", (req, res) => {
  const id: number = +req.params.id;
  res.status(204).send();
});

routes.delete("/product/:id", (req, res) => {
  const id: number = +req.params.id;
  res.status(204).send();
});

export default routes;
