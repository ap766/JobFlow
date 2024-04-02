const express = require('express')
const { 
  
  getJobs,
  createJob,
  deleteJob,
  updateJob
} = require('../controllers/JobController')

 
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// require auth for all routes
router.use(requireAuth)

//router.get('/', getJobs)

// GET a single workout
router.get('/:id', getJobs)

// POST a new workout
router.post('/', createJob)

// DELETE a workout
router.delete('/:id', deleteJob)

// UPDATE a workout
router.patch('/:id', updateJob)

module.exports = router