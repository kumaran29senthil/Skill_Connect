const Job=require('../models/Jobs');
const User = require('../models/User');

exports.getEmployerDashboard=async(req,res)=>{
    try{
        const userId = req.user.id;

       const activeJobsCount = await Job.countDocuments({ postedBy: userId, status: 'Active' });

        const jobs=await Job.find({postedBy:userId});

        let totalApplicants=0;
        jobs.forEach(job=>totalApplicants+=job.applicants.length);

        const recentJobs=await Job.find({postedBy:userId})
               .sort({createdAt:-1})
               .limit(3);

        res.json({
            stats:{
                activeJobs:activeJobsCount,
                totalApplicants:totalApplicants,
                hired:0
            },
            recentJobs
        });
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}



// POST A NEW JOB
exports.postJob = async (req, res) => {
    try {
        // 1. Get data from the frontend form
        const { title, company, location, salary, category, type, description } = req.body;

        // 2. Create a new Job object
        const newJob = new Job({
            title,
            company,
            location,
            salary,
            category,
            type,
            description,
            postedBy: req.user.id // This comes from the Token (authMiddleware)
        });

        // 3. Save to Database
        const job = await newJob.save();

        // 4. Send back the saved job
        res.json(job);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ... keep your existing getEmployerDashboard function below this ...


// Add this to jobController.js
exports.getAllJobs = async (req, res) => {
    try {
        // Fetch all jobs, sort by newest first
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        // 1. Find the Job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // 2. Check: Is the applicant the Employer who posted it?
        if (job.postedBy.toString() === userId) {
            return res.status(400).json({ msg: "You cannot apply to your own job" });
        }

        // 3. Check: Has user already applied?
        if (job.applicants.includes(userId)) {
            return res.status(400).json({ msg: "You have already applied for this job" });
        }

        // 4. Success: Add User ID to applicants array
        job.applicants.push(userId);
        await job.save();

        res.json(job);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // .populate('applicants', 'name email') -> This is the magic line
        // It goes to the 'users' collection and grabs name and email for these IDs
        const job = await Job.findById(jobId).populate('applicants', 'name email');

        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Security Check: Ensure the user requesting this is the one who posted it
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized to view these applicants' });
        }

        res.json(job.applicants);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};