import express from "express";
import { Category } from "../entities/Category";
import { validate } from "class-validator";
export const router = express.Router();

router.get("", async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories !== null) {
            res.json(categories);
        } else {
            res.status(404).json({ message: "No categories found 🤷" });
        }
    } catch {
        res.status(500).json({ message: "Error fetching categories" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const category = await Category.findOne({
            where: { id }, relations: {
                ads: true,
            }
        });
        if (category !== null) {
            res.json(category);
        } else {
            res.status(404).json({ message: "No category found 🤷" });
        }
    } catch {
        res.status(500).json({ message: "Error fetching category" });
    }
});

router.post("", async (req, res) => {
    try {
        const newCategory = new Category();
        newCategory.name = req.body.name;
        const errors = await validate(newCategory);
        if (errors.length) {
            res.status(400).json({ message: "Invalid request", errors });
        } else {
            await newCategory.save();
            res.json(newCategory);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const category = await Category.findOneBy({ id });
        if (category !== null) {
            await category.remove();
            res.json({ message: `Category ${category.name} deleted ! 🗑️` });
        } else {
            res.status(404).json({ message: `Category not found ! 🤷` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const category = await Category.findOneBy({ id });
        if (category !== null) {
            Object.assign(category, req.body);
            const errors = await validate(category);
            if (errors.length) {
                res.status(400).json({ message: "Invalid request", errors });
            } else {
                await category.save();
                res.json({ message: `Category modified ! 💪` });
            }
        } else {
            res.status(404).json({ message: `Category not found ! 🤷` });
        }
    } catch (err) {
        console.error({ message: ` Ads linked to this category ! ⛔ | ${err}` });
        res.status(500).send();
    }
});