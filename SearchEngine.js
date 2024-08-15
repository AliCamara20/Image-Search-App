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

    if(data.results.length < 1){
        searchResult.innerHTML = "Result Not Found";
        searchResult.style.fontSize = "70px";
        searchResult.style.margin = "auto";
        
    }

    else{
        results.map( result => {
            const link = document.createElement("a");
            link.target = "_blank";
            link.href = result.links.html;
            const resultImg = document.createElement("img");
            resultImg.src = result.urls.small;
    
            link.appendChild(resultImg);
            searchResult.appendChild(link);
            
        })
    
        showMore_btn.style.display = "block";
    }

    
    


    
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