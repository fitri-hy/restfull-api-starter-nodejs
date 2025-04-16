const express = require('express');
const { addTaskToQueue } = require('../service/queue.service');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const taskData = { name };
    const jobId = await addTaskToQueue(taskData);

    res.status(200).json({
      success: true,
      message: 'Task added to queue',
      jobId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error adding task to queue',
    });
  }
});

module.exports = router;
