const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewURLParser: true,
    useUnifiedTopology:true
  })
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));