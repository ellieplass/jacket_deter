
//these are all of the variables, and the arrays with the photos of the jackets
var inputBox;
var button_press = $("#go");
var back_pressed = $("#back");
var api_key = "237b7267de94ff66e91c8f49554ef28d";
var photos = ["jackets/rain_jacket.jpeg", "jackets/windbreaker.jpeg","jackets/snow_jacket.jpg", "jackets/denim_jacket.jpg", "jackets/light_jacket.jpeg", "jackets/puffer_jacket.jpeg"]
var mens_photos = ["jackets/rain_jacket_mens.jpg", "jackets/wind_breaker_mens.jpg", "jackets/snow_jacket_mens.jpg", "jackets/denim_jacket_mens.jpg", "jackets/light_jacket_mens.jpeg", "jackets/puffer_jacket_mens.jpg"
      
]
//here is where i coded the select menu, and made a constant for the selection
var sel_1 = ["Masculine", "Feminine"];
const sel_here = document.getElementById("gender");
    
  
var responseContent;
var parsed;

//this just make the back button not display until you get a result 
$("#back").css('display', 'none');

//this loops through the options for the selector and displays them to the page.
document.addEventListener('DOMContentLoaded', function(e){
   for (let i=0; i<sel_1.length; i++){
       let opt = document.createElement("option");
       
       opt.value=sel_1[i];
       opt.text=sel_1[i];
       
       sel_here.add(opt);
       
   } 
    
    
});    

//here is the function that happens when the go button is clicked
function goClicked()
{
    //this empties the zip code box, and gives the value selected in the selector a variable.
    $("#zip").empty();
    inputBox = $('#zip').val();  
    gender_select = sel_here.value;
    
    //here is the URL that is called to access the API itself
    var weather_url = 
        "http://api.openweathermap.org/data/2.5/weather?zip="+inputBox+",us&APPID="+api_key;
        
    
    //XMLHttpRequest is a system function, makes the browser call the URL
    httpRequest = new XMLHttpRequest();
    
    //if it doesnt work, log failure
    if(!httpRequest){
            console.log("request fail");
            return false;
    }
    
    //on the state change, call output function
    //this is causing it to go 4 times because it's running until it recieves a positive result (polling) just by nature of the request 

    httpRequest.onreadystatechange = output;
    
    //this actually calls the specific API URL
    httpRequest.open(
    "GET", weather_url
    );
    httpRequest.send();
    
    
    //if the status is not 200 (everything is not good) then it logs "oops" and appends it to display. it empties every time so that it only appears once 
    if(httpRequest.status != 200 )
    {
        
        console.log("oops here");
        $("#oops").empty();
        $("#oops").css('display', 'inline');

        $("#oops").append("Oops, sorry! No jacket for you.<br><br>");
    }
   

    //here it displays the output function below 
    output();
    
    
   
}


