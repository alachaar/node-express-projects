const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')


const getAllJobs = async(req,res)=>{
    const jobs = await Job.find( {createdBy : req.user.userId} ).sort('createdAt')
    res.status(StatusCodes.OK).json( {jobs ,count:jobs.length} )
}

const getJob = async(req,res)=>{
    const {id:jobId} = req.params
    const job = await Job.findOne( { createdBy : req.user.userId, _id:jobId} )
    if(!job){
        throw new NotFoundError(`No job found with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json( {job} )
}
const createJob = async(req,res)=>{
    req.body.createdBy=req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json( {job} )

}
const updateJob = async(req,res)=>{
    const {id:jobId} = req.params
    const {company , position} = req.body
    if(company==='' || position===''){
        throw new BadRequestError('comany or position fields can not be empty')
    }
    const job = await Job.findOneAndUpdate({ createdBy : req.user.userId, _id:jobId} , req.body , {
        new:true,
        runValidators:true
    } )
    if(!job){
        throw new NotFoundError(`No job found with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json( {job} )
}
const deleteJob = async(req,res)=>{
    const {id:jobId} = req.params
    const job = await Job.findOneAndDelete( {createdBy : req.user.userId, _id:jobId} )
    if(!job){
        throw new NotFoundError(`No job found with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}

