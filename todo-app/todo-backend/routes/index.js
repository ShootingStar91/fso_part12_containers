const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

router.get('/statistics', async (req, res) => {
  const stats = await redis.getAsync("added_todos")
  if (!stats || isNaN(stats)) {
    return res.json({added_todos: 0})
  }
  res.json({added_todos: parseInt(stats)});
});

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
    extra: "extra field"
  });
});

module.exports = router;
