$(document).ready(function(event) {
  //console.log("the first this is:",this);
  let input = 0;
  $("textarea").on("keydown",function() {
   // console.log("the second this is:",this);
    input = this.value;
    console.log(input.length);
    $(".counter").text(140 - input.length -1);
  //  console.log(input.length);


  });

  $(".counter").on("change", function() {

    if(input.length > 140) {
      this.css("color","red");
    } else {
      this.css("color","black");
    }

  });

  $("form").on("submit", (a)=> {
    alert("form, submit got triggered");
    a.preventDefault();

    let text = $("textarea").val();
    let length = text.length;
    if(length > 140) {
      alert("less than 140 character pls");
    }
    if(!length) {
      alert("please enter something");
    }
  });


});
