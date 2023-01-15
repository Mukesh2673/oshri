import { boolean } from 'joi';
import * as mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  address: {
    type: String,
    default: ''
  },
answer:{
    type: String,
    default: '' 
},
category: {
    type: String,
    default: ''
},
categoryFolder:{
    type: String,
    default: ''
},
categoryImg:{
    type: String,
    default: ''
},
city: {
    type: String,
    default: '',
},
description: {
    type: String,
    default: ''
  },
email: {
    type: String,
    default: '',
  },

  expiredDate: {
    type: String,
    default:''
  },

  phone:{
    type:String,
    default:''
  },

  price:{
    type:String,
    default:''
    },
    
    question:{
        type:String,
        default:''
    },

serviceName:{
    type: String,
    default: ''
},

startDate:{
    type:String,
    default:'' 
},
subtitle:{
    type:String,
    default:''  
},
title:{
    type:String,
    default:''  
},
isDeleted:{
    type:Boolean,
    default:false 
},

},
  { timestamps: true });

  profileSchema.set('toJSON', {
  virtuals: false, transform: (doc, ret, Options) => {
    delete ret.__v
  }
})

export const profileModel = mongoose.model('profile', profileSchema);