//controllers = instructionns


const cloudinary = require("../middleware/cloudinary");
const Order = require("../models/Order");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: "desc" }).lean();
      res.render("profile.ejs", { orders: orders, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { orders: orders });
    } catch (err) {
      console.log(err);
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.render("order.ejs", { order: order, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createOrder: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Order.create({
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        style: req.body.style,
        size: req.body.size,
        completedBy: "n/a",
        status: req.body.status
      });
      console.log("Order has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeOrder: async (req, res) => {
    try {
      await Order.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { completedBy: req.user.userName },
          $set: { status: "Done" },
          //add status: completed
        }
      );
      console.log("Likes +1");
      res.redirect(`/Order/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      // Find post by id
      let order = await Order.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(order.cloudinaryId);
      // Delete post from db
      await Order.remove({ _id: req.params.id });
      console.log("Deleted Order");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
