const config =require('./configuration.json');


 module.exports.fetchCOCD=(array,code)=>{

    const arr=config[array];

    var description;
    for(var i=0;i<arr.length;i++){
        if(arr[i].code==code){

            description=arr[i].description;

        }
    }
   return description;
}

module.exports.fetchCOCDAr=(array)=>{

    const arr=config[array];
    return arr;
}