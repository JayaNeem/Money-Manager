var code = '';
function addinput(temp) {
	if(code.length<4){
		// console.log(temp);
		code = code + temp;
		// console.log(code);
		document.getElementById('code').value = code;
	}
}
function removeinput() {
	code = code.slice(0,-1);
	document.getElementById('code').value = code;
}