let lastPrompt = "";

// Função que adiciona efeito de "typing"
function typeEffect(element, speed) {
    let text = $(element).text();
    $(element).html('');
    let i = 0;
    let timer = setInterval(() => {
        if (i < text.length) {
            $(element).append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

$("#submit-button").click(function() {
  let question = $("#question").val();
  if (question === "") {
      $("#answer").text("Por favor, você precisa digitar algo para que eu possa entender...");
      return;
  } else {
      $("#answer").text("");
  }
  $("#question-display").text(question);
  if (question === lastPrompt) {
      question += Math.floor(Math.random() * 10);
  }
  lastPrompt = question;
  $("body").addClass("loading");
  $("#loading-indicator").show();
  $.ajax({
      type: "POST",
      url: "http://10.0.1.100:5500/answer",
      data: JSON.stringify({ "question": question, "language": "pt" }),
      contentType: "application/json",
      success: function(response) {
      $("#answer").text(response);
      $("body").removeClass("loading");
      $("#loading-indicator").hide();
      setTimeout(function(){
          typeEffect($("#answer"), 20);
      }, 0);
      },
      error: function(error) {
      console.log(error);
      $("body").removeClass("loading");
      $("#loading-indicator").hide();
      }
  });
});
