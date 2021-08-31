const resultDiv = document.querySelector('#results-div')


var fetchedResults = [];


function fillResults(query,num){

    fetchedResults = []

    url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${query}&num=${num}`

    fetch(url,{
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "google-search3.p.rapidapi.com",
            "x-rapidapi-key": "5e2425a29dmsh128f22977a4eb0ep195af4jsn19113e7427d0"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data=>{
        //console.log(data)
    
       Object.keys(data.results).forEach(key=>{
            fetchedResults[key] = data.results[key]
       })
       
    })
    .catch(err => {
        console.error(err);
    });
}


function displayResults(fetchedResults){
    Object.keys(fetchedResults).forEach(key=>{
        resultDiv.innerHTML+=`
        <div class='w-50 py-3 my-2 rounded'>
        <a href=${fetchedResults[key].link}><h4>${fetchedResults[key].title}</h4></a>
        <p>${fetchedResults[key].description}</p>
        </div>
        <br>
        `
    })
}

$('#main-form').on('submit',(e)=>{
    e.preventDefault()

    resultDiv.innerHTML = `<div class='spinner-border text-primary' role='status'></div>`
    query = $('#searchQ').val()
    num=50

    fillResults(query,num)
    
    let x = setInterval(()=>{
        if(fetchedResults.length>0){
            clearInterval(x)
            resultDiv.innerHTML=''
            displayResults(fetchedResults)
            console.log('results fetched and displayed')
        }else{
            console.log('checking')
        }
    },1000)
   
})


function changeTheme(){
    const divs = document.querySelectorAll('.theme-change-div');
    const texts = document.querySelectorAll('.theme-change-text');
    const icons = document.querySelectorAll('.theme-change-icon');


    // $('body').toggleClass('body-bg-change')
    
    for(let i=0; i<divs.length;i++){
       divs[i].classList.toggle('bg-dark');
       divs[i].classList.toggle('bg-light');
    }
    for(let i=0; i<texts.length;i++){
       texts[i].classList.toggle('text-light');
       texts[i].classList.toggle('text-dark');
        
    }
    for(let i=0; i<icons.length;i++){
       icons[i].classList.toggle('text-light');
        
    }
}


$('#dark-mode-btn').on('click', ()=>{
   
    if($('#moon-icon').css('display')=='none'){ 
      $('#moon-icon').css('display','block');
      $('#sun-icon').css('display','none');
      localStorage.setItem('isDark',true);
      $('#theme-info').text('Dark-Mode');
    }
    else if($('#sun-icon').css('display')=='none'){
      $('#sun-icon').css('display','block');
      $('#moon-icon').css('display','none');
      localStorage.setItem('isDark',false);
      $('#theme-info').text('Light-Mode');
    }
    changeTheme();

});



function checkTheme(){
 if(localStorage.getItem('isDark')=='true'){
   const allDivs= document.querySelectorAll('div');
   for(var i=0;i<allDivs.length;i++){
     allDivs[i].style.transition='none';
    }

   changeTheme();
   $('#moon-icon').css('display','block');
   $('#sun-icon').css('display','none');
   $('#theme-info').text('Dark-Mode');
 }else{
   $('#sun-icon').css('display','block');
   $('#moon-icon').css('display','none');
   $('#theme-info').text('Light-Mode');
 }
 
}

window.onload=checkTheme();