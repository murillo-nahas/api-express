import { Router } from "express";
import { Product } from "../entities/Product";
import { IProductRepository } from "../repository/IProductRepository";

const routes = Router();

routes.post("/product", (req, res) => {
  const product: Product = req.body;

  IProductRepository.create(product, (id) => {
    if (id) {
      res.status(201).location(`/product/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

routes.get("/product", (req, res) => {
  IProductRepository.getAll((product) => res.json(product));
});

routes.get("/product/:id", (req, res) => {
  const id: number = +req.params.id;
  IProductRepository.get(id, (product) => {
    if (product) {
      res.json(product);
    } else {
      res.status(404).send();
    }
  });

  if (!id) {
    res.status(404).send();
  }
});

routes.put("/product/:id", (req, res) => {
  const id: number = +req.params.id;
  IProductRepository.put(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

routes.delete("/product/:id", (req, res) => {
  const id: number = +req.params.id;
  IProductRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default routes;
