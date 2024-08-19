const searchResultContainer = document.querySelector(".search-result")
let  query = 'Desert';
/*
fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=10`, {
    headers: {
      Authorization: 'HJdUalRATD8MlLFFBt00xY2TPA7TWYaE7k9iQjUk6XfTb0eD1DWKs5Ec'
    }}).then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))

*/
async function searchEngine(){

    const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=12`, {
        headers: {
          Authorization: 'HJdUalRATD8MlLFFBt00xY2TPA7TWYaE7k9iQjUk6XfTb0eD1DWKs5Ec'
        }});


        const data = await response.json();
        console.log(data);
        const results = data.videos;
        console.log(results);
       /*
        let videoLink = document.createElement("a");
        videoLink.href = results[0].video_files[0].link;
        let videoImage = document.createElement("img");
        videoImage.src = results[0].image;
       
       videoLink.appendChild(videoImage);
       searchResultContainer.appendChild(videoLink);

       */

       results.map(displayVideo);

      

        
}



function displayVideo(video){

    
    let card = document.createElement("div");
    card.className = "card";

    let vidDiv = document.createElement("div");
    vidDiv.className = "vid-div";

    let vid = document.createElement("video");
    vid.src  = video.video_files[0].link;
    let videoLink = document.createElement("a");
    videoLink.href = video.video_files[0].link;
    let videoImage = document.createElement("img");
    videoImage.src = video.image;

    
     vid.appendChild(videoImage);
    vidDiv.appendChild(vid);
    card.appendChild(vidDiv)
    
    searchResultContainer.appendChild(card);
    console.log("appended");


       
   
}

searchEngine();

