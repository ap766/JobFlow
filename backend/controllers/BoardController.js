//Controllers: Controllers are responsible for handling incoming requests, processing them, and sending back appropriate responses. They act as intermediaries between the routes (which define URL endpoints) and the data model or services.


const Bd = require('../models/BoardsModel');
const mongoose = require('mongoose')

const getBoards = (req, res) => {
  Bd.find()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
}

const getBoard = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board' })
  }

  Bd.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'No such board' })
      }
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
}

const createBoard = (req, res ) => {

  const user_id = req.user._id
  const { title} = req.body
  const board = new Bd({title,user_id })

  board.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
}

const deleteBoard = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board' })
  }

  Bd.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'No such board' })
      }
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
}

const updateBoard = (req, res) => {
  const { id } = req.params
  const { title } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board' })
  }

  Bd.findByIdAndUpdate(id, { title }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'No such board' })
      }
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(400).json({ error: err.message })
    })
}

module.exports = { getBoards , getBoard , createBoard , deleteBoard , updateBoard }