const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://kumaransenthilarasu:gv4yQfgpLjlsdc9@skillconnect.ko2bcvf.mongodb.net/?appName=SkillConnect')
            .then(()=>{
                console.log('MongoDB Connected to Cloud');
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