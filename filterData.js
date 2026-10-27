export function filteredData(data,locationType,location){
   return data.filter((destination)=>{
        return destination[locationType].toLowerCase()===location;
   })

}