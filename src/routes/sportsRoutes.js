import express from 'express';
const sportsRouter = express.Router();

sportsRouter.get("/",(req,res)=>{
    res.send("Sports Home");
})

export default sportsRouter;