function output()
{
    
    //it's going to four, because four is bascially status 200
    console.log(httpRequest.readyState);
    
    //request was done
    if(httpRequest.readyState == XMLHttpRequest.DONE)
    //if the state is done, and it was positive/had content, then you do the things   
    {
            if(httpRequest.status == 200)//response status code is OK then it logs the response text 
            {
                responseContent = httpRequest.responseText;
//                console.log(responseContent);
            }
        }

    
    //turns jSON into more readable document
    parsed = JSON.parse(responseContent);
    //console.log(parsed);
    
    //just logs the JSON to the console
    console.log(parsed);
    
    //hides the inputs when button is pressed and there is a result 
    if(responseContent != null){
        $("#zip").empty();
        $("#zip").css('display', 'none');
        $("#go").css('display', 'none');
        $("#enter").css('display', 'none');
        $("#back").css('display', 'inline');
        $("#oops").css('display', 'none');
         $("#gender").css('display', 'none');

    }  
    //this shows what the weather is. the main description (aka, cloudy, rain, etc)
    $("#weath").empty();
    $("#weath").css('display', 'inline');
    $("#weath").append('Weather Summary: ' + parsed.weather[0].main);
    
    
 
  
    

    
   //determines what jacket is shown based on what the main weather is, temp, and bases it on what selector option was chosen  
   
    if(gender_select == "Feminine"){
        
           $("#photos").css("display", "inline");
      // for example, if the main is rain, it logs a raincoat  
    if (parsed.weather[0].main == "Rain"){
console.log("rain!"); 
        $("#photos").attr("src", photos[0]);
   }    
    else if (parsed.weather[0].main == "Clear" && parsed.main.temp > "288.7"){   
        $("#photos").attr("src", photos[3]);

   } 
    else if (parsed.weather[0].main == "Clear" && parsed.main.temp < "288.7" && parsed.main.temp > "280.372"){
         $("#photos").attr("src", photos[4]);

   } 
    else if (parsed.weather[0].main == "Clear" && parsed.main.temp < "280.372"){
         $("#photos").attr("src", photos[5]);
   } 
    else if (parsed.weather[0].main == "Snow"){
        $("#photos").attr("src", photos[2]);

   }
    else if (parsed.weather[0].main == "Clear" && parsed.wind[0].speed > "25"){
        $("#photos").attr("src", photos[1]);

    }
    else if(parsed.weather[0].main == "Clouds" && parsed.main.temp > "288.7"){
                 $("#photos").attr("src", photos[4]);
                $("#mama").css.backgroundImage(weather_pics[0]);
                
    }
    else if(parsed.weather[0].main == "Mist"){
                $("#photos").attr("src", photos[0]);

    } 
    else if(parsed.weather[0].main == "Clouds" && parsed.main.temp < "288.7"){
                 $("#photos").attr("src", photos[4]);
        $("#mama").css.backgroundImage(weather_pics[0]);
    } 
    else if(parsed.weather[0].main == "Haze"){
                         $("#photos").attr("src", photos[4]);

    } 

    
    //here is the same, just for "masculine"
    
}else if(gender_select == "Masculine"){
        
           $("#photos").css("display", "inline");
        
    if (parsed.weather[0].main == "Rain"){
console.log("rain!"); 
        $("#photos").attr("src", mens_photos[0]);
   }    
    else if (parsed.weather[0].main == "Clear" && parsed.main.temp > "288.7"){   
        $("#photos").attr("src", mens_photos[3]);

   } 
    else if (parsed.weather[0].main == "Clear" && parsed.main.temp < "288.7" && parsed.main.temp > "280.372"){
         $("#photos").attr("src", mens_photos[4]);

   } 
    else if (parsed.weather[0].main == "Clear" && parsed.main.temp < "280.372"){
         $("#photos").attr("src", mens_photos[5]);
   } 
    else if (parsed.weather[0].main == "Snow"){
        $("#photos").attr("src", mens_photos[2]);

   }
    else if (parsed.weather[0].main == "Clear" && parsed.wind[0].speed > "25"){
        $("#photos").attr("src", mens_photos[1]);

    }
    else if(parsed.weather[0].main == "Clouds" && parsed.main.temp > "288.7"){
                 $("#photos").attr("src", mens_photos[4]);
                $("#mama").css.backgroundImage(weather_pics[0]);
                
    }
    else if(parsed.weather[0].main == "Mist"){
                $("#photos").attr("src", mens_photos[0]);

    } 
    else if(parsed.weather[0].main == "Clouds" && parsed.main.temp < "288.7"){
                 $("#photos").attr("src", mens_photos[4]);
    } 
    else if(parsed.weather[0].main == "Haze"){
                         $("#photos").attr("src", mens_photos[4]);

    } 

    
    
    //here if someone selects neither, there's an error
} else if(gender_select != "Masculine" && gender_select != "Feminine"){
     
     $("#oops").append("Oops, sorry! Please select a style.");
     
 }   
    
    
    
    
}

//if the back button is pressed, original screen displays and result screen hides
function backPressed(){

    $("#back").css('display', 'none');
    $("#photos").css("display", 'none');
    $("#weath").css('display', 'none');
    $("#zip").empty();
    $("#zip").css('display', 'block');
    $("#go").css('display', 'block');
    $("#enter").css('display', 'block');
    $("#gender").css('display', 'block');

    
}

