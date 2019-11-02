const mongoose = require('mongoose');

const connectionUrl = process.env.MONGODB_URL;
const databaseName = 'task-manager-api';

mongoose.connect(connectionUrl + '/' + databaseName, {
  useNewUrlParser: true,
  useCreateIndex: true
});

/*
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean
  }
});

const wake = new Task({
  description: 'WakeUp',
  completed: false
});

wake
  .save()
  .then(() => {
    console.log('Everything went well');
  })
  .catch(err => {
    console.log('Error ', err);
  });
  */
