window.addEventListener('load', function() {
     
    localStorage.removeItem('batsmen'); 
    localStorage.removeItem('blower');
});

'use strict';
class Batsman {
    constructor(name,strike,nonStrike) {
        this.name = name;
        this.runs = 0;
        this.balls = 0;
        this.fours = 0;
        this.sixes = 0;
        this.strikeRate=0.00;
        this.strike= strike;
        this.nonStrike=nonStrike;
        this.out=false;

    }

    addRuns(runs) {
        this.runs += runs;
    }

    addBalls(balls) {
        this.balls += balls;
    }

    addFours(fours) {
        this.fours += fours;
    }

    addSixes(sixes) {
        this.sixes += sixes;
    }
}

class Blower {
    constructor(name,isBlowing) {
        this.name = name;
        this.maiden=0;
        this.runs = 0;
        this.wickets = 0
        this.economy=0.00;
        this.isBlowing=isBlowing;
        this.overs=0;
        this.balls=0;


    }

    addRuns(runs) {
        this.runs += runs;
    }
    addOvers(over) {
        this.overs += over;
    }
    addBalls(ball) {
        this.balls += ball;
    }

    addWickets(wicket) {
        this.wickets += wicket;
    }

    addMaiden(maiden) {
        this.maiden += maiden;
    }

    addEconomy(economy) {
        this.economy += economy;
    }
}


//object for batsmen
let batsmen = {};

//
let blower={};
let  firstInningsBatting={};
let firstInningsBlowing={};

function addBatsman(batsmanName,strike,nonStrike) {
    if (!batsmen[batsmanName]) {
        batsmen[batsmanName] = new Batsman(batsmanName,strike,nonStrike);
    }
   localStorage.setItem('batsmen', JSON.stringify(batsmen));
    return batsmen[batsmanName];
}


function addBlower(blowerName,isBlowing) {
    if (!blower[blowerName]) {
        blower[blowerName] = new Blower(blowerName,isBlowing);
    }

   localStorage.setItem('blower', JSON.stringify(blower));
    return blower[blowerName];
}

