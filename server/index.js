require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRouter = require('./routes/users');
const PORT = process.env.PORT || 4000;
const app = express();
//const { createServer } = require('node:http');
//const server = createServer(app);
//const { Server } = require('socket.io');
// const io = new Server(server);
const User = require('./models/users');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
//app.use(cookieParser());
app.use(express.json());
// all routes should be registered after the global middlewares cors and express.json()
app.use('/api/users', userRouter);


// THE FOLLOWING BLOCK NEED TO BE AFTER ALL THE BACKEND ROUTES!!!!!!!!!!
if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  const buildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
  });
});