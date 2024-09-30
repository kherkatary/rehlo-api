import express from 'express';
import postModel from '../models/postModel.js'; 

const allPost = async (req, res) => {
  const { limit } = req.query;

  try {
    let allPost = null;
    if (limit) {
      allPost = await postModel.find().sort({ _id: -1 }).limit(limit);
    } else {
      allPost = await postModel.find().sort({ _id: -1 });
    }

    if (!allPost || allPost.length === 0) {
      console.log("No posts available");
      return res.status(404).send({ message: "No posts found" });
    }

    return res.status(200).send({
      message: "All Posts Fetched",
      posts: allPost,
    });
  } catch (err) {
    return res.status(500).send({ message: "Error fetching posts", error: err });
  }
};

const newPost = async (req, res) => {
  const { title, author, content, cover } = req.body;

  if (!title) return res.status(400).send({ message: "Title required" });
  if (!author) return res.status(400).send({ message: "Author required" });
  if (!content) return res.status(400).send({ message: "Content required" });
  if (!cover) return res.status(400).send({ message: "Cover required" });

  try {
    const newPostFetched = await new postModel({ title, author, content, cover }).save();

    if (!newPostFetched) {
      return res.status(400).send({ message: "Post not created" });
    }

    return res.status(201).send({ message: "Post created", pid: newPostFetched._id });
  } catch (err) {
    return res.status(500).send({ message: "Error creating post", error: err });
  }
};

const getPost = async (req, res) => {
  const { pid } = req.query;

  if (!pid) return res.status(400).send({ message: "PID required" });

  try {
    const post = await postModel.findById(pid);

    if (!post) return res.status(404).send({ message: "Post with this ID not found" });

    return res.status(200).send({
      message: "Post fetched",
      post: post,
    });
  } catch (err) {
    return res.status(500).send({ message: `Error fetching the post ID: ${pid}`, error: err });
  }
};

const editPost = async (req, res) => {
  const { title, author, content, cover, pid } = req.body;

  console.log("Request Body:", req.body); // Add this line

  if (!pid) return res.status(400).send({ message: "PID required" });
  if (!title) return res.status(400).send({ message: "Title required" });
  if (!author) return res.status(400).send({ message: "Author required" });
  if (!content) return res.status(400).send({ message: "Content required" });

  try {
    const post = await postModel.findByIdAndUpdate(
      pid,
      { title, author, content, cover },
      { new: true }
    );

    if (!post) {
      return res.status(404).send({ message: "Couldn't update", success: false });
    }

    res.status(200).send({ message: "Updated", success: true, pid: post._id });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

const deletePost = async (req, res) => {
  const { pid } = req.query;
  if (!pid) return res.status(400).send({ message: "PID required" });
  try {
    const post = await postModel.findByIdAndDelete(pid);
    if (!post) return res.status(404).send({ message: "Post with this ID not found" });

    return res.status(200).send({ message: "Post deleted", success: true });

  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

export { allPost, newPost, getPost, editPost, deletePost };