function swapBatsmen(batsmen){
    Object.entries(batsmen).forEach(([name, batsman]) => {

        if (batsmen[name].strike){
            document.getElementById('onStrick').textContent=name + '*';
            document.getElementById('onRuns').textContent=batsmen[name].runs;
            document.getElementById('onballs').textContent=batsmen[name].balls;
            document.getElementById('onfours').textContent=batsmen[name].fours;
            document.getElementById('onsixes').textContent=batsmen[name].sixes;
            document.getElementById('onStrickrate').textContent=batsmen[name].strikeRate;
        }
        if(batsmen[name].nonStrike){
            document.getElementById('onNonStrick').textContent=name;
            document.getElementById('onNonRuns').textContent=batsmen[name].runs;
            document.getElementById('onNonballs').textContent=batsmen[name].balls;
            document.getElementById('onNonfours').textContent=batsmen[name].fours;
            document.getElementById('onNonsixes').textContent=batsmen[name].sixes;
            document.getElementById('onNonStrickrate').textContent=batsmen[name].strikeRate;
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Function to update the total score


    const storedBatsmen = localStorage.getItem('batsmen');
    const storedBlower = localStorage.getItem('blower');

    firstInningsBatting=JSON.parse(localStorage.getItem('firstInningsBatting'));
    firstInningsBlowing=JSON.parse(localStorage.getItem('firstInningsBlowing'));
   var fisrtInningsScore = parseInt(localStorage.getItem('fisrtInningsScore'));
   var fisrtInningsWickets = parseInt(localStorage.getItem('fisrtInningsWickets'));
    var totalOvers = localStorage.getItem('totalOvers');
    var hostTeam = localStorage.getItem('HostTeam');
   var visitorTeam = localStorage.getItem('VisitorTeam');
    var matchInfo= localStorage.getItem('tossWon');
    var totalovers= localStorage.getItem('totalOvers');
   var firstBattingteam = localStorage.getItem('firstBattingteam');
   var secondBattingteam = localStorage.getItem('secondBattingteam');

   
    
    if (firstInningsBatting==null){
        
    document.getElementById('fisrtInningsDetails').textContent= firstBattingteam +" , 1st inning";
    document.getElementById('matchdetails').textContent=matchInfo;
    }
    else{
        document.getElementById('fisrtInningsDetails').textContent= secondBattingteam +" , 2st inning";
       var currentovers=parseInt( document.getElementById('overs').textContent);
        var currectBalls = parseInt(document.getElementById('balls').textContent);
        var currentScore = parseInt(document.getElementById('totalScore').textContent);
         var Ballsover= currentovers*6 + currectBalls;
         document.getElementById('matchdetails').textContent= secondBattingteam + " still need " + (fisrtInningsScore-currentScore + 1 ) + " from " + ((totalovers *6)-Ballsover) + " balls.";
    


    }
    
    

   
    
    if (storedBatsmen) {
        batsmen = JSON.parse(storedBatsmen);
        Object.keys(batsmen).forEach(name => {
            batsmen[name] = new Batsman(name,batsmen[name].strike,batsmen[name].nonStrike);
            if (batsmen[name].strike){
                document.getElementById('onStrick').textContent=name + '*';
              
            }
            if(batsmen[name].nonStrike && !batsmen[name].out){
                document.getElementById('onNonStrick').textContent=name;
              
            }
        });
        
    }
    if(storedBlower){
        blower= JSON.parse(storedBlower);
     
        Object.keys(blower).forEach(name => {

            blower[name]= new Blower(name,blower[name].isBlowing);
            if(blower[name].isBlowing){
                document.getElementById('isBlowing').textContent=name;
            }
        });
    }
    
   
    let runsInOver=0;
   
    const updateScore = (runs) => {



 
        
      const totalScoreSpan = document.getElementById('totalScore');
      const wicketsspan = document.getElementById('wickets');
      const extrasSpan = document.getElementById('extras');
      const ballsSpan = document.getElementById('balls');
    
      const oversSpan = document.getElementById('overs');
      const crrSpan = document.getElementById('crr');
      let totalScore = parseInt(totalScoreSpan.textContent);
      let extras = parseInt(extrasSpan.textContent);
      let wickets=parseInt(wicketsspan.textContent);
      let balls = parseInt(ballsSpan.textContent);
     
      let overs = parseInt(oversSpan.textContent);
      let crr = parseInt(crrSpan.textContent);


    let overcompleted=false;
      let ballcount= false;
      let count=0;
      let extracount=false;
      let out=false;
       runsInOver = runsInOver + runs;
       let runsPerBallBlower=runs;
      // Check for extras
      const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked && (checkbox.value === 'Wide' || checkbox.value === 'No Ball')) {
          extras += 1; // Update extras
          runs += 1; // Add an extra run for Wide or No Ball
          ballcount=false;
            extracount=true;
            runsInOver+=1;
            runsPerBallBlower+=1;
      }
      if (checkbox.checked && (checkbox.value === 'Wicket')) {
          ballcount=true;
        wickets +=1;
        out=true;
  
      }
      if ( checkbox.checked && (checkbox.value === 'Runs' )) {
         
          ballcount=true;
     
  
      }
        if (checkbox.checked && (checkbox.value === 'Byes' || checkbox.value === 'Leg Byes')) {
          extras += runs; // Update extras
          ballcount=true;
    
          
        }
        
        if (!checkbox.checked ){
          count+=1
          
        }
        
  
  
        checkbox.checked=false;
      });
      if ( ballcount || count == 6){
  
          if (balls<5){
              balls +=1;
  
          } 
        else{
          balls =0;
          overs+=1;
          overcompleted=true;
        }
        
      }




        //adding runs to player
        var playerstrick;
        var playernonstrick;
        Object.entries(batsmen).forEach(([name, batsman]) => {
       
            if (batsman.strike){
                playerstrick=batsman;
                if(extracount){
                    batsmen[name].addRuns(runs-1)
                }
                else{
                    batsmen[name].addRuns(runs) 
                }
                
                if(runs == 4){
                    batsmen[name].addFours(1);  
                }
                if(runs == 6){
                    batsmen[name].addSixes(1);  
                }
                if(ballcount || count == 6){
                    batsmen[name].addBalls(1);
                }
                batsmen[name].strikeRate= (batsman.runs *100 /batsman.balls).toFixed(2);

                document.getElementById('onRuns').textContent=batsmen[name].runs;
                document.getElementById('onballs').textContent=batsmen[name].balls;
                document.getElementById('onfours').textContent=batsmen[name].fours;
                document.getElementById('onsixes').textContent=batsmen[name].sixes;
                document.getElementById('onStrickrate').textContent=batsmen[name].strikeRate;
               
            }
       
            if (batsman.nonStrike){
                playernonstrick=batsman;
            }
            
        
        });
        let blowlingover;
        Object.entries(blower).forEach(([name, blowing]) => {
            if(blower[name].isBlowing){
                blowlingover=blowing;
                if(overcompleted){
                    document.getElementById('bovers').textContent= parseInt(document.getElementById('bovers').textContent)+1;
                    blower[name].addOvers(1);
                    blower[name].balls=balls.toString();
                    if(runsInOver==0){
                        blower[name].addMaiden(1);
                        document.getElementById('maiden').textContent=blower[name].maiden;
                        

                    }
                    runsInOver=0;

                }
                blower[name].addRuns(runsPerBallBlower);
                document.getElementById('bruns').textContent=blower[name].runs;

                if(out){
                    blower[name]. addWickets(1);
                    document.getElementById('bwickets').textContent=blower[name].wickets;
                }
                blower[name].economy= ((blower[name].runs) / (blower[name].overs + balls / 6 )).toFixed(2);
                
                document.getElementById('economy').textContent=blower[name].economy;
               blower[name].balls=balls.toString();
            }
        });

         // Update scores
         totalScore += runs;
         //calculating runrate
         crr= (totalScore * 6 )/ (overs * 6 + balls);
         crr= crr.toFixed(2);

         document.getElementById('bballs').textContent= balls.toString();
        totalScoreSpan.textContent = totalScore.toString();
        extrasSpan.textContent = extras.toString();
        wicketsspan.textContent= wickets.toString();
        oversSpan.textContent=overs.toString();
        ballsSpan.textContent=balls.toString();
        crrSpan.textContent=crr.toString();
      

        //swapping strike
        if (extracount && (runs == 2 || runs == 4 || runs == 6)){
            playerstrick.strike=false;
            playerstrick.nonStrike=true;
            playernonstrick.strike=true;
            playernonstrick.nonStrike=false;
           
         
            swapBatsmen(batsmen)

        }
        if(!extracount && (runs == 1 || runs == 3 || runs == 5) ){
            playerstrick.strike=false;
            playerstrick.nonStrike=true;
            playernonstrick.strike=true;
            playernonstrick.nonStrike=false;
            swapBatsmen(batsmen)
        }
        
  
            if ( balls=0){
                playerstrick.strike=false;
                playerstrick.nonStrike=true;
                playernonstrick.strike=true;
                playernonstrick.nonStrike=false;
              

                swapBatsmen(batsmen)
    
              
            }
          
        
        ballcount=false;
        count=0;

     if(out){
        document.getElementById("newBatsmanForm").style.display = "block";
     }
     if(overcompleted){

        document.getElementById("blowerForm").style.display = "block";

        document.getElementById("newBlowerName").value = "";
        document.getElementById("existingBlowers").value = "";

        const blowerForm = document.getElementById('blowerForm');
        const existingBlowerSelection = document.getElementById('existingBlowerSelection');
        const newBlowerEntry = document.getElementById('newBlowerEntry');
        const blowerTypeRadios = document.getElementsByName('blowerType');
        existingBlowerSelection.style.display = 'none';
        newBlowerEntry.style.display = 'block';
    
        function toggleBlowerInput() {
            if (blowerTypeRadios[0].checked) {
                existingBlowerSelection.style.display = 'none';
                newBlowerEntry.style.display = 'block';
                
            } else {
                existingBlowerSelection.style.display = 'block';
                newBlowerEntry.style.display = 'none';
                populateExistingBlowers();
            }
        }
    
        for (let radio of blowerTypeRadios) {
            radio.addEventListener('change', toggleBlowerInput);
        }


        
    function populateExistingBlowers() {
        // Example data
        
           const existingBlowersSelect = document.getElementById('existingBlowers');
           existingBlowersSelect.innerHTML = '';
           Object.entries(blower).forEach(([name, blowing]) => {
                if(!blower[name].isBlowing){
                   const option = document.createElement('option');
                   option.value = name;
                   option.textContent = name;
                   existingBlowersSelect.appendChild(option);
                    }
   
           });
       }

      




       document.getElementById('blowerSelectionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        blowlingover.isBlowing=false;
        const blowerTypeRadios = document.getElementsByName('blowerType');
        if (blowerTypeRadios[1].checked) {
            // Existing Blower is selected

            let selectedBlower = document.getElementById('existingBlowers').value.trim();

     


            Object.keys(blower).forEach(name => {
              
              
                if(blower[name].name == selectedBlower){
              
                 blower[name].isBlowing=true;
                 
    
                }
            });
            
        } else {
            // New Blower is selected
            let newBlowerName = document.getElementById('newBlowerName').value.trim();

            blower[newBlowerName]= new Blower(newBlowerName,true);
          
        }
        document.getElementById('blowerForm').style.display = 'none';



        Object.keys(blower).forEach(name => {
            if(blower[name].isBlowing){
         
                document.getElementById('isBlowing').textContent=name;
                document.getElementById('bovers').textContent=blower[name].overs;
                document.getElementById('maiden').textContent=blower[name].maiden;
                document.getElementById('bwickets').textContent=blower[name].wickets;
                document.getElementById('economy').textContent=blower[name].economy;
                document.getElementById('bruns').textContent=blower[name].runs;
            }
        });
    });

     }
     var matchover = false;
     if(firstInningsBatting!=null) {
        document.getElementById('fisrtInningsDetails').textContent= secondBattingteam +" , 2st inning";
        currentovers=parseInt( document.getElementById('overs').textContent);
        currectBalls = parseInt(document.getElementById('balls').textContent);
        currentScore = parseInt(document.getElementById('totalScore').textContent);
        currentwickets = parseInt(document.getElementById('wickets').textContent);
        Ballsover= currentovers*6 + currectBalls;
         document.getElementById('matchdetails').textContent= secondBattingteam + " still need " + (fisrtInningsScore-currentScore + 1) + " runs from " + ((totalovers *6)-Ballsover) + " balls.";
    
         if ((fisrtInningsScore-currentScore +1 ) <= 0 ){
            matchover = true
            // alert(secondBattingteam + ' won the match !!!');
            document.getElementById('matchSummary').textContent=secondBattingteam + ' won the match !!!'
            
            displayScorecard();
            document.getElementById("closematch").style.display = "none";
        }
        if ((currentovers == totalovers) && (fisrtInningsScore-currentScore +1) > 1 ){
            matchover = true
            // alert(firstBattingteam + ' won the match !!!');
            document.getElementById('matchSummary').textContent=firstBattingteam + ' won the match !!!'
           
            displayScorecard();
            document.getElementById("closematch").style.display = "none";
        }
        if ((currentovers == totalovers) && (fisrtInningsScore-currentScore + 1) == 1 ){
            matchover = true
            // alert( 'Both teams scores are equal , match tie !!!');
            document.getElementById('matchSummary').textContent= ' Both teams scores are equal , match tie !!!'
           
            displayScorecard();
            document.getElementById("closematch").style.display = "none";
        }
        if(currentwickets == 11){
            matchover = true
            // alert(firstBattingteam + ' won the match !!!');
            document.getElementById('matchSummary').textContent=firstBattingteam + ' won the match !!!'

            
            displayScorecard()
            document.getElementById("closematch").style.display = "none";
        }


    }

    
    currentovers=parseInt( document.getElementById('overs').textContent);

    console.log(totalovers,currentovers,currentovers == totalovers)
    if(currentovers == totalovers && !matchover){
 
        InningsCompleted();

    }


   
    
    };
  
    // Attach click event listeners to run buttons
    const runButtons = document.querySelectorAll('.run-button');
    runButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const runs = parseInt(e.target.textContent);
        updateScore(runs);
        
      });
    });
  });

  
