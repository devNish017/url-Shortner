const {nanoid}=require("nanoid")
const url=require("../model/url.model.js")
const isValidurl=require("../validator/url.validator.js")
const shortenUrl=async(req,res)=>{
    try{
        
     let  {originalUrl}=req.body
     if(!originalUrl){
        return res.status(400).json({error:"URL required"})
     }

  if (
    !originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")
  ) {
    originalUrl = "https://" + originalUrl;
  }
     if(!isValidurl(originalUrl)){
         return res.status(400).json({error:"Invalid URL"})
     }
     const existing= await url.findOne({originalUrl})
   if(existing){
    return res.json({
        shortUrl:`https://url-shortner-4r1c.onrender.com/${existing.shortUrl}`
    })
   }

     const shortUrl=nanoid(6);
     await url.create({originalUrl,shortUrl})
     res.json({ shortUrl: `https://url-shortner-4r1c.onrender.com/${shortUrl}` });
    }
    catch(err){
        res.status(500).json({error:"Server error"});
    }
}

const redirectUrl=async(req,res)=>{
    try{
    const code=req.params.code
    const data=await url.findOne({shortUrl:code});
    if(data){
        res.redirect(data.originalUrl);
    }
    else{
       res.status(404).send("url not found");
    }
}
catch(err){
    return res.status(500).json({err:"Server error"});
}
}

module.exports = {shortenUrl,redirectUrl};
