/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// sample ------ var $tweet = $("<article>").addClass("tweet");  --------



$(document).ready(() => {

  // $("button").slideUp("fast");

  function CreateHeader(img, name, handle) {
    var $header = $("<header>");
    var $span = $("<span>");
    var $img = $("<img>").addClass("tweet").attr('src',img);
    var $name = $("<p>").text(name);
    var $span_handle = $("<span>").addClass("handle").text(handle);

    $span.append($img,$name);
    $header.append($span, $span_handle);
    console.log("header is:",$header);
    return $header;
  }

  function CreateBody(content) {
    var $body = $('<p>').text(content);
    console.log("body is:",$body);
    return $body;
  }

  function CreateFooter(timestamp) {
    var time = moment(timestamp).fromNow();
    var $footer = $('<footer>');
    var $span = $('<span>').text(time);
    var $img = $('<i>').addClass('fa fa-heart').attr("aria-hidden",'true').data('like','0');
    $footer.append($span);
    $footer.append($img);

    return $footer;
  }

  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('article-tweet');

    var img = tweet.user.avatars.regular;
    var name = tweet.user.name;
    var handle = tweet.user.handle;
    var content = tweet.content.text;
    var time = tweet.created_at;
    var $header = CreateHeader(img,name,handle);
    var $body = CreateBody(content);
    var $footer = CreateFooter(time);


    $tweet.append($header, $body , $footer );
    console.log("the full tweet is",$tweet);
    return $tweet;
  }

  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    tweets.forEach( (tweet) => {
      $(".tweet").append((createTweetElement(tweet))); // do something with it
    })
    likeTweet();  // add .on method to all 'heart icon', it has to be done after all ele are rendered
  }

  function loadTweets() {
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    })
  }

  function submitTweet() {
    $("form").on("submit", (a) => {
      a.preventDefault();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $("form").serialize(),
        success: loadTweets
          // body...
        })

      console.log($("form").serialize());
    })
  }

  function composeTweet() {
    $("button").click(()=> {
      $("form").toggle("fast");
      $("textarea").focus();
      $("form").select();
    })

    $("button").hover( ()=> {
      $('button').css('color','red');
    }, () => {
      $('button').css('color','black');
    })
  }

  function likeTweet(){

  }

  composeTweet();
  console.log("composing tweet");
  submitTweet();
  console.log("submitting");
  loadTweets();
  console.log("loggin");
});



