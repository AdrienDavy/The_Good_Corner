import express from "express";
import { Ad } from "../entities/Ad";
import { validate } from "class-validator";
import { Category } from "../entities/Category";
export const router = express.Router();

router.get("", async (req, res) => {
  try {
    const ads = await Ad.find({
      relations: { category: true },
    });
    if (Ad !== null) {
      res.json(ads);
    } else {
      res.status(404).json({ message: `No ads found ! 🤷` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  };
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOne({
      where: { id }, relations: {
        category: true
      }
    });
    if (ad !== null) {
      return res.json(ad);
    }
    return res.status(404).json({ message: `Ad not found ! 🤷` });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("", async (req, res) => {
  try {
    const newAd = new Ad();

    // ça
    Object.assign(newAd, req.body);
    // OU
    // newAd.title = req.body.title;
    // newAd.description = req.body.description;
    // newAd.owner = req.body.owner;
    // newAd.price = req.body.price;
    // newAd.picture = req.body.picture;
    // newAd.location = req.body.location;
    // newAd.categoryId = req.body.categoryId;
    // newAd.createdAt = req.body.createdAt;
    const errors = await validate(newAd);
    if (errors.length) {
      res.status(400).json(errors);
    } else {
      await newAd.save();
      res.json(newAd);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      await ad.remove();
      res.json({ message: `Category ${ad.title} deleted ! 🗑️` });
    } else {
      res.status(404).json({ message: `Ad not found ! 🤷` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// router.put("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const entries = Object.keys(req.body);
//   let newEntries = '';
//   for (let i = 0; i < entries.length; i++) {
//     newEntries += `${entries[i]} = ?`;
//     if (i < entries.length - 1) {
//       newEntries += `, `;
//     }
//   }
//   console.log(newEntries);

//   db.run(`UPDATE ad SET ${newEntries} WHERE id = ?`, [...Object.values(req
//     .body), id], () => {
//       res.status(204).send();
//     }
//   );
// });


// le router.put là il faut changer en router.patch puis *
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      const newAd = new Ad();
      Object.assign(newAd, req.body, { id: ad.id, createdAt: ad.createdAt });
      const errors = await validate(newAd);
      if (errors.length) {
        res.status(400).json(errors);
      } else {
        await newAd.save();
        res.json({ message: `Ad modified ! 💪` });
        res.json(newAd);
      }
    } else {
      res.status(404).json({ message: `Ad not found ! 🤷` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
  // db.run(
  //   `UPDATE ad SET 
  //   title=?,
  //   description=?,
  //   owner=?,
  //   price=?,
  //   picture=?,
  //   location=?,
  //   categoryId=?
  //   WHERE id=?
  //   `,
  //   [
  //     req.body.title,
  //     req.body.description,
  //     req.body.owner,
  //     req.body.price,
  //     req.body.picture,
  //     req.body.location,
  //     req.body.categoryId,
  //     id,
  //   ],
  //   () => {
  //     res.status(204).send();
  //   }
  // );
});



router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      Object.assign(ad, req.body);
      const errors = await validate(ad);
      if (errors.length) {
        res.status(400).json(errors);
      } else {
        await ad.save();
        res.json({ message: `Ad modified ! 💪` });
        res.json(ad);
      }
    } else {
      res.status(404).json({ message: `Ad not found ! 🤷` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
// partial edit
// router.patch("/:id", (req, res) => {
//   const id = Number(req.params.id);

//   let sqlQuery = "UPDATE ad SET ";
//   const params: (string | number)[] = [];


//   const bodyKeys = Object.keys(req.body);

//   for (const key of bodyKeys) {
//     if (["id", "createdAt"].includes(key) === false) {
//       sqlQuery += `${key}=?, `;
//       params.push(req.body[key]);
//     }
//   }

//   sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2) + " WHERE id=?";
//   params.push(id);
// });