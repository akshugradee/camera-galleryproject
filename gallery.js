setTimeout(()=>{
    if(db){
        // videos retreival
    
        let dbTransaction=db.transaction("video","readonly");
        let videostore=dbTransaction.objectStore("video");
        let videorequest=videostore.getAll();  //event driven
    
        videorequest.onsuccess= (e)=>{
            let videoresult=videorequest.result;
            let gallerycont=document.querySelector(".gallery-cont");
            // console.log(videoresult);
            videoresult.forEach((videoobj)=>{
                let mediaele=document.createElement("div");
                mediaele.setAttribute("class","media-cont");
                mediaele.setAttribute("id",videoobj.id);
                let url=URL.createObjectURL(videoobj.blobData);
                mediaele.innerHTML=`<div class="media">
                <video  autoplay  loop src="${url}"></video>
                </div>
            
                <div class="delete action-btn">Delete</div>
                <div class="download action-btn">Downlaod</div>
                `;
                gallerycont.appendChild(mediaele);
                let deletebtn=mediaele.querySelector(".delete");
                deletebtn.addEventListener("click",deletelistner);
                let downbtn=mediaele.querySelector(".download");
                downbtn.addEventListener("click",downloadlistner);
                
            })
        }
        // image retervial
        let imagedbTransaction=db.transaction("image","readonly");
        let imagestore=imagedbTransaction.objectStore("image");
        let imagerequest=imagestore.getAll();  //event driven
    
        imagerequest.onsuccess= (e)=>{
            let imageresult=imagerequest.result;
            let gallerycont=document.querySelector(".gallery-cont");
            // console.log(videoresult);
            imageresult.forEach((imageobj)=>{
                let mediaele=document.createElement("div");
                mediaele.setAttribute("class","media-cont");
                mediaele.setAttribute("id",imageobj.id);
                let url=imageobj.url;
                console.log(url);
                mediaele.innerHTML=`
                <div class="media">
                <img src="${url}" />
                </div>
            
                <div class="delete action-btn">Delete</div>
                <div class="download action-btn">Downlaod</div>
                </div>`;
                gallerycont.appendChild(mediaele);
                let deletebtn=mediaele.querySelector(".delete");
                deletebtn.addEventListener("click",deletelistner);
                let downbtn=mediaele.querySelector(".download");
                downbtn.addEventListener("click",downloadlistner);
                
            })
        }

    }
},100)


// ui remove and db remove 
function deletelistner(e){
    // db removal
  let id=  e.target.parentElement.getAttribute("id");
  let type=id.slice(0,3);
  if(type==="vid"){

    let dbTransaction=db.transaction("video","readwrite");
    let videostore=dbTransaction.objectStore("video");
    videostore.delete(id);

  }
  else if(type==="img"){
    let imagedbTransaction=db.transaction("image","readwrite");
    let imagestore=imagedbTransaction.objectStore("image");
    imagestore.delete(id)


  }

//   ui removal

e.target.parentElement.remove();

}

function downloadlistner(e){
    let id=  e.target.parentElement.getAttribute("id");
    let type=id.slice(0,3);
    if(type==="vid"){
        let dbTransaction=db.transaction("video","readwrite");
        let videostore=dbTransaction.objectStore("video");
        let videorequest=videostore.get(id);
        videorequest.onsuccess=(e)=>{
            let videoresult=videorequest.result;

            let videourl=URL.createObjectURL(videoresult.blobData);
             let a =document.createElement("a");

        a.href=videourl;
        a.download="stream.mp4";
        a.click();
        }

    }
    else if( type==="img"){
        let imagedbTransaction=db.transaction("image","readwrite");
        let imagestore=imagedbTransaction.objectStore("image");
        let imagerequest=imagestore.get(id);
        imagerequest.onsuccess=(e)=>{
            let imageresult=imagerequest.result;

            
             let a =document.createElement("a");

        a.href=imageresult.url;
        a.download="image.jpg";
        a.click();
        }

    }


}
