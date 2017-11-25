$(document).ready(function(){

    // SIDAN LADDAS

     // Sätt user pass och visa default sidor

     var ourUser = "janne";
     var ourPassword = "password";
     
     $(".forgotForm").hide();
     $(".loginForm").show();
     $(".logOutForm").hide();
     $(".welcomePage").show();
     $(".helloPage").hide();

        // Vi sätter en array och sparar i en session, kolla först om den är tom innan vi skapar den

            if (sessionStorage.doList == null) {
                        
                var stuffToDo = [
                "Klipp gräset", 
                "Betala räkningar",
                "Köp mjölk", 
                "Spika upp tavlor"
                ];
                            
                        var json_str = JSON.stringify(stuffToDo);
                        sessionStorage.doList = json_str;
                    }; 
//
// IF
//

         // Kolla om userId är satt när sidan laddas, visa då inlogg, annars visa hej sida

         if (sessionStorage.userId != null ) {
            
                // Kör funktionen visa hej sida
                showHelloUserPage();
            
            } else { 
            
                // Visa inte inloggad state
            
                   
                // LOGGA IN KNAPP

                $(".loginButton").click(function(){
                                    
                        if (ourUser == $(".userEmail").val() && ourPassword == $(".userPassword").val()) {
            
                                // Dölj inlogg Visa hello
            
                                sessionStorage.setItem("userId", $(".userEmail").val() );
            
                                showHelloUserPage();
            
                        } else {
            
                                    // Dölj inlogg visa forgotPass
            
                                        $(".loginForm").hide();
                                        $(".forgotForm").show();
            
                                }
            
                    });
            
            };

// *
// FUNCTIONS
// *

    // funktion för att visa inloggad user
    function showHelloUserPage(){
        
    // Vilka sidor som skall visas när vi är inloggade
    $(".loginForm").hide();
    $(".logOutForm").show();
    $(".forgetForm").hide();
    $(".helloPage").show();
    $(".welcomePage").hide();
        
$(".hejString").append( sessionStorage.getItem("userId") );

printTodoList()
};

// Skriv ut Todo Listan

function printTodoList(){

var loopArr = JSON.parse(sessionStorage.doList);
        
// Loopa alla att göra
printList = "<ul>";
for(var i = 0; i < loopArr.length; i++) {
printList += "<li><a class='listLink' onClick='deleteTodoItem("+ i +")'>" + loopArr[i] + " <i class='listItem fa fa-square-o'></i> </a></li>";

}

printList = printList + "</ul>";
console.log(printList)

$("#visaTodoList").html(printList);

}

            // Lägg till ett nytt todo item i listan
 
            $(".addNewTodoItemButton").click(function(){

                var parseTodoArray = JSON.parse(sessionStorage.doList);

               
                parseTodoArray.push( $(".newTodoItem").val() );
               
                //printCarsList();

                var json_str = JSON.stringify(parseTodoArray);
                sessionStorage.doList = json_str;

                printTodoList();

            });   
                  
            // Radera ett todo item

            deleteTodoItem = function(i) {
                
                // HÄMTA LISTAN
                var parseTodoArray = JSON.parse(sessionStorage.doList);
                
                // RADERA UPPGIFT
                parseTodoArray.splice(i,1);
                
                // SPARA OM LISTAN
                var json_str = JSON.stringify(parseTodoArray);
                sessionStorage.doList = json_str;
            
                printTodoList();
                        
            }

    // LOGGA UT

        $(".logOutButton").click(function(){
            sessionStorage.removeItem("userId");
            location.reload();
        });

        

});
