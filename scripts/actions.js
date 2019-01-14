function gotoAction(action, paramNames, paramValues) {
  var formAction = document.createElement("form");
  formAction.method = "POST";
  formAction.action = action;
  formAction.style.display = "none";
  var paramNameList = paramNames.split(",");
  var paramValueList = paramValues.split(",");
  for (param = 0; param < paramNameList.length; param++) {
    var inputElement = document.createElement("INPUT");
    inputElement.setAttribute("type", "text");
    inputElement.name = paramNameList[param]; 
    inputElement.value = paramValueList[param]; 
    formAction.appendChild(inputElement);
  }
  document.body.appendChild(formAction);
  formAction.submit();
}