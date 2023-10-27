const path = require('path');

const express = require('express');
//Below added by Shrutik to configure Apollo server
const { ApolloServer } = require('@apollo/server');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { graphqlHTTP } = require('express-graphql');
const standAlone = require('@apollo/server/standalone');
const MONGO_URI = 'mongodb+srv://modimohit291997:maya1234@cluster0.ovarcox.mongodb.net/test';


const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Shrutik below to connect apollo server for graphql
async function startServer() {

  const server = new ApolloServer({
    typeDefs: `
  type EnquiryList{
    name:String!
    mobileno:String!
    email: String!
  }
    type Query
    {
      enquiryList:[EnquiryList]
    }
  `,
    resolvers: {
      Query: {

      }
    }
  });
  app.use(cors());
  await server.start()
  app.use("/graphql", expressMiddleware(server));


  mongoose
    .connect(
      MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    )
    .then(result => {
      app.listen(4000);

      console.log('Server started Shrutik');


    })
    .catch(err => console.log(err));


}

startServer();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

//commented by Shrutik to use Apollo Graphql instead
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolver,
//     graphiql: true,
//     customFormatErrorFn(err) {
//       if (!err.originalError) {
//         return err;

//       }
//       const data = err.originalError.data;
//       const message = err.message || 'An error occurred.';
//       const code = err.originalError.code || 500;
//       return { message: message, status: code, data: data };
//     }
//   })
// );

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


