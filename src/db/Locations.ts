import * as mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    default: ""
  },
  profileNumber: {
    type: String,
    // required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
    // required: true,
  },
  status:{
    type:Boolean,
    default:false
  }

},
  { timestamps: true });

export const locationModel = mongoose.model('locations', locationSchema);