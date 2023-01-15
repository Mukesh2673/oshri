import moment from 'moment';
import * as mongoose from 'mongoose';
var role = ['Admin','User'];
var gender = ['','Male','Female'];

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    default: ""
  },
  lastName:{
    type: String,
    default: ""
  },
  profilePicture:{
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: ""
  },
  alternateAddress: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  alternatePhone: {
    type: String,
    default: ""
  },
  dob:{
    type:Date,
    default:new Date("1970-01-01")
  },
  gender:{
    type: String,
    default: "Male",
    enum:gender
  },
  password: {
    type: String,
    default: ""
  },  
  userType: {
    type: String,
    default: "User",
    enum:role
  }, 
  otp: {
    type: String,
    default: ""
  },
  otpVerified: {
    type: Boolean,
    default: false
  },
  otpExipredAt:{
    type: Date,
    default:moment().add(1,'m')
  },
  forgotPasswordLink: {
    type: String,
    default: ""
  },
  linkVerified: {
    type: Boolean,
    default: false
  },
  linkExipredAt:{
    type: Date,
    default:moment().add(1,'m')
  },
  company:{
    type: String,
    default:""
  },
  role:{
    type: String,
    default:""
  },
  teams:{
    type: Array,
    default:[]
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId
  },
  updatedBy:{
    type: mongoose.Schema.Types.ObjectId
  },
  isDeleted:  {
    type: Boolean,
    default: false
  },
  isBlocked:  {
    type: Boolean,
    default: false
  },
  accessToken:{
    type: String,
    default: ""
  }
},
{timestamps:true});

userSchema.set('toJSON',{
  virtuals: false, transform: ( doc, ret, Options) => {
      delete ret.password
      delete ret.__v
      delete ret.accessToken
      //delete ret._id
  }
})

export const userModel = mongoose.model('users', userSchema);