import * as mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  serviceName: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    default: '0',
  },
  images: {
    type: Array,
    default: []
  },
  categoryId: {
    type: String,
    // required: true,
  },
  tag: {
    type: String,
    // required: true
  },
  title: {
    type: String,
    // required: true
  },
  text: {
    type: String,
    default: '0',
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true });

postsSchema.set('toJSON', {
  virtuals: false, transform: (doc, ret, Options) => {
    delete ret.__v
  }
})

export const postsModel = mongoose.model('posts', postsSchema);