var MARKETS=[
{name:"Corn",unit:"Dollars per bushel (CBOT)",d:[["Dec 2026","4.3250","+0.0125"],["Mar 2027","4.4750","+0.0100"],["May 2027","4.5600","+0.0075"],["Jul 2027","4.6150","+0.0050"],["Sep 2027","4.5200","-0.0025"]]},
{name:"Ethanol",unit:"Dollars per gallon (Chicago)",d:[["Oct 2026","1.745","+0.010"],["Nov 2026","1.760","+0.010"],["Dec 2026","1.775","+0.005"],["Jan 2027","1.790","0.000"],["Feb 2027","1.800","-0.005"]]},
{name:"Natural gas",unit:"Dollars per MMBtu (NYMEX)",d:[["Nov 2026","3.215","+0.040"],["Dec 2026","3.850","+0.035"],["Jan 2027","4.120","+0.030"],["Feb 2027","4.080","+0.020"],["Mar 2027","3.790","+0.015"]]},
{name:"Soybean meal",unit:"Dollars per short ton (CBOT)",d:[["Oct 2026","305.40","-1.20"],["Dec 2026","312.80","-1.00"],["Jan 2027","316.10","-0.80"],["Mar 2027","320.50","-0.50"],["May 2027","324.00","-0.30"]]}
];
var tabs=document.getElementById("tabs"),box=document.getElementById("quotes"),unit=document.getElementById("unit");
function show(i){
  var m=MARKETS[i];
  unit.textContent=m.unit;
  box.innerHTML='<div class="q hdr"><span>Contract</span><span>Last</span><span>Change</span></div>'+m.d.map(function(r){
    var c=r[2].charAt(0)==="+"?"up":r[2].charAt(0)==="-"?"dn":"fl";
    return '<div class="q"><h3>'+r[0]+'</h3><span class="last">'+r[1]+'</span><span class="'+c+'">'+r[2]+'</span></div>';
  }).join("");
  Array.prototype.forEach.call(tabs.children,function(b,j){b.setAttribute("aria-selected",j===i?"true":"false")});
}
MARKETS.forEach(function(m,i){
  var b=document.createElement("button");
  b.type="button";b.setAttribute("role","tab");b.textContent=m.name;
  b.addEventListener("click",function(){show(i)});
  tabs.appendChild(b);
});
show(0);
var opts=document.querySelectorAll("#alerts input"),go=document.getElementById("smsgo"),prev=document.getElementById("smsprev");
function upd(){
  var k=[];
  Array.prototype.forEach.call(opts,function(o){if(o.checked)k.push(o.value)});
  if(!k.length){go.removeAttribute("href");go.setAttribute("aria-disabled","true");prev.textContent="Choose at least one alert.";return}
  var t="START "+k.join(" ");
  go.removeAttribute("aria-disabled");
  go.href="sms:+10000000000?&body="+encodeURIComponent(t);
  prev.textContent="Your text will say: "+t;
}
Array.prototype.forEach.call(opts,function(o){o.addEventListener("change",upd)});
upd();
var bar=document.getElementById("bar");
bar.addEventListener("click",function(e){
  var b=e.target.closest("button");if(!b)return;
  Array.prototype.forEach.call(bar.children,function(x){x.removeAttribute("aria-current")});
  b.setAttribute("aria-current","page");
  Array.prototype.forEach.call(document.querySelectorAll(".view"),function(v){v.classList.toggle("on",v.id==="v-"+b.dataset.v)});
  window.scrollTo(0,0);
});
