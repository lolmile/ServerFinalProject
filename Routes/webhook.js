require('dotenv').config();

const express = require('express');
const router = express.Router();
const { client } = require('../database.js');
const Posts = require('../Models/Posts');

const db = client.db(process.env.DBNAME);
const postCollection = db.collection('EventPosts')

router.post("/post", async (req, res) => {

  const postBody = req.body
  
  try {
    const savedPost = new Posts({
      _id: postBody.post_id,
      title: postBody.post.post_title,
      content: postBody.post.post_content,
      taxonomies: postBody.taxonomies.post_tag,
      permaLink: postBody.post_permalink,
      eventURL: postBody.post_meta._EventURL,
      startDate: postBody.post_meta._EventStartDate,
      endDate: postBody.post_meta._EventEndDate,
    })

    console.log(savedPost)

    //Create new post
    await postCollection.insertOne(savedPost)

    res.send("Event was added to the interactive calendar!")
    res.status(200)

  } catch (e) {
    console.log(e)
    res.send("There was an error publishing the event.")
    res.status(409)
  }
})

router.post("/update", (req, res) => {

  const postBody = req.body

  res.status(200).end() // Responding is important
})

router.post("/delete", (req, res) => {

  const postBody = req.body

  if (postBody.post.post_type === "tribe_events") {
    //console.log(postBody)
  }

  res.status(200).end() // Responding is important
})

module.exports = router;