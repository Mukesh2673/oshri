import * as mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewername: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: ''
  },
  profileId: {
    type: String,
    default: '0',
  },
  star: {
    type: String,
    default: '0',
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true });

reviewSchema.set('toJSON', {
  virtuals: false, transform: (doc, ret, Options) => {
    delete ret.__v
  }
})

export const reviewModel = mongoose.model('review', reviewSchema);