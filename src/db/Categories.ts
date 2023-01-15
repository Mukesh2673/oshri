import * as mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  profilesCount: {
    type: Number,
    // required: true,
  },
  status: {
    type: Boolean,
    // required: true,
  },
  buttons: {
    type: Boolean,
    // required: true,
  },
  serviceName: {
    type: String,
    // required: true
  },
  images: {
    type: Array,
    default: []
  },
  price: {
    type: String,
    default: '0',
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true });

categorySchema.set('toJSON', {
  virtuals: false, transform: (doc, ret, Options) => {
    delete ret.__v
  }
})

export const categoryModel = mongoose.model('categories', categorySchema);