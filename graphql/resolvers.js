const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validator = require('validator');
const Post=require('../models/post');
const {fetchCOCD,fetchCOCDAr} =require('../fetchCOCD');
const PrimCourse=require('../models/primaryCourse');
const SecCourse=require('../models/SecCourses');
const Enquiry=require('../models/Inquiry');
const Lead=require('../models/Leads');
module.exports = {

  //User Account Related 
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
 //User Account Related 
  // createPost: async function({postInput},req){

  //   console.log(postInput);
    
  //   var useremail='mayank3@gmail.com';
  //   const existingUser = await User.findOne({
  //     email: useremail
  //   });
  //   const posts=existingUser.posts;

  //   const post = new Post({
  //     title: postInput.title,
  //     content: postInput.content,
  //     imageUrl: postInput.imageUrl,
  //     creator:  existingUser._id
  //   });

  //   console.log(post);
  //   await post.save();
  //   posts.push(post);
  //   existingUser.posts=posts;
  //   await existingUser.save();

  
  //   return {
  //     ...post._doc,
  //     _id: post._id.toString()
  //   };
  // }


  //Primary Course Creation
  createPrimaryCourse: async function ({
    courseInput
  }, req) {
   
    console.log(courseInput);
    const dynamicid=await PrimCourse.countDocuments();
    const course="PROG001";

    
    var courseId="";
   
    courseId=course+(dynamicid+1).toString();

    const program = new PrimCourse({
      courseId:courseId,
      title:courseInput.title,
      description:courseInput.description,
      enrolledStudents:courseInput.enrolledStudents,
      totalClasses:courseInput.totalClasses,
      price:courseInput.price,
      publishedDate:courseInput.publishedDate,
      reviews:[],
      resources:[]
    });
    const createdProgram = await program.save();

    return {
      ...createdProgram._doc,
      _id: createdProgram._id.toString()
    };
  },


  //Secondry course creation
  createSecondryCourse: async function ({
    secCourseInput
  }, req) {
   
    console.log(secCourseInput);
    const dynamicid=await SecCourse.countDocuments();
    const course="SECPROG001";

    
    var courseId="";
   
    courseId=course+(dynamicid+1).toString();

    var student=await User.findOne({
          email: secCourseInput.studentemail
        });
    var teacher=await User.findOne({
      email: secCourseInput.teacheremail
    });

    var primaryProgram=await PrimCourse.findOne({
      courseId:secCourseInput.primaryProgram
    });



    const program = new SecCourse({
      courseId:courseId,
      title:secCourseInput.title,
      description:secCourseInput.description,
      student_id:student,
      teacher_id:teacher,
      primarycourse:primaryProgram,
      startDate:secCourseInput.startDate,
      totalClasses:secCourseInput.totalClasses,
      enrolledClasses:secCourseInput.enrolledClasses,
      price:secCourseInput.price,
      paymentreceipt:secCourseInput.paymentreceipt,
      attendedClasses:secCourseInput.attendedClasses
    });

    primaryProgram.enrolledStudents=parseInt(primaryProgram.enrolledStudents.toString())+1;

    

    const createdSecProgram = await program.save();
    await primaryProgram.save();

    return {
      message:"Created Successfully",
      scourse:program._doc,
      primarycourse:primaryProgram._doc
    };
  },
//Enquiry For Main Web
createEnquiry: async function ({
  enquiry
  }, req) {
   
    console.log(enquiry);
    const dynamicid=await Enquiry.countDocuments();
    const enq="ENQ001";

    var primaryProgram=await PrimCourse.findOne({
      courseId:enquiry.course
    });
    var enquiryId="";
   
    enquiryId=enq+(dynamicid+1).toString();

    const newenquiry = new Enquiry({
      enquiryId:enquiryId,
      name:enquiry.name,
      grade:enquiry.grade,
      course:primaryProgram,
      country:enquiry.country,
      state:enquiry.state,
      availabitytime:enquiry.availabitytime,
      mobileno:enquiry.mobileno,
      email:enquiry.email
    });
    const createdEnquiry = await newenquiry.save();

    return {
      message:`Dear ${enquiry.name}, We will get in touch with you. `
    };
  },

  enquiryList: async function(){
      
      const enquires= await Enquiry.find().sort( {"enquiryId":-1} );
      return enquires;
     
    }

    ,

    studentList: async function(){
        
        const students= await User.find({"type":"U1"} );
        return students;
       
      }
      ,

    primarycourseList: async function(){
          
          const courses= await PrimCourse.find();
          return courses;
         
        },
        createEnquiry: async function ({
  enquiry
  }, req) {
   
    console.log(enquiry);
    const dynamicid=await Enquiry.countDocuments();
    const enq="ENQ001";

    var primaryProgram=await PrimCourse.findOne({
      courseId:enquiry.course
    });
    var enquiryId="";
   
    enquiryId=enq+(dynamicid+1).toString();

    const newenquiry = new Enquiry({
      enquiryId:enquiryId,
      name:enquiry.name,
      grade:enquiry.grade,
      course:primaryProgram,
      country:enquiry.country,
      state:enquiry.state,
      availabitytime:enquiry.availabitytime,
      mobileno:enquiry.mobileno,
      email:enquiry.email
    });
    const createdEnquiry = await newenquiry.save();

    return {
      message:`Dear ${enquiry.name}, We will get in touch with you. `
    };
  },
  createLead: async function ({
    leadInput
    }, req) {
     
    const enquiryobj=  await Enquiry.findOne({enquiryId:leadInput.enquiry});
    
      const lead = new Lead({
        lead:enquiryobj
      });
      const leaddata = await lead.save();
  
      return {
        message:`New Lead Created ${leaddata._id}`
      };
    },  
     

};