function submitNewBatsman() {
    const outBatsmanName = document.getElementById("outBatsmanName").value.trim();
    const newBatsmanName = document.getElementById("newBatsmanName").value.trim();

    batsmen[newBatsmanName] = new Batsman(newBatsmanName,batsmen[outBatsmanName].strike,batsmen[outBatsmanName].nonStrike);
    batsmen[outBatsmanName].strike=false;
    batsmen[outBatsmanName].nonStrike=false;
    batsmen[outBatsmanName].out=true;
    swapBatsmen(batsmen);


   

    // // Retrieve the ID of the batsman who got out
    // const batsmanId = sessionStorage.getItem('outBatsmanId');

    // // Update the batsman's name in the display
    // document.getElementById(batsmanId).innerText = `Batsman: ${newBatsmanName}`;

    // Hide the form again
    document.getElementById("newBatsmanForm").style.display = "none";

    // // Clear the form input
    document.getElementById("newBatsmanName").value = "";
    document.getElementById("outBatsmanName").value = "";
}


document.addEventListener('submit', function(event) {
  
   
    const strikerName = document.getElementById('striker').value.trim();
    const nonStrikerName = document.getElementById('nonStriker').value.trim();
    const openingBowlerName = document.getElementById('openingBowler').value.trim();


    if (strikerName) {
        addBatsman(strikerName,true,false);
      
    }
    if (nonStrikerName) {
        addBatsman(nonStrikerName,false,true);
        
    }

    if(openingBowlerName){
      
        addBlower(openingBowlerName,true);
    }

    
    document.getElementById('striker').value = '';
    document.getElementById('nonStriker').value = '';
    document.getElementById('openingBowler').value = '';
});




