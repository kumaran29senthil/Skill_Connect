const express=require('express');
const router=express.Router();

const jobController=require('../controllers/jobController')
const auth=require('../middleware/authMiddleware')

router.get('/dashboard',auth,jobController.getEmployerDashboard);
router.post('/', auth, jobController.postJob);

router.get('/all', auth, jobController.getAllJobs);
router.post('/:id/apply', auth, jobController.applyForJob);
router.get('/:id/applicants', auth, jobController.getJobApplicants);

module.exports=router;