// Student ID: u3092649, Assignment 2, JavaScript File, Date Last Modified: 06/04/2017

/*
-Below is a 2D array used to store the contents of each question. 
-This quiz has been created to allow for dynamic modification to either remove or add questions to the array below. 

-The format for these questions is: 
| Question Details[0] | Choice 1 [1] | Choice 2 [2] | Choice 3 [3| Question Answer[4] |
*/
var questions = [
    ["Who is Luke Skywalkers father?", "Obi-Wan", "Han-Solo", "Darth Vader", "Darth Vader"], 
	["How many death stars were built?", "One", "Two", "Three", "Two"],
    ["Roughly how old is yoda when he dies?", "300", "600", "900", "900"], 
    ["What is the color of Obi-Wan's lightsaber?", "Blue", "Green", "Red", "Blue"],
    ["What invisible power binds the galaxy together?", "The Force", "The Ether", "The Universe", "The Force"],
    ["What's R2-D2's name often shortened to?", "Bot", "D2", "R2", "R2"],
    ["What color is a blaster's stun bolt?", "Blue", "Green", "Red", "Blue"],
    ["Where was Anakin Skywalker found?", "Tatooine", "Mustafar", "Endor", "Tatooine"],
    ["What is the name of Han Solo’s ship?", "Mon Calamari Cruiser", "Millennium Falcon", "Tantive IV", "Millennium Falcon"],
    ["Who are the masters of the Dark Side who want to rule the galaxy?", "The Clones", "The Rebel alliance", "The Sith", "The Sith"]    
];

var numberOfQuestions = questions.length,                   //Establishes the number of questions in the quiz by the length of the array
 questionIndexTracker = 0,                                  //Creates a global question tracker to record/update the question index 
 questionBlock = document.getElementById('question'),       //Gets the block containing the questions ie details/answers
 scoreBlock = document.getElementById('score'),             //Gets the block containing the final score section
 element = document.getElementById('progress'),             //Gets the element progress bar by html id "progress"
 scoreOutput = document.getElementById('scoreOutcome'),     //Gets the element to output the final score into
 outputDetails = document.getElementById('outcomeDetails'), //Gets the element to output the text related to the score achieved
 userSelectionSet = [];                                     //Initialises an array to store the users selected answers

/*
FUNCTION progressBar:
-Progress bar functionality which takes a single argument
1 == setProgressBar
-Sets the initial state of the progress bar
-Sets the max of the progress bar to the number of questions in the quiz

2 == recordProgress
-Updates the state of the progress bar as the user progresses throughout the quiz
-Updates the old index value with the current question index
*/
function progressBar(action) {
    if(action == 1){
	   element.setAttribute('max', numberOfQuestions); 
    }
    else if(action == 2){
        element.setAttribute('value', questionIndexTracker);
    }
    else{
        Console.log("Error in progress bar selection 1 == set, 2 == record")
    }
}

/*
FUNCTION calculateScore
-Compares the users selection to that of the actual answer
-Initial score set to 0 each time the function is called
-Iterates through the 2D array pulling out only the index of the answer for each question and comparing it to that of the user selection index
-If it is a match then the score increments + 1 else the for-loop will continue to the next answer
-Returns the score upon completion of the loop
*/
function calculateScore(qAnswers, uAnswers) {
    var score = 0;
    for (i = 0; i <= numberOfQuestions - 1; i++) {
        
        if(qAnswers[i][4] === uAnswers[i]){
            score = score + 1; 
        } else {
            continue;
        }
    }
    return score; 
}

/*
FUNCTION populateQuestions 
-Used to populate the elements of the quiz 
-Performs a check to either show the final score if the quiz has ended or show the next question in the quiz 
-If the quiz has ended then the showScore function is called
-[Question Index][0 - Details | 1 - Choice 1 | 2 - Choice 2 | 3 - Choice 3]
-Gets the elements questiondetails and option 1 - 3 then populates the inner html as per the index above indexing
*/
function populateQuestions() { 
    
    if (questionIndexTracker >= numberOfQuestions) {                       
        showScore();                                                       
       
    } else {
        var questionDetails = document.getElementById("questionDetails"),  
            option1 = document.getElementById("optionTextA"),              
            option2 = document.getElementById("optionTextB"),              
            option3 = document.getElementById("optionTextC");              

        questionDetails.innerHTML = questions[questionIndexTracker][0];
        option1.innerHTML = questions[questionIndexTracker][1];
        option2.innerHTML = questions[questionIndexTracker][2];
        option3.innerHTML = questions[questionIndexTracker][3];
    }
}

/*
FUNCTION showScore
-Gets the final score by calling the calculateScore function and passing in the question(containing the answers) array and the userSelection array
-Outputs the score achieved out of the number of questions in the quiz to the user by populating the scoreOutput
-Uses a switch statement to determine the descreption to allocate based on the score achieved, populates the outputDetails with the result
0 - 1 (May the force be with you!)
2 - 3 (You show a small sign of the force within you!)
4 - 5 (You have much to learn young padawan!)
6 - 7 (You are a Jedi Apprentice!)
8 - 9 (The force is strong with you!)
10 (You are a Jedi Master!)

-Hides the block containing the question contents
-Unhides the block containing the final score
*/
function showScore() {
    
    var endScore = calculateScore(questions, userSelectionSet);

    scoreOutput.innerHTML = "You scored " + endScore + " out of " + numberOfQuestions;
    
    switch (true) {
        case (endScore <= 1):
            outputDetails.innerHTML = "May the force be with you!";
            break;
        case (endScore >= 2 && endScore <= 3):
            outputDetails.innerHTML = "You show a small sign of the force within you!";
            break;           
        case (endScore >= 4 && endScore <= 5):
             outputDetails.innerHTML = "You have much to learn young padawan!";
            break;            
        case (endScore >= 6 && endScore <= 7):
            outputDetails.innerHTML = "You are a Jedi Apprentice!";
            break;            
        case (endScore >= 8 && endScore <= 9):
            outputDetails.innerHTML = "The force is strong with you!";
            break;            
        case (endScore >= 10):
            outputDetails.innerHTML = "You are a Jedi Master!";
            break;
        default:
            break;
    }
    
    questionBlock.style.display = 'none';
    scoreBlock.style.display = 'block';
    
}

/*
FUNCTION userSelection
-This function is called upon the users onclick of an answer
-Takes a single argument of the div class that was selected 
-Converts the div class to its text component and appends it to an array of the answers the user has selected
-Increments the question index counter for the next question
-Calls the populate function to re-populate the questions with the new index counter
-Calls the progressBar function with 2 == recordProgress
*/
function userSelection(optionSelected) {

    var userSelection = document.getElementById(optionSelected).textContent;
    userSelectionSet.push(userSelection);
    
    questionIndexTracker += 1;
    populateQuestions();
    progressBar(2);
    
}

/*
FUNCTION quizRestart
-Resets the question index tracker to 0 
-Clears the users previous stored answers (re-sets to an empty array)
-Unhides the block containg the question contents
-Hides the block containing the final score
-Calls the progress bar 1 == set and then progress bar 2 == record
-Calls the populate questions to re-populate with the reset index tracker question 
*/
function quizRestart() {

    questionIndexTracker = 0;
    userSelectionSet = [];
    questionBlock.style.display = 'block';
    scoreBlock.style.display = 'none';
    progressBar(1);
    progressBar(2);
    populateQuestions();  
}

//Initials the quiz upon load 
quizRestart();

