if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT||3000;
const bodyParser = require('body-parser');

const postRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');







app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/v1/posts/',postRoutes);
app.use('/api/v1/',userRoutes);

app.use('*', (req, res) => {
    res.status(404); 
    res.json({
      message:"Page not found"
    });
})

app.listen(PORT,()=>{
    console.log(`Listning on ${PORT}`);
})