var playerStrick;
var playerNonStrick;
function addswap(){

    Object.entries(batsmen).forEach(([name, batsman]) => {
       
        if (batsman.strike){
            playerStrick=batsman;          
        }
   
        if (batsman.nonStrike){
            playerNonStrick=batsman;
        }
        
    
    });
    playerStrick.strike=false;
    playerStrick.nonStrike=true;
    playerNonStrick.strike=true;
    playerNonStrick.nonStrike=false;


    swapBatsmen(batsmen);
}


function displayScorecard() {
  

    const scorecardDiv = document.getElementById('scorecard');
    var currentScore = parseInt(document.getElementById('totalScore').textContent);
    var currentWickets = parseInt(document.getElementById('wickets').textContent);
    scorecardDiv.innerHTML = '';  // Clear existing scorecard informatchSetupFormion

    // Create a table with a close button
    let table = '<div><button onclick="closeTable()" style="float: right; margin: 2px;">×</button></div>';
    if ((firstInningsBatting==null)){

        table += `<div style="margin-top: 20px; margin-bottom: 10px; text-align: center; font-size: 20px; font-weight: bold;">First Innings Scorecard : ${currentScore} - ${currentWickets}</div>`;
    }
    else{
        table += `<div style="margin-top: 20px; margin-bottom: 10px; text-align: center; font-size: 20px; font-weight: bold;">Second Innings Scorecard : ${currentScore} - ${currentWickets}</div>`;

    }

    table += '<table border="1" style="width: 100%;"><tr><th>Batsman</th><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th><th>SR</th></tr>';

    Object.entries(batsmen).forEach(([name, batsman]) => {

        table += `<tr><td>${name}</td><td>${batsmen[name].runs}</td><td>${batsmen[name].balls}</td><td>${batsmen[name].fours}</td><td>${batsmen[name].sixes}</td><td>${batsmen[name].strikeRate}</td></tr>`;
    });

    table += '</table>';
     
    table += '<table border="1" style="width: 100%;"><tr><th>Blower</th><th>O</th><th>M</th><th>R</th><th>W</th><th>ER</th></tr>';

    Object.entries(blower).forEach(([name, blowing]) => {

        table += `<tr><td>${name}</td><td>${blower[name].overs} . ${blower[name].balls} </td><td>${blower[name].maiden}</td><td>${blower[name].runs}</td><td>${blower[name].wickets}</td><td>${blower[name].economy}</td></tr>`;
    });

    table += '</table>';



    if (!(firstInningsBatting==null)){
        var fisrtInningsScore = parseInt(localStorage.getItem('fisrtInningsScore'));
        var fisrtInningsWickets = parseInt(localStorage.getItem('fisrtInningsWickets'));
        table +=`<div style="margin-top: 20px; margin-bottom: 10px; text-align: center; font-size: 20px; font-weight: bold;">First Innings Scorecard  : ${fisrtInningsScore} - ${fisrtInningsWickets}</div>`;
        table += '<table border="1" style="width: 100%;"><tr><th>Batsman</th><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th><th>SR</th></tr>';

        Object.entries(firstInningsBatting).forEach(([name, batsman]) => {
       
            table += `<tr><td>${name}</td><td>${firstInningsBatting[name].runs}</td><td>${firstInningsBatting[name].balls}</td><td>${firstInningsBatting[name].fours}</td><td>${firstInningsBatting[name].sixes}</td><td>${firstInningsBatting[name].strikeRate}</td></tr>`;
        });
    
        table += '</table>';
    }

    if (!(firstInningsBlowing==null)){

        table += '<table border="1" style="width: 100%;"><tr><th>Blower</th><th>O</th><th>M</th><th>R</th><th>W</th><th>ER</th></tr>';

        Object.entries(firstInningsBlowing).forEach(([name, blowing]) => {
           
            table += `<tr><td>${name}</td><td>${firstInningsBlowing[name].overs} . ${firstInningsBlowing[name].balls} </td><td>${firstInningsBlowing[name].maiden}</td><td>${firstInningsBlowing[name].runs}</td><td>${firstInningsBlowing[name].wickets}</td><td>${firstInningsBlowing[name].economy}</td></tr>`;
        });
    
        table += '</table>';
    }

    
  


    // Update the innerHTML of the scorecard div to show the table and the close button
    scorecardDiv.innerHTML = table;
}

