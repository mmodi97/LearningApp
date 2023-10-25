const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validator = require('validator');
const Post=require('../models/post');
const {fetchCOCD,fetchCOCDAr} =require('../fetchCOCD');

module.exports = {
  createUser: async function ({
    userInput
  }, req) {
    //   const email = args.userInput.email;

    console.log(userInput);
    const existingUser = await User.findOne({
      email: userInput.email
    });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);

    const dynamicid=await User.countDocuments();
    const student="STUXX001";
    const faculty="FACXX001";
    const business="BUSXX001";
    
    var userId="";
    if(userInput.type=='U1'){

      userId=student+(dynamicid+1).toString();

    }
    else if(userInput.type=='U2'){
      userInput.grade="";
      userId=faculty+(dynamicid+1).toString();
    }
    else if(userInput.type=='U3'){
      userInput.grade="";
      userId=business+(dynamicid+1).toString();

    }

    const user = new User({
      userid:userId,
      email: userInput.email,
      name: userInput.name,
      parentName: userInput.parentName,
      password: hashedPw,
      gender:userInput.gender,
      dob:userInput.dob,
      posts: [],
      type:userInput.type,
      mobile:userInput.mobile,
      alternatemobile:userInput.alternatemobile,
      country:userInput.country,
      grade:userInput.grade,
      badges: [],
      courses:[],
      timezone:userInput.timezone
    });
    const createdUser = await user.save();

    //createdUser.type=fetchCOCD("gender",createdUser.type);
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString()
    };
  },


  login: async function ({
    loginInput
  }, req) {
    const errors = [];

    if (!validator.isEmail(loginInput.email)) {
      errors.push({
        message: 'E-Mail is invalid.'
      });
    }
    if (
      validator.isEmpty(loginInput.password) ||
      !validator.isLength(loginInput.password, {
        min: 5
      })
    ) {
      errors.push({
        message: 'Password too short!'
      });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    //   const email = args.userInput.email;
    const existingUser = await User.findOne({
      email: loginInput.email
    });
    if (!existingUser) {
      const error = new Error('User Not exists!');
      throw error;
    }

    const isEqual = await bcrypt.compareSync(loginInput.password, existingUser.password);

    if (isEqual) {

      
      var postscust=[];
      postscust=existingUser.posts;
      const token = jwt.sign({
        userId: existingUser._id.toString(),
        email: existingUser.email
      }, 'testingtesting', {
        expiresIn: '1h'
      });
      return {
        email: existingUser.email.toString(),
        token: token.toString(),
        posts: postscust,
        gender:fetchCOCDAr("gender")
      };
    } else {

      const error = new Error('Invalid Details');
      throw error;

    }


  },

  createPost: async function({postInput},req){

    console.log(postInput);
    
    var useremail='mayank3@gmail.com';
    const existingUser = await User.findOne({
      email: useremail
    });
    const posts=existingUser.posts;

    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator:  existingUser._id
    });

    console.log(post);
    await post.save();
    posts.push(post);
    existingUser.posts=posts;
    await existingUser.save();

  
    return {
      ...post._doc,
      _id: post._id.toString()
    };
  }


};