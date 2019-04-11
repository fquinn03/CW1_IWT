$(document).ready(function(){
resetForms()

//reset the greyed out fields on load or reset
function resetGreyedOut(){
	$("#selectPlayerNameOperator").prop("disabled", true);
	$("#selectRoundOperator").prop("disabled", true);
	$("#selectNumOfSetsOperator").prop("disabled", true);
	$("#selectPlayerName").prop("disabled", true);
	$("#selectNumOfSets").prop("disabled", true);
	$("#roundSelect").prop("disabled", true);
}

//function to go through each form field and reset
function resetForms() {
    for (i = 0; i < document.getElementById('myForm').length; i++) {
        document.getElementById('myForm').reset();
    }
	table.innerHTML = "";
	resetGreyedOut();
}

//get the table element 
function getTable(){
	var table = document.getElementById("table");
	return table;
}
//get the tournament selected by the user
function getTournament(){
	var tournament = document.getElementById("tournamentSelect").value
	return tournament;
}

//filter by player name
//if user input is not a susbstring of players name remove players name
function myNameFilter(playersName, userInput, operator){
	
	if((operator === 'equals' && userInput ==="") || (operator === 'contains' && userInput ==="")){
		return false;
	}
	
	if(operator === 'none' || operator === 'na'){
		return true;
	}
	
	if(playersName !== "" && playersName.toLowerCase().includes(userInput.toLowerCase())&& operator === 'contains'){
		return true;
	}
	
	if(playersName !== "" && playersName.toLowerCase() === userInput.toLowerCase() && operator === 'equals'){
		return true;
	}
	else{
		return false;
	}
}

//filter the data by whether or not the match has criteria
//equal to the criteria selected by the user
function myFilter(matchCriteria, selectedCriteria, operator){
	if(operator === 'na'){
		return true;
	}
	
	if(operator === 'equals' && matchCriteria == selectedCriteria){
		return true;
	}
	if(operator === 'greaterThan' && matchCriteria > selectedCriteria){
		return true;
	}
	if(operator === 'lessThan' && matchCriteria < selectedCriteria){
		return true;
	}
	else{
		return false;
	}
}

//EventHandlers

//if no tournament is selected return nothing
//else return data
$("#resetButton").click(function(){
	resetForms();
})

$("#searchButton").click(function(){
	if(getTournament() === 'na'){
		table.innerHTML = ""
	}
	
	else{
		outputData();
	}
})

//if we change back to no tournament return nothing and
//disable dropdowns for advanced filtering
//else enable the dropdown menus for advanced filtering
$("#tournamentSelect").change(function(){
	if($(this).val() === 'na'){
		resetForms();
		table.innerHTML = "";
	}
	else{
		$("#selectPlayerNameOperator").prop("disabled", false);
		$("#selectRoundOperator").prop("disabled", false);
		$("#selectNumOfSetsOperator").prop("disabled", false);
	}
})

//if user wants to search by name/part of name
//enable selectPlayerName input
$("#selectPlayerNameOperator").change(function(){
	if($(this).val() !== 'na'){
		$("#selectPlayerName").prop("disabled", false);
		
		if($(this).val() === 'none'){
			$("#selectPlayerName").val('');
			$("#selectPlayerName").prop("disabled", true);
		}

	}
	else{
		$("#selectPlayerName").val('');
		$("#selectPlayerName").prop("disabled", true);
	}
})

//Error checking
//check if greaterThan, lessThan or equals is selected
//ensure set number dropdown consistent search criteria
//if user wants to search by round
//enable roundSelect menu
//else reset roundSelect and disable roundSelect dropdown

$("#selectRoundOperator").change(function(){
	if($(this).val() !== 'na'){
		$("#roundSelect").prop("disabled", false);
		
		if($(this).val() === "greaterThan"){
			$("#roundSelect").empty();
			$("#roundSelect").append($('<option></option>').val("na").html("-- Round Number --"));
			for(i=1; i<7; i++){
				$("#roundSelect").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "lessThan"){
			$("#roundSelect").empty();
			$("#roundSelect").append($('<option></option>').val("na").html("-- Round Number --"));	
			for(i=2; i<8; i++){
				$("#roundSelect").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "equals"){
			$("#roundSelect").empty();
			$("#roundSelect").append($('<option></option>').val("na").html("-- Round Number --"));
			for(i=1; i<8; i++){
				$("#roundSelect").append($('<option></option>').val(i).html(i));
			}
		}
	}
	else{
		$("#roundSelect").val('na');
		$("#roundSelect").prop("disabled", true);
	}
})

//Error checking
//check if womens or mens tournament
//check if greaterThan, lessThan or equals is selected
//ensure set number dropdown consistent with 
//3 sets for women and 5 sets for men

//if user wants to search by set
//enable roundSelect menu
//else reset roundSelect and disable roundSelect dropdown

$("#selectNumOfSetsOperator").change(function(){
	if($(this).val() !== 'na'){
		$("#selectNumOfSets").prop("disabled", false);
		
		if($(this).val() === "equals" && getTournament() == 'wimbledon-women-2013.json'){
			$("#selectNumOfSets").empty();
			$("#selectNumOfSets").append($('<option></option>').val("na").html("--Number Of Sets--"));
			for(i=2; i<4; i++){
				$("#selectNumOfSets").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "greaterThan" && getTournament() == 'wimbledon-women-2013.json'){
			$("#selectNumOfSets").empty();
			$("#selectNumOfSets").append($('<option></option>').val("na").html("--Number Of Sets--"));
			for(i=1; i<3; i++){
				$("#selectNumOfSets").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "lessThan" && getTournament() == 'wimbledon-women-2013.json'){
			$("#selectNumOfSets").empty();
			$("#selectNumOfSets").append($('<option></option>').val("na").html("--Number Of Sets--"));
			for(i=3; i<4; i++){
				$("#selectNumOfSets").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "equals" && getTournament() == 'wimbledon-men-2013.json'){
			$("#selectNumOfSets").empty();
			$("#selectNumOfSets").append($('<option></option>').val("na").html("--Number Of Sets--"));
			for(i=3; i<6; i++){
				$("#selectNumOfSets").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "greaterThan" && getTournament() == 'wimbledon-men-2013.json'){
			$("#selectNumOfSets").empty();
			$("#selectNumOfSets").append($('<option></option>').val("na").html("--Number Of Sets--"));
			for(i=3; i<5; i++){
				$("#selectNumOfSets").append($('<option></option>').val(i).html(i));
			}
		}
		
		if($(this).val() === "lessThan" && getTournament() == 'wimbledon-men-2013.json'){
			$("#selectNumOfSets").empty();
			$("#selectNumOfSets").append($('<option></option>').val("na").html("--Number Of Sets--"));
			for(i=4; i<6; i++){
				$("#selectNumOfSets").append($('<option></option>').val(i).html(i));
			}
		}
		
		
	}
	else{
		$("#selectNumOfSets").val('na');
		$("#selectNumOfSets").prop("disabled", true);
	}
})

$("#roundSelect").change(function(){
	if($(this).val() == "na"){
		$("#selectRoundOperator").val("na");
	}
})

$("#selectNumOfSets").change(function(){
	if($(this).val() == "na"){
		$("#selectNumOfSetsOperator").val("na");
	}
})



//get table, set up table properties and header information
//read in json data and filter by match
//if match passes filter criteria, select and format required elements
//add required elements to table
function outputData(){
	//get table, set up table properties and header information
	table = getTable();
	table.innerHTML = "<col width='80'><col width='180'><col width='40'><col width='40'><col width='40'><col width='40'><col width='40'><br>"
	table.innerHTML += "<tr><th>Round</th><th>Player</th><th>Set 1</th><th>Set 2</th><th>Set 3</th><th>Set 4</th><th>Set 5</th></tr><br>"
	//read in json data and filter by match
	$.getJSON(getTournament(), function(data){
		$.each(data.match, function(i, match) {
			//if filter by players name, round number and number of sets
			if(myFilter(data.match[i].round, document.getElementById("roundSelect").value, document.getElementById("selectRoundOperator").value)
				&& myFilter(data.match[i].player[0].set.length, document.getElementById("selectNumOfSets").value, document.getElementById("selectNumOfSetsOperator").value)
				&& (myNameFilter(data.match[i].player[0].name, document.getElementById("selectPlayerName").value, document.getElementById("selectPlayerNameOperator").value)
				|| myNameFilter(data.match[i].player[1].name, document.getElementById("selectPlayerName").value,document.getElementById("selectPlayerNameOperator").value))){
				
				//declare and initiate variables
				var player_1 = data.match[i].player[0].name;
				var player_2 = data.match[i].player[1].name;
				var round = data.match[i].round;
				var player_1_sets = "";
				var player_2_sets = "";
				
				//bold winners name
				if (data.match[i].player[0].outcome === "won"){
					player_1 = "<b>"+player_1+"</b>"
				}
				else{
					player_2 = "<b>"+player_2+"</b>"
				}
				
				//iterate through sets and add score of each set to the table, 
				//if less than 5 sets were played add an empty column to the table until 5 sets have been added
				for (var j = 0; j < 5; j++){
					if(data.match[i].player[0].set[j] !== undefined ){
						player_1_sets += "<td>"+ data.match[i].player[0].set[j] + "</td>"
						player_2_sets += "<td>"+ data.match[i].player[1].set[j] + "</td>"
					}
					else{
						player_1_sets += "<td></td>";
						player_2_sets += "<td></td>";
					}
				}
				//add required elements to table
					table.innerHTML += "<tr><td>"+round+"</td><td>"+ player_1 +"</td>"
					+player_1_sets+"</tr><tr><td>"+round+ "</td><td>"+ player_2+"</td>"+player_2_sets+"</tr><br></br>"
				}
			})
		})
	}
})



