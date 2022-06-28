const Product = require("../models/Product");
const User = require("../models/User");

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el producto" });
    }
  },
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const products = await Product.find()
        .populate("reviews.userId")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(products);
    } catch (error) {
      console.error(error);
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(req.params._id);
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getProductsByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Busqueda demasiado larga");
      }
      const name = new RegExp(req.params.name, "i");
      const product = await Product.find({ name });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    try {
      const product = await Product.deleteOne({ _id: req.params._id });
      //   const product = await Product.findByIdAndDelete(req.params._id);
      res.send({ product, message: "Product deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "there was a problem trying to remove the publication",
      });
    }
  },
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.send({ message: "product successfully updated", product });
    } catch (error) {
      console.error(error);
    }
  },
  async insertComment(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,
        { $push: { reviews: { ...req.body, userId: req.user._id } } },
        { new: true }
      );
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your review" });
    }
  },
  async like(req, res) {
    try {
      const existProduct = await Product.findById(req.params._id)
      if (!existProduct.likes.includes(req.user._id)){
        const product = await Product.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
  
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { wishList: req.params._id } },
          { new: true }
        );
        res.send(product);
      }
      else {
        res.status(400).send({message: 'Crack ya le has dado al like :('})
      }


    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
    }
  },
};
module.exports = ProductController;
