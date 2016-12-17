function getQuote (callback){
var quotes = ["GO FUCKING WORK.","FUCK YOU. WORK.", "TICK TOCK. FUCKING WORK.", "YOU'RE DYING SOON. WORK.","REMEMBER WORK? FUCKING DO IT.","WORK YOU FUCKING FAILURE.","FUCKING WORK. NOW.","WHAT THE FUCK? GO WORK.","WORK YOU FUCKITY FUCK.", "YOU LOSER. FUCKING WORK."];
                var min = 0;
                var max = quotes.length-1;
                callback(quotes[Math.floor(Math.random() * (max - min + 1)) + min]);            
}