const searchForm = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultContainer = document.querySelector(".search-result");
const loader = document.querySelector(".loader");
const showMore_btn = document.getElementById("showMoreBtn");

let  query = '';
let page = 1;
/*
fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=10`, {
    headers: {
      Authorization: 'HJdUalRATD8MlLFFBt00xY2TPA7TWYaE7k9iQjUk6XfTb0eD1DWKs5Ec'
    }}).then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))

*/

function loading(){
  searchResultContainer.style.display = "none";
  loader.style.display = "block";

}

function completed(){
  searchResultContainer.style.display = "grid";
  loader.style.display = "none";
}

async function searchEngine(){
  loading();
  query = searchInput.value;
  const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=12&page=${page}`, {
    headers: {
          Authorization: 'HJdUalRATD8MlLFFBt00xY2TPA7TWYaE7k9iQjUk6XfTb0eD1DWKs5Ec'
  }});


  const data = await response.json();
  console.log(data);
  const results = data.videos;

  if(!response.ok){
      completed();
  }
      
  results.map(displayVideo);
  completed();
  showMore_btn.style.display = "flex";
        
}



function displayVideo(video){

  let card = document.createElement("div");
  card.className = "card";

  let vidDiv = document.createElement("div");
  vidDiv.className = "vid-div";

  let downloadLink = document.createElement("a");
  downloadLink.href = video.video_files[0].link;
  downloadLink.id = "downloadLink";
  downloadLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>`



  let vid = document.createElement("video");
  vid.src  = video.video_files[0].link;
  let videoLink = document.createElement("a");
  videoLink.href = video.video_files[0].link;
  let videoImage = document.createElement("img");
  videoImage.src = video.image;
  vid.pause();

  let playButton = document.createElement("button");
  playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M320-200v-560l440 280-440 280Z"/></svg>`

  playButton.onclick = () =>{
    if(vid.paused){
     vid.play();
      playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>`
      console.log("playing");
      //viewDuration(vid, '.vid-div');
      vid.controls = true;
      
      
      
    }
  
    else{
      vid.pause();
      playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M320-200v-560l440 280-440 280Z"/></svg>`
      console.log("paused");
      vid.controls = false;
    }

    
  }
  

  

    
  vidDiv.appendChild(vid);
  vidDiv.appendChild(playButton);
  vidDiv.appendChild(downloadLink);
  card.appendChild(vidDiv)
  searchResultContainer.appendChild(card);
  console.log("appended"); 

} 

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  page = 1;
  showMore_btn.style.display = "none";
  searchEngine();
  console.log("working");  
});

showMore_btn.addEventListener("click", () => {
  page++;
  searchEngine();
});

function viewDuration(video, className){
  let width = 0;
  let interval = null;

  interval = setInterval(duration, 500);

  function duration(){
    if(width >= video.duration){
      clearInterval(interval);
    }

    else{
      width ++;
      console.log(width)
      /*
      window.getComputedStyle(
        document.querySelector(className), ':after'
      ).width = `${width}px`; 
      */
            
    }



     
  }
}








