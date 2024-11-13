import express from "express";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";
import { Like } from "typeorm";
export const router = express.Router();

router.get("", async (req, res) => {
    try {
        const filter = req.query;
        if (!("name" in filter)) {
            const tags = await Tag.find()
            if (!tags) {
                return res.status(404).json({ message: "No tags found 🤷" });
            }
            if (tags) {
                return res.status(200).json(tags);
            }
        }
    } catch {
        res.status(500).json({ message: "Error fetching tags" });
    }
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const tag = await Tag.findOneBy({ id });
        if (tag !== null) {
            res.json(tag);
        } else {
            res.status(404).json({ message: "No tag found 🤷" });
        }
    } catch {
        res.status(500).json({ message: "Error fetching tag" });
    }
});

router.post("", async (req, res) => {
    try {
        const newTag = new Tag();
        newTag.name = req.body.name;
        const errors = await validate(newTag);
        if (errors.length) {
            res.status(400).json({ message: "Invalid request", errors });
        } else {
            await newTag.save();
            res.json(newTag);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const tag = await Tag.findOneBy({ id });
        if (tag !== null) {
            await tag.remove();
            res.json({ message: `Tag ${tag.name} deleted ! 🗑️` });
        } else {
            res.status(404).json({ message: `Tag not found ! 🤷` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const tag = await Tag.findOneBy({ id });
        if (tag !== null) {
            Object.assign(tag, req.body);
            const errors = await validate(tag);
            if (errors.length) {
                res.status(400).json({ message: "Invalid request", errors });
            } else {
                await tag.save();
                res.json({ message: `Tag modified ! 💪` });
            }
        } else {
            res.status(404).json({ message: `Tag not found ! 🤷` });
        }
    } catch (err) {
        console.error({ message: ` Ads linked to this tag ! ⛔ | ${err}` });
        res.status(500).send();
    }
});