// Function to close the table
function closeTable() {
    document.getElementById('scorecard').innerHTML = '';  // Clear the scorecard div
}

function InningsCompleted (){
    var fisrtInningsScore = parseInt(document.getElementById('totalScore').textContent);
    var fisrtInningsWickets = parseInt(document.getElementById('wickets').textContent);
    
    firstInningsBatting=batsmen;
    firstInningsBlowing=blower;
    batsmen={}
    blower={}
    localStorage.setItem('firstInningsBatting', JSON.stringify(firstInningsBatting));
    localStorage.setItem('firstInningsBlowing', JSON.stringify(firstInningsBlowing));
    localStorage.setItem('fisrtInningsScore',fisrtInningsScore);
    localStorage.setItem('fisrtInningsWickets',fisrtInningsWickets);

    alert('innings completed ! , Click Ok to start the second innings');

    window.location = 'playerSelection.html';
}
function MatchCompleted(msg){
  
   localStorage.clear()
    localStorage.removeItem('firstInningsBatting'); 
    localStorage.removeItem('firstInningsBlowing');
    window.location = 'index.html';


}


function startMatch() {

    
    
    
    // Retrieving input values
    var hostTeam = document.getElementById('hostTeam').value.trim();
    var visitorTeam = document.getElementById('visitorTeam').value.trim();
    var overs = parseInt(document.getElementById('overs').value.trim());
    
    // Checking radio selections for toss and opted decision
    var tossWinner = document.querySelector('input[name="tossWinner"]:checked');
    var optedChoice = document.querySelector('input[name="opted"]:checked');

    // Validate input fields
    if (!hostTeam || !visitorTeam) {
        alert("Please enter both host and visitor team names.");
        return; // Stop further execution
    }

    if (!tossWinner || !optedChoice) {
        alert("Please complete all selections for toss and opted choice.");
        return; // Stop further execution
    }

    if (isNaN(overs) || overs <= 0) {
        alert("Please enter a valid number of overs.");
        return; // Stop further execution
    }

    // Prepare and display match settings confirmation
    var matchInfo;
    var  firstBattingteam;

    var secondBattingteam ;

    if (tossWinner.id === 'host'){
        if (optedChoice.id === 'bat'){
           firstBattingteam = hostTeam;
           secondBattingteam = visitorTeam;
        }
        else{
             firstBattingteam = visitorTeam;
             secondBattingteam = hostTeam;
        }
    }
    else{
        if (optedChoice.id === 'bat'){
            firstBattingteam = visitorTeam;
            secondBattingteam = hostTeam;
         }
         else{
              firstBattingteam = hostTeam;
              secondBattingteam = visitorTeam;
         }

    }

    
    matchInfo = (tossWinner.id === 'host' ? hostTeam : visitorTeam) + " won the toss and Opted to " + (optedChoice.id === 'bat' ? "Bat" : "Bowl") + "first. " + "\n";
  

   


    localStorage.setItem('HostTeam', hostTeam);
    localStorage.setItem('VisitorTeam', visitorTeam);
    localStorage.setItem('tossWon', matchInfo);
    localStorage.setItem('totalOvers',overs);

    localStorage.setItem('firstBattingteam',firstBattingteam);
    localStorage.setItem('secondBattingteam',secondBattingteam);


}

