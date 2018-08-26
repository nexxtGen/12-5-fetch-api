'use-strict';

//Vars
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";


//Functions

// --- function get random quote from API quotes and run createTweet function
function getQuote() {
    fetch(prefix + quoteUrl, { cache: 'no-store'})
        .then(function(resp){
            return resp.json();
        })
        .then(createTweet);
}
// --- Create tweet and pin it to tweet button
function createTweet(input){
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unkown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
}
// generate quote when load page and add listener to trigger button
document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});
