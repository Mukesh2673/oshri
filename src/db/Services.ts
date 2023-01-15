import * as mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  categoryId: {
    type: Array,
    required: true,
  },
  serviceName: {
    type: String,
    required: true
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

serviceSchema.set('toJSON', {
  virtuals: false, transform: (doc, ret, Options) => {
    delete ret.__v
  }
})

export const serviceModel = mongoose.model('service', serviceSchema);