self.on("click",function(node,data){
	test();
	function test()
{
	var all= document.getElementsByClassName("roundbox");
	var out=[];
	for(var i=0,z; z=all[i];i++)
	{
	var v = z.getElementsByClassName("answer-view");
	if(v.length)
	{var a=getinput(v[0]);
		var y=z.getElementsByClassName("input-view");
		var b=getinput(y[0]);
		out.push([b,a]);
		
	}
	}
	//return out;
	self.postMessage(out);
}
function getinput(x)
{
	return x.children[1].textContent;
}
});

self.on("context",function(node){
if(typeof node.baseURI != "undefined")
		mt=node.baseURI;
	else
		return false;
	if(mt.match(".*?codeforces.com/contest/[0-9]*/submission/[0-9]*"))
		return true;
	else false;
});