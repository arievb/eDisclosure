/*
  validateFields.js
  by Arie
  
  for validating all input fields on a form against the specified validation rules
*/

var reTel = /^(\d){10}$/
var reEmail = /^.+\@.+\..+$/
var reFloat = /^((\d+(\.\d*)?)|((\d*\.)?\d+))$/
var reInteger = /^\d+$/
var reCurr = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
var reLink = /^http:\/\/|https:\/\/.+$/
var reTime = /^([0-1]\d|2[0-3]):[0-5]\d$/
var reimg = /^.*(\.(jpg|mpg|gif|GIF|JPG|MPG))$/
var oneWord = /^\w*$/

var passStrong = true;

function doValidateToSubmit(validateForm) {
	var errorMessages = "";
	var toFocus = null;
	for (var fieldNo = 0; fieldNo < validateForm.length; fieldNo++) {
		validations = validateForm[fieldNo].lang;
		if (validations) {
			validationList = validations.split(';');
			fieldValue = validateForm[fieldNo].value;
			isCompulsory = false;
			reTester = '';
			displayName = validationList[0];
			for (paramNo = 1; paramNo < validationList.length; paramNo++) {
				paramlist = validationList[paramNo].split(':');
				switch (paramlist[0]) {
				case 'tel':
					reTester = reTel;
					testDisp = 'a valid SA phone number 0000000000';
					break;
				case 'compulsory':
					isCompulsory = true;
					break;
				case 'setcriteria':
					validateForm[fieldNo].value = getCriteria(validateForm);
					break;
				case 'email':
					reTester = reEmail;
					testDisp = 'an Email Address';
					break;
				case 'integer':
					fieldValue = fieldValue.replace(/,/g, "");
					reTester = reInteger;
					testDisp = 'a whole number';
					break;
				case 'float':
					reTester = reFloat;
					testDisp = 'a number';
					break;
				case 'currency':
					fieldValue = fieldValue.replace(/,/g, "");
					reTester = reCurr;
					testDisp = 'a monetary value';
					break;
				case 'link':
					reTester = reLink;
					testDisp = ' an external link ';
					break;
				case 'before':
					errorMessages += getbefore(validateForm[fieldNo], paramlist[1]);
					break;
				case 'equals':
					equalsResult = equals(validateForm[fieldNo], getEl(paramlist[1]));
					if (equalsResult) {
						errorMessages += equalsResult + '<br>'
					}
					break;
				case 'notequal':
					notEqualResult = notEqual(validateForm[fieldNo], getEl(paramlist[1]));
					if (notEqualResult) {
						errorMessages += notEqualResult + '<br>'
					}
					break;
				case 'inrange':
					if (!inRange(validateForm[fieldNo], paramlist[1], paramlist[2]))
						return;
					break;
				case 'exclude':
					errorMessages += exclude(validateForm[fieldNo], validationList[paramNo]);
					break;
				case 'fieldname':
					break;
				case 'defaultAll':
					break;
				case 'select':
					selectAll(validateForm[fieldNo]);
					fieldValue = validateForm[fieldNo].value;
					break;
				case 'sel':
					repMulti(validateForm[fieldNo]);
					break;
				case 'options':
					if (!optionsExist(validateForm[fieldNo]))
						errorMessages += 'Please provide ' + displayName + '<br>';
					break;
				case 'time':
					reTester = reTime;
					testDisp = 'A valid time 00:00-23:00';
					break;
				case 'billno':
					reTester = reBillno;
					testDisp = 'Avalue in the format ccc - yyyy';
					break;
				case 'actno':
					reTester = reActno;
					testDisp = ' A valid Act No in format ccc of yyyy';
					break;
				case 'password':
					if (passStrong != true) {
						errorMessages += 'Invalid or Weak Password<br>';
						validateForm[fieldNo].value = '';
					}
					;
					break;
				case 'minlength':
					if ((fieldValue.length < paramlist[1]) && (fieldValue.length > 0)) {
						errorMessages += displayName + ' must be minimum length of '
								+ paramlist[1] + '<br>'
					}
					;
					break;
				case 'maxlength':
					if ((fieldValue.length > paramlist[1])) {
						errorMessages += displayName
								+ ' exceeds maximum allowed length of '
								+ paramlist[1] + '(' + fieldValue.length + ')<br>';
					}
					;
					break;
				default:
					errorMessages += displayName + ':' + validationList[paramNo]
							+ ' is invalid in form<br>';
					break;
				}
			}
			if (isCompulsory && isEmpty(fieldValue)) {
				if (toFocus == null && displayName != "") {
					toFocus = validateForm[fieldNo];
				}
				errorMessages += 'Please provide ' + displayName + '<br>';
				validateForm[fieldNo].value = '';
			}
			if ((!isEmpty(fieldValue)) && (reTester != '')) {
				if (!reTester.test(fieldValue)) {
					errorMessages += displayName + ' appears to be invalid<br>';
				}
			}
		}
	}
	if (errorMessages != '') {
		ShowMessage('<b>The following details could not be processed:</b><br><br>' + errorMessages);
		if (toFocus != null) {
			toFocus.focus();
		}
		return false;
	} 
	else {
		return true;
	}
}