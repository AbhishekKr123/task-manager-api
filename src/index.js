const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

require('./db/mongoose');

//MiddleWare
// app.use((req, res, next) => {
//   res.status(503).send('WebSite is in maintainance');
// });

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Express is Running on ' + port);
});

// const multer = require('multer');

// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please Upload a pdf'));
//     }
//     cb(undefined, true);
//     // cb(new Error('File must be pdf'));
//     // cb(undefined, true);
//     //cb(undefined, false);
//   }
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Erro('From my middleware');
// };

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send();
// },
//   (error, req, res, next) => {
//     res.status(400), send({ error: error.message });
//   }
// );

// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse');
//   console.log(token);
// };

// myFunction();

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   const task = await Task.findById('t7374532875853');
//   await task.populate('owner').execPopulate;
//   console.log(user.tasks);
// };

// main();
