const express = require("express");
const User = require("./user.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({createdAt: -1}).lean();
    if (users == "") {
      return res.status(404).json({
        message: "You are yet to create data",
        request: {
          type: "POST",
          url: "https://zuri-data.herokuapp.com/"
        }
      });
    }
    res.status(200).json({
      data: users.map(user => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          country: user.country,
          request: {
            type: "GET",
            url: "https://zuri-data.herokuapp.com/" + user._id
          }
        }
      })
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.message});
  }
});

router.post(`/`, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({email: req.body.email});
      if (user) {
        return res.status(409).json({message:"A user with this email already exists"});
      } else {
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            country: req.body.country
          });
          await user.save();
          res.status(201).json({
            message: `Data successfully created on ${user.createdAt}`,
            data: {
              id: user._id,
              name: user.name,
              email: user.email,
              country: user.country
            },
            request: {
              type: "GET",
              url: "https://zuri-data.herokuapp.com/" + user._id
            }
          });
        }

  } catch (err) {
      console.log(err);
      res.status(500).json({error: err.message});
  }

});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById({_id: req.params.id});

    if (user == "") {
      return res.status(404).json({message: "No valid user found"});
    }
    return res.status(200).json({
      message: "Data fetched successfully",
      data: {
        name: user.name,
        email: user.email,
        country: user.country
      }
    });
  } catch (err) {
      res.status(500).json({message: err});
  }

});

router.put("/:id", async (req, res) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const user = await User.findByIdAndUpdate({_id:req.params.id}, { $set: updateOps}, { returnOriginal: false });
    if (user == null) {
     return res.status(400).json({ message: "failed to update profile!" });
    }
    return res.status(200).json({
      message: `Data successfully updated on ${user.updatedAt}`,
      updatedData: {
        name: user.name,
        email: user.email,
        country: user.country
      },
      request: {
        type: "GET",
        url: "https://zuri-data.herokuapp.com/" + user._id
      }
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }

});


router.delete("/:id", async (req, res) => {
  try {
    const user = await User.deleteOne({_id: req.params.id});
    return res.status(200).json({
        message: "data deleted!"
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({message:"Data with this id does not exist!"});
    } else {
    res.status(500).json({message: err.message});
      }
  }

});

module.exports = router;
