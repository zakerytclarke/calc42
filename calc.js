var stackout=[];

var macros={};

//Built in Functions
macros["Quad"]=["Swap","Dup","-1","*","Rot","Rot","Rot","Dup","2","*","Rot","Rot","Swap","Dup","2","Pow","Rot","Rot","Rot","Swap","Rot","-4","*","*","+","sqrt","Swap","Pop","Swap","Pop","Dup","Rot","Rot","Dup","Rot","Rot","Dup","Rot","Rot","Rot","Swap","+","Rot","Swap","Rot","Rot","Rot","Rot","/","Rot","Swap","Rot","Swap","-","Swap","Rot","/"];


macros["Abs"]=["abs"];

macros["Rnd"]=["random"];

macros["Round"]=["round"];
macros["Floor"]=["floor"];
macros["Ceil"]=["ceiling"];

macros["Tau"]=["#tau"];
macros["Pi"]=["#pi"];
macros["E"]=["#e"];


macros["sin"]=["#sin(rad)"];
macros["cos"]=["#cos(rad)"];
macros["tan"]=["#tan(rad)"];

macros["sin\xB0"]=["#sin(deg)"];
macros["cos\xB0"]=["#cos(deg)"];
macros["tan\xB0"]=["#tan(deg)"];

macros["ln"]=["#ln"];
macros["log"]=["#log"];
macros["sqrt"]=["#sqrt"];
macros["Power"]=["^"];
macros["LRot"]=["#lrot"];


const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

const deleteCookie = (name, path) => {
  setCookie(name, '', -1, path)
}


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
		if(
			document.getElementById("input").innerHTML!=""&&
			document.getElementById("input").innerHTML!="-")
			{
			additem(parseFloat(document.getElementById("input").innerHTML));
			document.getElementById("input").innerHTML="";
			renderstack();
		}
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
		document.getElementById("input").innerHTML=document.getElementById("input").innerHTML.substring(0,document.getElementById("input").innerHTML.length-1);
		//document.getElementById("input").innerHTML="";
		//deleteitem();
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

	if(i=="ceiling"){
		var arg1=getitem(0);
		if(stackout.length>=1&&arg1!="if"){
			deleteitem();
			additem(Math.ceil(arg1));
		}
	}

	if(i=="#lrot"){
		var arg1=stackout[stackout.length-1];

		if(stackout.length>=2&&arg1!="if"){
			stackout.pop();
			stackout.unshift(arg1);
			renderstack();
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
			if(fName!=""&&fName!=null){
				macros[fName]=prgm;
			}
			setCookie("macros",JSON.stringify(macros))
			renderstack();
		}
		//console.log(macros[i]);
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

	document.getElementById("macrobox").innerHTML="";

	var keys=[];
	for(var key in macros){
		keys.push(key);
	}
	//Display Alphabetical
	keys.sort();
	for(var i=0;i<keys.length;i++){

		document.getElementById("macrobox").innerHTML+="<button id='Delete' onclick='updatecalc(this.innerHTML)' onfocus='this.blur()' class='button' style='background-color:#A5A5A5;color:black;'>"+keys[i]+`</button>
    `;
	}




}


function runMacro(key){

	for(var i=0;i<macros[key].length;i++){
		if(!isNaN(macros[key][i])){
			additem(macros[key][i]);
		}else{
			updatecalc(macros[key][i]);
		}
	}
}

if(getCookie("macros")!=""){
macros=JSON.parse(getCookie("macros"));
renderstack();
}




//https://www.w3schools.com/js/js_cookies.asp
/*
function setCookie(cname, cvalue, exdays) {
	if(exdays==null){
		exdays=100000;
	}
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));//Forever
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
*/
