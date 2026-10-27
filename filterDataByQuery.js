export function filterDataByQuery(data,queryParams){
    return data.filter((destination)=>{
        for(let query in queryParams){
            if(!(String(destination[query]).toLowerCase()==String(queryParams[query]).toLowerCase())){
                return false;
                
            }
        }
        return true;
    })
}