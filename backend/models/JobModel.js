//Former - was Boardmodel
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//schema is boardSchema
const jobSchema = new Schema({

  title: {
    type: String,
    required:true
  },

  description:{
    type: String,
    required: false
  },
  joblink:{
    type: String,
    required: false
  },
  section:{
    type: String,
    required: true
  },
  roundtiming:{
    type: Array,
    required: false
  },
  status:{
    type: String,
    required: true
  },
   user_id: {
    type: String,
    required: true
  },
  phone_number:{
    type: String,
    required: false
  
  },
  board_id:{
    type: String,
    required: true
  }

}, { timestamps: true })

//Board is gonna become Boards Collection

module.exports = mongoose.model('Job', jobSchema)