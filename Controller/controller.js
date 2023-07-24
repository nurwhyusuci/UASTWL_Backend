const e = require("express");
const expressHandler = require("express-async-handler");
const News = require("../db/model");
const jwt = require("jsonwebtoken");

const getNews = expressHandler(async (req, res) => {
    const news = await News.find();

    if (!news) {
        res.status(500).json({ error: "No news found" });
    }
    res.status(200).json(news);
});

const getOneNews = expressHandler(async (req, res) => {
    const news = await News.findById(req.params.id);

    if (!news) {
        res.status(500).json({ error: "No news found" });
    }
    res.status(200).json(news);
});

const postNews = expressHandler(async (req, res) => {
    const news = await News.insertMany({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    if (!news) {
        res.status(500).json({ message: "Nothing Posted" });
    }
    res.status(200).json(news);
});

const postOne = expressHandler(async (req, res) => {
    const { email, password } = req.body;
    const news = await News.findOne({
        email: email,
        password: password,
    });

    if (!news) {
        res.status(400).json({ "not found": "user not found" });
    }
    const token = jwt.sign({userId: news._id}, 'secret-key')
    console.log(token);
    res.status(200).json({news, token});
});

const updateNews = expressHandler(async (req, res) => {
    const news = await News.findByIdAndUpdate(
     req.params.id, 
     {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    },
    {
        new: true,
    }
  );

  if (!news) {
    res.status(500).json({ message: "No Id Matched" });
  }
  res.status(200).json(news);
});

const logout = expressHandler(async (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});

const deleteNews = expressHandler(async (req, res) => {
    const news = await News.findByIdAndDelete(
     req.params.id
  );

  if (!news) {
    res.status(500).json({ message: "No Id Matched" });
  }
  res.status(200).json(news);
});

module.exports = { getNews, postNews, updateNews, deleteNews, getOneNews, postOne, logout };