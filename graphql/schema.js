const { buildSchema } = require('graphql');

module.exports = buildSchema(`

enum EnquiryState{

    PENDING,
    APPROVED,
    REJECTED
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
    type Story {
        _id:ID!
        title:String!
        description:String!
        writter:String!
        date:String!

    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        posts: [Post!]!
        stories:[Story]!
        type:String!
        userid:String!
        gender:String!
        dob:String!
        mobile:String!
        alternatemobile:String!
        country:String!
        grade:String!
        timezone:String!
    }

    type PCourse {
        _id: ID!
        courseId: String!
        title: String!
        description: String!
        enrolledStudents: String!
        totalClasses:String!
        disable:String!
        price:String!
        publishedDate:String!
       
    }



    type SCourse {
        _id: ID!
        student_id: User!
        teacher_id: User!
        primarycourse:PCourse!
        courseId:String!

    }
    type SCourseOutput {
        message:String!
        scourse:SCourse!
        primarycourse:PCourse!
    }
    
    type Authorization {
        email:String!
        token:String!
        posts:[Post!]!
        occupation:[Cocd!]!
        gender:[Cocd]!
    }

    type Cocd{
        code:String!
        description:String!
    }

    type Success {
        email:String!
    }
    input UserInputData {
        email: String!
        name: String!
        parentName: String!
        password: String!
        gender:String!
        dob:String!
        type:String!
        mobile:String!
        alternatemobile:String!
        country:String!
        grade:String!
        timezone:String!
    }

    input CourseInputData {
        title:String!,
        description:String!,
        totalClasses:String!,
        price:String!,
        publishedDate:String!
        enrolledStudents:String!
    }

    input SCourseInputData {
        studentemail:String!
        teacheremail:String!
        primaryProgram:String!
        title:String!,
        description:String!,
        startDate:String!
        totalClasses:String!
        enrolledClasses:String!
        price:String!
        paymentreceipt:String!
        attendedClasses:String!
    }

    input EnquiryInputData {
        name:String!
        grade:String!
        course:String!
        country:String!,
        state:String!,
        availabitytime:String!
        mobileno:String!
        email:String!
        
    }
    type Enquiry{
        name:String!
        grade:String!
        course:String!
        country:String!,
        state:String!,
        availabitytime:String!
        mobileno:String!
        email:String!
        
    }
    type EnquiryList {
        enquiryId:String!
        name:String!
        grade:String!
        course:String!
        country:String!,
        state:String!,
        availabitytime:String!
        mobileno:String!
        email:String!
        status:String!
        
    }
    type EnquiryMessage {
        name:String!
       message:String!
        
    }

    input LoginInputData {
        email: String!
        password: String!
    }

    input LeadInputData {
        enquiry:String!
    }
    type LeadCreation{
        message:String!
        lead:Enquiry!
    }

    input PostInputData {
        title: String!
        imageUrl: String!
        content: String!
    }

    type RootQuery {
        login(loginInput: LoginInputData): Authorization!
        enquiryList:[EnquiryList]
        studentList: [User]
        primarycourseList:[PCourse]
        
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput:PostInputData): Post!
        createPrimaryCourse(courseInput:CourseInputData):PCourse!
        createSecondryCourse(secCourseInput:SCourseInputData):SCourseOutput!
        createEnquiry(enquiry:EnquiryInputData):EnquiryMessage!
        createLead(leadInput:LeadInputData):LeadCreation
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
