
// open database

// create objectstroe like sql table 
let db;
// request for open database
let openrequest=indexedDB.open("myDataBase");
// adding listners 
// data base succesfull open 
openrequest.addEventListener("success",(e)=>{
    db=openrequest.result;


})
// data base error occur
openrequest.addEventListener("error",(e)=>{

})
// database upgrade
openrequest.addEventListener("upgradeneeded",(e)=>{
db=openrequest.result;
// keypath is used for uniquely indentify for data because data is store in similar way

db.createObjectStore("video",{keyPath:"id"});
db.createObjectStore("image",{keyPath:"id"});

})