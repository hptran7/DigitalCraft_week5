let factUl= document.getElementById("factUL")
let request = new  XMLHttpRequest();
let submitButton = document.getElementById("submitButton")
let detailInfo = document.getElementById("detailInfo")
let searchTitle = document.getElementById("searchTitle")

request.addEventListener("load",function(){
    let data =JSON.parse(this.responseText);
    let result = data.Search
    let display = result.map(function(fact){
        return `<div class="card" style="width: 15%;">
        <img src=${fact.Poster} class="card-img-top">
        <div class="card-body">
          <h6 class="card-title">${fact.Title}</h6>
        </div>
      </div>
        `
})
    factUl.insertAdjacentHTML("beforeend",display.join(" "))
    
    submitButton.addEventListener("click",()=>{
        let displayDetail= result.filter(detail=>detail.Title === searchTitle.value)
        let display2 =displayDetail.map(function(detail){
            return`<div>
                <h1>${detail.Title}</h1>
                <img src =${detail.Poster}></img>
                <label>Year: ${detail.Year}</label>
                <label>type: ${detail.Type}</label>
                </div>`
        })
        detailInfo.insertAdjacentHTML("beforeend",display2.join(" "))
        
    })
    
    
    
})
request.open("GET","http://www.omdbapi.com/?s=batman&apikey=3e53aac3")
request.send()

