const Job=require('../models/Jobs');
const User = require('../models/User');

exports.getEmployerDashboard=async(req,res)=>{
    try{
        const userId = req.user.id;

        const activeJobs = await Job.find({postedBy:userId,status:'Active'});

        const jobs=await find({postedBy:userId});

        let totalApplicants=0;
        jobs.forEach(job=>totalApplicants+=job.applicants.length);

        const recentJobs=await Job.find({postedBy:userId})
               .sort({createdAt:-1})
               .limit(3);

        res.json({
            stats:{
                activeJobs,
                totalApplicants,
                hired:0
            },
            recentJobs
        });
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}