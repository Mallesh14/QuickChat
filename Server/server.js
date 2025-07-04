const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const chath=require('./routes/chatBot');
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send(' Background Server is running on ');
}
);
const authRoutes=require('./routes/auth');
app.use('/api/auth',authRoutes);

app.post('api/auth/register', (req, res) => {
    console.log(req.body); 
    
    res.status(200).json({ msg: "User registered successfully!" });
});
console.log("Mongo_URI:",process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrLParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    //console.log("MongoDB connected successfully");
    app.listen(process.env.PORT||5000,()=>
        {
        //console.log(`Server is running on port ${process.env.PORT||5000}`);
})
})
.catch((err)=>console.log("MongoDB connection failed",err));


