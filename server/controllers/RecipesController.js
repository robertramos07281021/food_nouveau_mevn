import Recipe from "../models/Recipe.js";
import Email from "../models/Email.js";
import fs from "fs";

export default class API {
  //createNewRecipe
  static async createNewRecipe(req, res) {
    const { name, country, category, ingredients, instructions, poster } =
      req.body;
    const image = req.file.filename;
    if (
      !name ||
      !country ||
      !category ||
      !ingredients ||
      !instructions ||
      !image ||
      !poster
    ) {
      return res.status(400).json({ message: `All fields are required` });
    }
    try {
      const recipe = await Recipe.create({
        name,
        country,
        category,
        ingredients,
        instructions,
        image,
        poster,
      });
      return res.status(200).json({ success: "Recipes created.", recipe });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //getAllRecipe
  static async getRecipe(req, res) {
    const withQuery = req.query.poster;
    if (Boolean(withQuery)) {
      const recipes = await Recipe.find({ poster: { $eq: withQuery } });
      return res.status(200).json({ recipes });
    } else {
      const recipes = await Recipe.find();
      return res.status(200).json({ recipes });
    }
  }

  //updateRecipe
  static async updateRecipe(req, res) {
    const { id } = req.params;
    const { name, country, category, ingredients, instructions } = req.body;
    const findRecipe = await Recipe.findById(id);

    if (!findRecipe) {
      return res.status(400).json({ message: "Recipes not exists." });
    }

    let image = "";
    if (req.file) {
      image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + findRecipe.image);
      } catch (err) {
        console.log(err);
      }
    } else {
      image = findRecipe.image;
    }

    if (!name || !country || !category || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      await findRecipe.updateOne({
        name,
        country,
        category,
        ingredients,
        instructions,
        image,
      });
      return res.status(200).json({ success: "Recipe updated." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //findRecipe
  static async findRecipe(req, res) {
    const { id } = req.params;
    const findRecipe = await Recipe.findById(id);
    if (!findRecipe) {
      return res.status(400).json({ message: "Recipe not exists." });
    } else {
      return res.status(200).json(findRecipe);
    }
  }

  //deleteRecipe
  static async deleteRecipe(req, res) {
    const { id } = req.params;
    const findRecipe = await Recipe.findById(id);
    if (!findRecipe) {
      return res.status(400).json({ message: "Recipes not exists." });
    }
    try {
      await findRecipe.deleteOne();
      fs.unlinkSync("./uploads/" + findRecipe.image);
      res.status(200).json({ success: "Recipe deleted." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addEmail(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "no email" });
    }
    const exist = await Email.find({ email: { $eq: email } });

    if (exist.length > 0) {
      return res.status(400).json({ message: "email exists." });
    }

    try {
      const addEmail = await Email.create({
        email,
      });
      return res.status(200).json({ success: "Successfully add email" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteEmail(req, res) {
    try {
      const deleteAllEmail = await Email.deleteMany({});
      return res.status(200).json({ success: "Successfully delete all email" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
