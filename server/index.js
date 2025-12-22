const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
            .then(()=>{
                console.log('MongoDB Connected Locally');
            })
            .catch((err)=>{
                console.log('MongoDB Connection Error:',err);
            })

app.use('/api/auth',require('./routes/auth'));
app.use('/api/jobs',require('./routes/jobs'));

app.get('/',(req,res)=>{
    res.send('Hello,Kumaran Server is running');
})
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})