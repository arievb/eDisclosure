//
//	Password strength validation based on the following criteria:
//
//	1) Length
//	2) Upper and lower case letters
//	3) Punctuation usage
//	4) Overly easy words or phrase
//	5) combinations of at least 3 of the character types
//	6) The minimum length of the password.

var commonPasswords = new Array('password', 'pass', '1234', '1246'); 
 
var numbers = "0123456789"; 
var lowercase = "abcdefghijklmnopqrstuvwxyz"; 
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
var punctuation = "!.@$£#*()%~<>{}[]"; 
var goodlength=8;

 
function checkPassword(password) { 
	var groups=0;
    var combinations = 0; 
 
    if (contains(password, numbers) > 0) { 
        combinations += 10; 
        groups+=1;
    } 
 
    if (contains(password, lowercase) > 0) { 
        combinations += 26; 
        groups+=1;
    } 
	//alert(groups);
    if (contains(password, uppercase) > 0) { 
        combinations += 26;
        groups+=1; 
    } 
 
    if (contains(password, punctuation) > 0) { 
        combinations += punctuation.length; 
        groups+=1;
    } 
 
    // Work out the total combinations 
    
    var totalCombinations;
    //As long as a password is shorter than the goodlength value it will remain a week password.
	if(password.length<goodlength)
    {
		totalCombinations = 75000*(goodlength-password.length);
    }
    else
		totalCombinations = Math.pow(combinations, password.length); 
 
    // If the password is a common password or contains less than 3 of the 
    //character groups, then everthing changes... 

    if (isCommonPassword(password) || groups<3) {
        totalCombinations = 75000*groups+cap(password.length,9) // about the size of the dictionary 
    }
    
    // Work out how long it would take to crack this (@ 200 attempts per second) 
    
    var timeInSeconds = Math.round(totalCombinations / 200) / 2; 
 
    // this is how many days? (there are 86,400 seconds in a day. 
    
    var timeInDays = timeInSeconds / 86400 
 
    // How long we want it to last
    
    var lifetime = 365; 
 
    // How close is the time to the projected time? 
    
    var percentage = timeInDays / lifetime; 
 
    var friendlyPercentage = cap(Math.round(percentage * 100), 100); 
    
    if (totalCombinations != 75000 && friendlyPercentage < (password.length * 5)) { 
        friendlyPercentage += password.length * 5; 
    } 
 
    var progressBar = document.getElementById("progressBar"); 
    progressBar.style.width = friendlyPercentage + "%"; 
 
    if (percentage > 1) { 
        // strong password 
        progressBar.style.backgroundColor = "#3bce08";
        passStrong=true;
        return; 
    } 
 
    if (percentage > 0.5) { 
        // reasonable password 
        progressBar.style.backgroundColor = "#ffd801"; 
        passStrong=false;
        return; 
    } 
 
    if (percentage > 0.10) { 
        // weak password 
        progressBar.style.backgroundColor = "orange"; 
        passStrong=false;
        return; 
    } 
 
    // useless password! 
    if (percentage <= 0.10) { 
        // weak password 
        progressBar.style.backgroundColor = "red"; 
        passStrong=false;
        return; 
    }
} 
 
function cap(number, max) { 
    if (number > max) { 
        return max; 
    } else { 
        return number; 
    } 
} 
 
function isCommonPassword(password) { 
 
    for (i = 0; i < commonPasswords.length; i++) { 
        var commonPassword = commonPasswords[i]; 
        if (password == commonPassword) { 
            return true; 
        } 
    } 
 
    return false; 
} 
 
function contains(password, validChars) { 
    count = 0; 
 
    for (i = 0; i < password.length; i++) { 
        var char = password.charAt(i); 
        if (validChars.indexOf(char) > -1) { 
            count++; 
        } 
    } 
 
    return count; 
} 
