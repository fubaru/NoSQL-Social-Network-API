const router = require('express').Router();
// Import all API routes from api folder
const apiRoutes = require('./api');

// adding `/api` to file path 
router.use('/api', apiRoutes);

router.use((req,res)=>{
    res.status(404).send('404 error, Wrong route');
});

module.exports = router;