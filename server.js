import http from 'node:http'
import { getDataFromDB } from './utils/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { filteredData } from './utils/filterData.js'
import { filterDataByQuery } from './utils/filterDataByQuery.js';



const PORT=8000

const server=http.createServer(async(req,res)=>{
    const destinations= await getDataFromDB();

    const urlObj=new URL(req.url,`http://${req.headers.host}`); //entire url
    const queryObj=Object.fromEntries(urlObj.searchParams); //query values

    if(urlObj.pathname=== '/api' && req.method==='GET'){
        let result=filterDataByQuery(destinations,queryObj)
        sendJSONResponse(res,200,result);
       
        
    }
    else if(req.url.startsWith('/api/country') && req.method==='GET'){
        const country=req.url.split('/').pop();
        const result=filteredData(destinations,'country',country)
        
        sendJSONResponse(res,200,result)
    }
    else if(req.url.startsWith('/api/continent') && req.method==='GET'){
        const continent=req.url.split('/').pop();
        const result=filteredData(destinations,'continent',continent)
        sendJSONResponse(res,200,result)
        

    }
    else{
        
        sendJSONResponse(res,404,{
            error:"not found",
            message:"The requested route does not exist"
        })

    }


})
server.listen(PORT,()=>console.log('server running!'))

