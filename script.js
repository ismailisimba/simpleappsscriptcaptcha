let cloudObj = {};
let lelink = "https://script.google.com/macros/s/AKfycbyAl44CwyGcvrxb_YWYx0Fd2QKLjThO3WUNNo8Yg3W4P_YJDDEXSr9kOA/exec";
window.onload = () => {
    fetcher({},"first",firstDisp);
};


async function fetcher(data,action,funcAft){
    let temp = await getCaptchaObj(action,data).then(resObj=>{
      funcAft(resObj);
    })
}

async function getCaptchaObj(action,data){ 
    var myRequest = new Request(lelink+"?paraOne="+action);
    data = JSON.stringify(data);
    
    const returnVal = await fetch(myRequest, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            //'Content-Type': 'text/txt'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body:data // body data type must match "Content-Type" header
     }).then(function(response) {
                if (!response.ok) {  
                    throw new Error("HTTP error, status = " + response.status); 
                 }        
                return response.text();
             }) .then(function(myBlob) {        
                                let cloudObject = JSON.parse(myBlob);        
                                return cloudObject;  
                            }) .catch(function(error) {
                                                 let p = document.createElement('p');
                                                p.appendChild(
                                                    document.createTextNode('Error: ' + error.message)
                                                );
                                                document.querySelectorAll(".simplecaptchamom")[0].innerHTML = p.innerHTML;
                                            });
    return returnVal; 
};

function firstDisp(resObj){
    let captchaItemsCont = document.querySelectorAll(".captchaitems");
    let img1 = captchaItemsCont[0].querySelectorAll("img")[0];
    img1.src = `data:image/jpeg;base64,${resObj.ghh.l11}`;
    let img2 = captchaItemsCont[2].querySelectorAll("img")[0];
    img2.src = `data:image/jpeg;base64,${resObj.ghh.l12}`;

    captchaItemsCont[4].value = "?";
    captchaItemsCont[4].addEventListener("input",checkAnswer);
    
    captchaItemsCont[1].innerHTML = "+";
    captchaItemsCont[3].innerHTML = "=";
    cloudObj = resObj;
}


function checkAnswer(){
    let val = this;
    val.removeEventListener("input",checkAnswer);

    let myTimeOut = window.setTimeout(function(){  
        val = val.value;
        let obj = {};
        obj["one"] = val;
        obj["two"] = cloudObj.ghh.eqid;
        
        if(val.length>=1){
          fetcher(obj,"second",funcToHook);
        }

        window.clearTimeout(myTimeOut);
     },1000);
}

function funcToHook(resObj){
    let mom = document.querySelectorAll(".simplecaptchamom")[0];
    
    if(resObj.status==="pass"){
        mom.innerHTML = "";
         mom.style.backgroundColor = "green";
         mom.style.color = "white";
        mom.innerHTML = "Success!"
  
        let tempyTimy = window.setTimeout(function(){
        window.location.reload();
        window.clearTimeout(tempyTimy);
      },1690);
    }else{
        mom.innerHTML = "";
        mom.style.backgroundColor = "red";
        mom.style.color = "white";
       mom.innerHTML = "Failed!"
 
       let tempyTimy = window.setTimeout(function(){
       window.location.reload();
       window.clearTimeout(tempyTimy);
     },1690);
    }
}


