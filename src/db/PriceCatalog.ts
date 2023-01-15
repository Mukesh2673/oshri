import * as mongoose from 'mongoose';

const priceCatalogSchema = new mongoose.Schema({
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

priceCatalogSchema.set('toJSON', {
  virtuals: false, transform: (doc, ret, Options) => {
    delete ret.__v
  }
})

export const priceCatalogModel = mongoose.model('priceCatalog', priceCatalogSchema);