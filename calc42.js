var stackout=[];

var macros={};

//Built in Functions
macros["Quadratic"]=["Swap","Dup"];


macros["Abs"]=["abs"];

macros["Random"]=["random"];

macros["Round"]=["round"];
macros["Floor"]=["floor"];
macros["Ceiling"]=["ceiling"];

macros["Tau"]=["#tau"];
macros["Pi"]=["#pi"];
macros["E"]=["#e"];


macros["sin(deg)"]=["#sin(deg)"];
macros["cos(deg)"]=["#cos(deg)"];
macros["tan(deg)"]=["#tan(deg)"];

macros["sin(rad)"]=["#sin(rad)"];
macros["cos(rad)"]=["#cos(rad)"];
macros["tan(rad)"]=["#tan(rad)"];

macros["ln"]=["#ln"];
macros["log"]=["#log"];
macros["sqrt"]=["#sqrt"];
macros["Power"]=["^"];



var negative=false;

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
			if(macros[i]!=null){
				runMacro(i);
				renderstack();
			}else{
				document.getElementById("macrobox").style.display="none";
				evaluate(i);
			}
		}else{
			additem(i);
			renderstack();
		}
	}else{
		if(document.getElementById("input").innerHTML==""){
			document.getElementById("input").innerHTML=i;
		}else{
			document.getElementById("input").innerHTML=document.getElementById("input").innerHTML+i;
		}
	}
}
function evaluate(i){
	if(i=="Enter"){
		additem(parseFloat(document.getElementById("input").innerHTML));
		document.getElementById("input").innerHTML="";
		renderstack();
	}
	if(i=="+"){
		var arg1=getitem(0);
		var arg2=getitem(1);
		if(stackout.length>=2&&arg1!="if"&&arg2!="if"){
			deleteitem();
			deleteitem();
			additem(arg1+arg2);
			renderstack();
		}
	}
	if(i=="-"){
		var arg1=getitem(1);
		var arg2=getitem(0);
		if(stackout.length>=2&&arg1!="if"&&arg2!="if"){
			deleteitem();
			deleteitem();
			additem(arg1-arg2);
			renderstack();
		}
	}
	if(i=="*"){
		var arg1=getitem(1);
		var arg2=getitem(0);
		if(stackout.length>=2&&arg1!="if"&&arg2!="if"){
			deleteitem();
			deleteitem();
			additem(arg1*arg2);
			renderstack();
		}
	}
	if(i=="/"){
		var arg1=getitem(1);
		var arg2=getitem(0);
		if(stackout.length>=2&&arg1!="if"&&arg2!="if"){
			deleteitem();
			deleteitem();
			additem(arg1/arg2);
			renderstack();
		}
	}

	if(i=="Rot"){
		var arg1=getitem(0);

		if(stackout.length>=2&&arg1!="if"){
			deleteitem();
			stackout.push(arg1);

			renderstack();
		}

	}
	if(i=="Dup"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			stackout.unshift(arg1);
			renderstack();
		}
	}
	if(i=="Pop"){
		if(stackout.length>=1){
			deleteitem();
			renderstack();
		}
	}
	if(i=="Swap"){
		var arg1=getitem(0);
		var arg2=getitem(1);
		if(stackout.length>=2&&arg1!="if"&&arg2!="if"){
			deleteitem();
			deleteitem();
			stackout.unshift(arg1);
			stackout.unshift(arg2);
			renderstack();
		}

	}
	if(i=="+/-"){
		var temp=document.getElementById("input").innerHTML;
		if(temp=="||"||temp==null){
			document.getElementById("input").innerHTML="-";
		}else{
			if(temp[0]=="-"){
				document.getElementById("input").innerHTML=temp.substr(1);
			}else{
				document.getElementById("input").innerHTML="-"+temp;
			}

		}
	}
	if(i=="^"){
		var arg1=getitem(0);
		deleteitem();
		var arg2=getitem(0);
		deleteitem();
		additem(Math.pow(arg2,arg1));
		renderstack();
	}
	if(i=="^2"){
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

	//Built in Functions
	if(i=="abs"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.abs(arg1));
		}
	}

	if(i=="random"){
		additem(Math.random());
	}
	if(i=="round"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.round(arg1));
		}
	}

	if(i=="floor"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.floor(arg1));
		}
	}

	if(i=="ceil"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.ceil(arg1));
		}
	}

	if(i=="#sqrt"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.sqrt(arg1));
		}
	}

	if(i=="#log"){
		var arg1=getitem(0);
		var arg2=getitem(1);
		if(stackout.length>=1&&arg1!="if"&&arg2!="if"){
			deleteitem();
			deleteitem();
			additem(Math.log(arg2)/Math.log(arg1));
		}
	}
	if(i=="#ln"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.log(arg1));
		}
	}

	if(i=="#tau"){
		additem(2*Math.PI);
	}
	if(i=="#pi"){
		additem(Math.PI);
	}

	if(i=="#e"){
		additem(Math.E);
	}



	if(i=="#sin(deg)"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.sin(arg1*Math.PI/180));
		}
	}
	if(i=="#cos(deg)"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.cos(arg1*Math.PI/180));
		}
	}
	if(i=="#tan(deg)"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.tan(arg1*Math.PI/180));
		}
	}
	if(i=="#sin(rad)"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.sin(arg1));
		}
	}
	if(i=="#cos(rad)"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.cos(arg1));
		}
	}
	if(i=="#tan(rad)"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.tan(arg1));
		}
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
		console.log(macros[i]);
		if(macros[i]!=null){
			runMacro(i);
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
	var keys=[];
	for(var key in macros){
		keys.push(key);
	}
	//Display Alphabetical
	keys.sort();
	for(var i=0;i<keys.length;i++){
		var key=keys[i];
		o='<li onclick="updatecalc(this.innerHTML)">';
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
			updatecalc(macros[key][i]);
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
