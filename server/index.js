const express = require('express');

const app = express();
app.use(express.json());

const db = {
  users: {
    id: 0,
    data: [],
  },
  profiles: {
    id: 0,
    data: [],
  },
  posts: {
    id: 0,
    data: [],
  },
  comments: {
    id: 0,
    data: [],
  },
};

app.set('db', db);

const comments = require('./controllers/comments.js');
const users = require('./controllers/users.js');
const profile = require('./controllers/profile.js');
const posts = require('./controllers/posts.js');

app.post('/comments', comments.create);

app.post('/signUp', users.signUp);

app.post('/posts', posts.create);
app.post('/user/:userId/posts', posts.getUserPosts);
app.post('/posts/:postId', posts.getPost);

app.get('/profile', profile.get);
app.patch('/profile/:userId', profile.update);

app.get('/debug', (req, res) => {
  res.status(200).json(req.app.get('db'))
})

const port = 1800;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})