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
            likes.innerHTML = `<i class="fa-solid fa-love"></i> 
                               <span> ${result.likes}</span>`;

            let downloadBtn = document.createElement("div");
            downloadBtn.className = "download-btn";
            downloadBtn.innerHTML = `<a href = ${result.links.download} target = "_blank"><i class="fa-solid fa-download"></i> <span>Download</span></a>`;

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
            let imageDescription = document.createElement("p");
            
            userImage.src  = result.user.profile_image.small;
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

 function displayImages(){

 }

 showMore_btn.addEventListener("click", () => {
    page++;
    imageSearchEngine();
})