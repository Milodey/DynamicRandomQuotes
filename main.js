const quoteContainer = document.getElementById("quote-container");
const quotes = document.getElementById("quotes");
let author = document.getElementById("author");
const newQ = document.getElementById("newQ");
const tweetMe = document.getElementById("tweetMe");
const loader = document.getElementById("loader");

function loaderRun() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loaderStop() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
let realData = "";
let quotesData = "";
const TweetNow = () => {
    let tweetpost = `https://twitter.com/intent/tweet?text=${quotesData.text}`;
    window.open(tweetpost);
};
const randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

document.documentElement.style.setProperty("--main-bg-color", randomColor);
// const changeColor =
//     ("mousemove",
//         function(e) {
//             x = e.offsetX;
//             y = e.offsetY;
//             div.style.backgroundColor = `rgb(${x}, ${y}, ${x - y})`;
//         });
const getNewQuotes = () => {
    let rnum = Math.floor(Math.random() * 1000);
    quotesData = realData[rnum];
    console.log(rnum);
    console.log(quotesData.text);
    quotes.innerText = `${quotesData.text}`;
    quotesData.author == null ?
        (author.innerText = "Developer") :
        (author.innerText = `${quotesData.author}`);
};

const getQuotes = async() => {
    loaderRun();
    const api = "https://type.fit/api/quotes";
    try {
        let data = await fetch(api);
        realData = await data.json();

        getNewQuotes();

        // console.log(realData[0].text);
        // console.log(realData[0].author);
        // console.log(realData.length);
    } catch (error) {}
    loaderStop();
};
newQ.addEventListener("click", getNewQuotes);
// newQ.addEventListener("click", randomColor);
tweetMe.addEventListener("click", TweetNow);
getQuotes();