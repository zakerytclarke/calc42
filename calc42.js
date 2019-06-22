var stackout=[0,0];

var macros={};

var varmem=[0];
var x=0;
while(x<999){
varmem.length++;
varmem[x]="0";
var mode=0;

x++;
}
renderstack();
function updatecalc(i){
	if(isNaN(i)&&i!="."){
		if(mode==0||i=="Enter"||i=="Prgm"){
			evaluate(i);
		}else{
			additem(i);
			renderstack();
		}
	}else{
		document.getElementById("input").innerHTML=document.getElementById("input").innerHTML+i;
	}
}
function evaluate(i){
	if(i=="Enter"){
		additem(parseFloat(document.getElementById("input").innerHTML));
		document.getElementById("input").innerHTML="0";
		renderstack();
	}
	if(i=="+"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		additem(arg1+arg2);
		renderstack();
	}
	if(i=="-"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		additem(arg2-arg1);
		renderstack();
	}
	if(i=="*"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		additem(arg2*arg1);
		renderstack();
	}
	if(i=="/"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		additem(arg2/arg1);
		renderstack();
	}

	if(i=="Rot"){
		var arg1=getitem(0);
		deleteitem();
		stackout.push(arg1);
		renderstack();
	}
	if(i=="Dup"){
		var arg1=getitem(0);
		stackout.unshift(arg1);
		renderstack();
	}
	if(i=="Pop"){
		deleteitem();
		renderstack();
	}
	if(i=="Swap"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		stackout.unshift(arg1);
		stackout.unshift(arg2);
		renderstack();
	}
	if(i=="^"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		additem(Math.pow(arg2,arg1));
		renderstack();
	}
	if(i=="Del"){
		document.getElementById("input").innerHTML="";
		deleteitem();
		renderstack();
	}
	if(i=="<"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		if(arg1>arg2){
			additem(1);
		}else{
			additem(0);
		}
		renderstack();
	}
	if(i=="="){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		if(arg1==arg2){
			additem(1);
		}else{
			additem(0);
		}
		renderstack();
	}
	if(i==">"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		if(arg1<arg2){
			additem(1);
		}else{
			additem(0);
		}
		renderstack();
	}
	if(i=="Store"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		varmem[arg1]=arg2;
		renderstack();
	}
	if(i=="Get"){
		var arg1=getitem(0);
		deleteitem();
		additem(varmem[arg1]);
		renderstack();
	}
	if(i=="Prgm"){
		if(mode==0){
			mode=1;
			additem("Prgm");
			renderstack();
		}else{
			mode=0;
			var fName=prompt("Function Name");
			var prgm=[];
			var temp="";
			while(temp!="Prgm"){
				var temp=getitem(0);
				prgm.push(temp);
				deleteitem();
			}
			prgm.pop();
			prgm.reverse();
			macros[fName]=prgm;
			//saveCookie("macros",macros)
			renderstack();
		}


	}
	if(i=="Func"){
		if(document.getElementById("macrobox").style.display=="none"){
			document.getElementById("macrobox").style.display="block";
		}else{
			document.getElementById("macrobox").style.display="none";
		}
	}
}
function deleteitem(){
	var c=0;
	while(c<stackout.length){
		stackout[c]=stackout[c+1];
		c++;
	}
	stackout.length--;
}
function additem(item){
	stackout.length++;
	var c = stackout.length-1;
	while(c>0){
		stackout[c]=stackout[c-1];
		c--;
	}
	stackout[0]=item;
}
function getitem(index){
	return stackout[index];
}
function renderstack(){
	document.getElementById("output").innerHTML="";
	var c=0;
	var o;
	while(c<stackout.length){
		o="<li>";
		o=o+stackout[c]+"</li>";
		c++;
		document.getElementById("output").innerHTML=document.getElementById("output").innerHTML+o;
	}
	document.getElementById("macros").innerHTML="";
	var c=0;
	var o;
	for(var key in macros){
		o='<li onclick="runMacro(this.innerHTML)">';
		o=o+key+"</li>";
		document.getElementById("macros").innerHTML=document.getElementById("macros").innerHTML+o;
	}

}


function runMacro(key){

		document.getElementById("macrobox").style.display="none";
	for(var i=0;i<macros[key].length;i++){
		if(!isNaN(macros[key][i])){
			additem(macros[key][i]);
		}else{
			evaluate(macros[key][i]);
		}
	}
}
/*
if(readCookie("macros")!=null){
	macros=readCookie(macros);
}
*/

function saveCookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function readCookie(name) {
 var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
 result && (result = JSON.parse(result[1]));
 return result;
}
