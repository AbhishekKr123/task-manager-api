const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(err);
  }
});
//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true' ? true : false;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    //const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate;
    if (!tasks) {
      return res.status(404).send('Task Not Found');
    }
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(err);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    //const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send('Task Not Found');
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(item => allowedUpdates.includes(item));
  if (!isValidOperation) {
    return res.status(400).send('Invalid Updates');
  }
  try {
    const task = await Task.findOne({
      _id: req.params._id,
      owner: req.user._id
    });

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findByIdAndDelete(_id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user_id
    });
    if (!user) {
      return res.status(404).send('Not Found');
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
