import Recipe from "../models/Recipe.js";
import Email from "../models/Email.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export default class API {
  //createNewRecipe
  static async createNewRecipe(req, res) {
    const { name, country, category, ingredients, instructions, poster } =
      req.body;

    const multerImage = req.file;
    let image = "";
    if (
      !name ||
      !country ||
      !category ||
      !ingredients ||
      !instructions ||
      !poster
    ) {
      return res.status(400).json({ message: `All fields are required` });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const uploadResult = await cloudinary.uploader.upload(multerImage.path, {
      public_id: multerImage.originalname.slice(
        0,
        multerImage.originalname.indexOf(".")
      ),
    });
    const optimizeUrl = cloudinary.url(
      multerImage.originalname.slice(0, multerImage.originalname.indexOf(".")),
      {
        fetch_format: "auto",
        quality: "auto",
      }
    );
    const autoCropUrl = cloudinary.url(
      multerImage.originalname.slice(0, multerImage.originalname.indexOf(".")),
      {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
      }
    );

    try {
      const recipe = await Recipe.create({
        name,
        country,
        category,
        ingredients,
        instructions,
        image: uploadResult.secure_url,
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

    if (!name || !country || !category || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let image = "";
    if (req.file) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.originalname.slice(
          0,
          req.file.originalname.indexOf(".")
        ),
      });
      const optimizeUrl = cloudinary.url(
        req.file.originalname.slice(0, req.file.originalname.indexOf(".")),
        {
          fetch_format: "auto",
          quality: "auto",
        }
      );
      const autoCropUrl = cloudinary.url(
        req.file.originalname.slice(0, req.file.originalname.indexOf(".")),
        {
          crop: "auto",
          gravity: "auto",
          width: 500,
          height: 500,
        }
      );

      const newArray = findRecipe.image.split("/");
      await cloudinary.uploader.destroy(
        newArray[7].slice(0, newArray[7].indexOf("."))
      );

      image = uploadResult.secure_url;
    } else {
      image = findRecipe.image;
    }

    setTimeout(async () => {
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
    }, 500);
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
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const newArray = findRecipe.image.split("/");
      await cloudinary.uploader.destroy(
        newArray[7].slice(0, newArray[7].indexOf("."))
      );

      await findRecipe.deleteOne();

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
