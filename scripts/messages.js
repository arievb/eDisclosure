window.onclick = function(event) {
  if (event.target == getEl('divMessage')) {
    //getEl('divMessage').style.display = "none";
  }
}

function ShowMessage(messageContent) {
  getEl("divMessageContent").innerHTML = messageContent;
  getEl('divMessage').style.display = "block";
}

/* field help messages */

var arFieldHelp = [];

function showFieldHelp(fieldID) {
  ShowMessage(arFieldHelp[fieldID]);
}

/* popup functions */
function showFieldHint(fieldID) {
  getEl(fieldID).style.visibility='visible';
}
function updateFieldHint(options) {
  //
}
function hideFieldHint(fieldID) {
  getEl(fieldID).style.visibility='hidden';
}
