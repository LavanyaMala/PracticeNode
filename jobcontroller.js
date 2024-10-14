const Job = require("../model/job")
const ErrorHandler = require("../utilis/ErrorHandler"); 
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// gets all the job
exports.getJobs = async(req,res,next) =>
{
    const getJob = await Job.find();
    res.status(200).json({
        status : true,
        results : getJob.length,
        data : getJob
    });
}

//post- insert new job
exports.newJob = catchAsyncErrors( async (req, res, next) => {
    
    try {
        const job = await Job.create(req.body);  // Await the creation of the job
        res.status(201).json({
            success: true,
            message: "Job created",
            data: job
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create job",
            errors: error.errors || {}
        });
    }
});

//PUT - update the job => /updatejob/:id

exports.updateJob = catchAsyncErrors(async (req,res,next) =>
{
    var validateById = await Job.findById(req.params.id);

    if(!validateById)
    {
       return next (new ErrorHandler("Wrong Value",404));
    }

    validateById = await Job.findByIdAndUpdate(req.params.id,req.body, {

        new : true,
        runValidators : true,
        useFindAndModify : false


    });

    res.status(200).json({
        success : "true",
        result : "Data moodified successfully"


    });
    
});

//DELETE(Hard delete) - /deletejob/:id
exports.deleteJob = async(req,res,next)=>
{
    var validateById = await Job.findById(req.params.id);

    if(!validateById)
    {
        res.status(200).json({
            success : false,
            results : "Cannot delete check the Id"
        });
    }

    validateById = await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
sucess: true,
results: "Deleted successfully"
    });

}


//Find By Id 
exports.getJobById = async (req,res,next) =>
{

    var validateById = await Job.find({$and: [{_id : req.params.id},{slug : req.params.slug}]});

    if(!validateById || validateById.length == 0)
    {
        return res.status(404).json({

            success : false,
            results : "Invalid Id"
        });
    }

    else
    {
       res.status(200).json({

            success : true,
            results : "Data displayed",
            data : validateById
        });

    }
}

//Stats of the Job => /stats/job/searchvaluetext

exports.statsJob = async(req,res,next) =>
{
    const stats = await Job.aggregate([


        {
            $match : {$text: {$search: "\"" +req.params.topic + "\""}}
        },
        {
            $group : {
                _id : {$toUpper : "$experience"},
                salary : { $avg : "$salary"},
                jobs : {$sum : 1}
            }
        }

        

    ]);

    if(stats.length == 0)
        {
            res.status(200).json({
                success : false,
                result : "Unable to fetch the data"
            })
        }

        else
        {
            res.status(200).json({
                success : true,
                results : "Retrieved",
                data : stats
            })
        }
}