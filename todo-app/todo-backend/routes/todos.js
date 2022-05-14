const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const current_todos = await redis.getAsync("added_todos");
  console.log("current_todos: ", current_todos)
  if (!current_todos || isNaN(current_todos)) {
    await redis.setAsync("added_todos", "1")
  } else {
    await redis.setAsync("added_todos", (parseInt(current_todos) + 1).toString())
  }
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log('body ', req.body)
  await Todo.updateOne({ _id: req.todo._id }, { text: req.body.text, done: req.body.done })

  res.status(200)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
