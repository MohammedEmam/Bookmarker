var bmName = document.querySelector("#bookmarkName");
var bmWebsite = document.querySelector("#bookmarkWebsite");
var tBody = document.querySelector ("#tableBody") ;
var submitButton = document.querySelector ("#submit");
var alertWeb = document.querySelector ("#alertWeb");
var alertName = document.querySelector ("#alertName");


submitButton.addEventListener("click" , addWebsite);

var tBodylist = [];

if (localStorage.getItem("Links") != null) {
    tBodylist = JSON.parse( localStorage.getItem("Links"));
    retrifData ()

}

var regexName = /^[A-Z a-z]{3,25}[0-9]{0,9}$/
bmName.addEventListener("blur" , regNameFun)
function regNameFun (){
    if (regexName.test(bmName.value) == true) {
        bmName.classList.remove("is-invalid")
        bmName.classList.add("is-valid")
        alertName.classList.replace ("d-block" , "d-none")
        return true

    } else {
        bmName.classList.add("is-invalid")
        bmName.classList.remove("is-valid")
        alertName.classList.replace ("d-none" , "d-block")
        return false

    }
}

var regexLink = /^(https:\/\/)(www\.)?[A-Za-z0-9]{3,50}\.[a-z]{2,6}\/?$/

bmWebsite.addEventListener("blur" ,regLinkFun )
function regLinkFun (){
    if (regexLink.test(bmWebsite.value) == true) {
        bmWebsite.classList.remove("is-invalid")
        bmWebsite.classList.add("is-valid")
        alertWeb.classList.replace ("d-block" , "d-none")
        return true ;

    } else {
        bmWebsite.classList.add("is-invalid")
        bmWebsite.classList.remove("is-valid")
        alertWeb.classList.replace ("d-none" , "d-block")
        return false

    }
}


function testRep () {

    var newList = "" ;
    for (var i = 0 ; i < tBodylist.length ; i++){

        if(tBodylist[i].nameValue == bmName.value) {
            newList =  (tBodylist[i].nameValue);
        }else {
        }
    }

    if (newList == bmName.value) {

        window.alert("الإسم مكرر من قبل")
        return true
    }
}


// addWebSite Func
function addWebsite () {
    if (testRep () == true) {

    }else {
        if ( regLinkFun () == true && regNameFun () == true ){
            var siteObject ;
            siteObject = {
                nameValue : bmName.value,
                websiteValue : bmWebsite.value
            }
    
                tBodylist.push(siteObject);
                localStorage.setItem ("Links" ,JSON.stringify(tBodylist));
                retrifData ()

        }else {
    regNameFun();
    regLinkFun ()

        }

    }


}

// retrifData Func

function retrifData () {
    var data = "" ;

    for (var i = 0 ; i < tBodylist.length ; i++ ) {
        data += `<tr>
        <td class="">${tBodylist[i].nameValue}</td>
        <td><a target="_blank" class="btn btn-primary" href="${tBodylist[i].websiteValue}"> <i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button onclick="" class="btn btn-secondary"> <i class="fa-solid fa-trash-can"></i> Update</button></td>
        <td><button onclick="" class="btn btn-info"> <i class="fa-solid fa-trash-can"></i> information</button></td>
        <td><button onclick="deleteLink (${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
    }
    tBody.innerHTML = data


}

function deleteLink (i) {
    tBodylist.splice(i,1);
    console.log(i)
    localStorage.setItem ("Links" ,JSON.stringify(tBodylist));
    retrifData ()
}

