const  mobileNavIcon = document.getElementById("mobileNavIcon");
const headerNavList = document.getElementById("headerNavList");
const mainSection = document.getElementById("mainSection");

mobileNavIcon.onclick = function(){
    if(mobileNavIcon.className=="fa-solid fa-bars"){
        mobileNavIcon.className="fa-solid fa-close";
        headerNavList.style.display = "flex";
        headerNavList.style.transform = "translateX(10px)";
        mainSection.style.transition = "all 0.5s ease";
        mainSection.style.filter = "blur(5px)";
    }else{
        mobileNavIcon.className="fa-solid fa-bars";
        headerNavList.style.display = "none";
        headerNavList.style.transform = "translateX(200%)";
        mainSection.style.filter = "blur(0)";
    }
}
