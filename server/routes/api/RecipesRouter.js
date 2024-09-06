import { Router } from "express";
import API from "../../controllers/RecipesController.js";
import multer from "multer";
const router = Router();

let storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

router.get("/", API.getRecipe);
router.get("/:id", API.findRecipe);
router.post("/add", upload, API.createNewRecipe);
router.patch("/update/:id", upload, API.updateRecipe);
router.delete("/delete/:id", API.deleteRecipe);
router.post("/addemail", API.addEmail);
router.delete("/deleteemail", API.deleteEmail);

export default router;
