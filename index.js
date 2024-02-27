const API = "3bd8c909c9fd49a1ac4024e544c0a8eb";
const url = "https://newsapi.org/v2/top-headlines?country=in&category=technology";

window.addEventListener('load',()=>fetchNews("Agriculture"));

async function fetchNews(query) {
    const response = await fetch(`${url}&apiKey=${API}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);

}

function bindData(articles) {
    const cardsContainer = document.getElementById('card-container');
    const cardTemplate = document.getElementById('template-card-news');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });

}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-src');
    const newsDesc = cardClone.querySelector('#news-content');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}