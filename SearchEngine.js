const searchForm= document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.querySelector(".search-result");
const showMore_btn = document.querySelector("button");
let page = 1;
let imageName = "";
const accessKey = "tl8BMn-MvrJdTZSIwnXqHKtfjpCMZF5-QFFeE3COciw";



async function imageSearchEngine(){

    
    imageName = searchInput.value;
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${imageName}&client_id=${accessKey}&per_page=12`);
    const data = await response.json();
    console.log(data);
    const results = data.results;
    
    /*
    if(resultLength < 1){
        searchResult.innerHTML = "Result Not Found";        
        searchResult.classList.add("error");   
    }
        */
    
    
        results.map( result => {
    
            const imageDiv = document.createElement("div");
            imageDiv.className = "image-div";

            const link = document.createElement("a");
            link.target = "_blank";
            link.href = result.links.html;

            const resultImg = document.createElement("img");
            resultImg.src = result.urls.small;
        
            link.appendChild(resultImg);
            imageDiv.appendChild(link);
            searchResult.appendChild(imageDiv);

            let info = document.createElement("div");
            info.className = "info";

            let likes = document.createElement("div");
            likes.className = "likes";
            likes.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg> 
                               <span> ${result.likes}</span>`;

            let downloadBtn = document.createElement("div");
            downloadBtn.className = "download-btn";
            downloadBtn.innerHTML = `<a href = ${result.links.download} target = "_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                     <span>Download</span></a>`;
             
            let imageDescription = document.createElement("p");
            imageDescription.innerText = result.alt_description;                         

            
            info.appendChild(likes);
            info.appendChild(downloadBtn);
            imageDiv.appendChild(info);


            let description = document.createElement("div");
            description.className = "desc";

            let userImageBox = document.createElement("div");
            userImageBox.className = "img-box";
            let userImage = document.createElement("img");


            let userInfo = document.createElement("div");
            userInfo.className = "user-info";

            let userFullName = document.createElement("h3");
            let username = document.createElement("span");
            
            userImage.src  = result.user.profile_image.medium;
            userFullName.innerText =  result.user.name;
            username.innerText = result.user.username;

            
            userImageBox.appendChild(userImage);
            userInfo.appendChild(userFullName);
            userInfo.appendChild(username);
            
            description.appendChild(userImageBox);
            description.appendChild(userInfo);

            imageDiv.appendChild(description);
            




            
        })   
    
                
    
        
    showMore_btn.style.display = "block";
}
    




    
    


    
    

    

    


searchForm.addEventListener("submit", e => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = "";
    showMore_btn.style.display = "none";
    imageSearchEngine();
    searchInput.value = "";

})

 

 showMore_btn.addEventListener("click", () => {
    page++;
    imageSearchEngine();
})