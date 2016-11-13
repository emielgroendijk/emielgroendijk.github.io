            $(document).ready(function() {

              var colors = ["#FF7043", "#D4E157", "#66BB6A", "#26C6DA", "#29B6F6", "#5C6BC0", "#7E57C2", "#EC407A", "#EF5350"];
              var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
              var colorCheck = 0;
              var color, quote, author;

              function colorUpdate() {
                                do {
                  color = colors[Math.floor(Math.random() * colors.length)];
                } while (color === colorCheck);
                colorCheck = color;
                $("body").animate({
                  backgroundColor: color
                }, {duration: 1000, queue: false});
                $(".colorChange").animate({
                  color: color
                }, {duration: 1000, queue: false});
                $(".backgroundChange").animate({
                  backgroundColor: color
                }, {duration: 1000, queue: false});
                //$(".colorChangeText").css("color", color);
              }

              function newQuote() {
                $.getJSON(url, function(data) {
                  console.log(data);
                  quote = data.quoteText;
                  if (data.quoteAuthor.length > 0)
                    author = data.quoteAuthor;
                  else
                    author = "Unkown";
                  $(".quoteText").html(quote);
                  $(".authorText").html(author);

                });
              }

              $("#twitter").click(function() {
                //quote = truncateString(quote, );
                quote = quote.trim();
                quote = '"' + quote + '"';
                if ((quote.length + author.length + 3) > 140) {
                  quote = truncateString(quote, (140 - (author.length + 3)));
                }
                quote = quote.replace(/;/g, "%3B");
                window.open("https://twitter.com/intent/tweet?text=" + quote + ' - ' + author);
              });

              function truncateString(str, num) {
                var result = "";
                if (num < 3)
                  for (i = 0; i < num; i++)
                    result += str[i];
                else if (num < str.length)
                  for (i = 0; i < (num - 3); i++)
                    result += str[i];
                else if (num >= str.length)
                  return str;
                return result += "...";
              }

              function old() {
                $(".quoteText").fadeTo(500, 0.01);
                $(".authorText").fadeTo(500, 0.01);
                $(".fa-quote-left").fadeTo(500, 0.01);
                $(".author").fadeTo(500, 0.01);
              }

              function back() {
                $(".quoteText").delay(100).fadeTo(500, 1);
                $(".authorText").delay(100).fadeTo(500, 1);
                $(".fa-quote-left").delay(100).fadeTo(500, 1);
                $(".author").delay(100).fadeTo(500, 1);
              }

              function changeQuote() {
                setTimeout (function() {
                  old();
                  colorUpdate();
                  setTimeout(function() {
                    newQuote();
                    back();
                  }, 500);
                },800);
              }

              $("#newQuote").click(function() {
                changeQuote();
              });

              window.onload = changeQuote();
            });