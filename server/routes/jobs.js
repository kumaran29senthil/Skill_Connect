const express=require('express');
const router=express.Router();

const jobController=require('../controllers/jobController')
const auth=require('../middleware/authMiddleware')

router.get('/dashboard',auth,jobController.getEmployerDashboard);

module.exports=router;