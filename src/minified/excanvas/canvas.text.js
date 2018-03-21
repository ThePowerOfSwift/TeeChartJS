/*
 MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
window.Canvas=window.Canvas||{};
window.Canvas.Text={equivalentFaces:{arial:["liberation sans","nimbus sans l","freesans","optimer","dejavu sans"],"times new roman":["liberation serif","helvetiker","linux libertine","freeserif"],"courier new":["dejavu sans mono","liberation mono","nimbus mono l","freemono"],georgia:["nimbus roman no9 l","helvetiker"],helvetica:["nimbus sans l","helvetiker","freesans"],tahoma:["dejavu sans","optimer","bitstream vera sans"],verdana:["dejavu sans","optimer","bitstream vera sans"]},genericFaces:{serif:"times new roman;georgia;garamond;bodoni;minion web;itc stone serif;bitstream cyberbit".split(";"),
"sans-serif":"arial;verdana;trebuchet;tahoma;helvetica;itc avant garde gothic;univers;futura;gill sans;akzidenz grotesk;attika;typiko new era;itc stone sans;monotype gill sans 571".split(";"),monospace:["courier","courier new","prestige","everson mono"],cursive:"caflisch script;adobe poetica;sanvito;ex ponto;snell roundhand;zapf-chancery".split(";"),fantasy:["alpha geometrique","critter","cottonwood","fb reactor","studz"]},faces:{},scaling:.962,_styleCache:{}};
(function(){function r(a){switch(String(a)){case "bolder":case "bold":case "900":case "800":case "700":return"bold";default:case "normal":return"normal"}}function n(a){return document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(a,null):a.currentStyle||a.style}function u(){if(!g.xhr)for(var a=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],c=0;c<a.length;c++)try{g.xhr=
a[c]();break}catch(b){}return g.xhr}var s=window.opera&&/Opera\/9/.test(navigator.userAgent),l=window.CanvasRenderingContext2D?window.CanvasRenderingContext2D.prototype:document.createElement("canvas").getContext("2d").__proto__,g=window.Canvas.Text;g.options={fallbackCharacter:" ",dontUseMoz:!1,reimplement:!1,debug:!1,autoload:!1};var m=document.getElementsByTagName("script"),m=m[m.length-1].src.split("?");g.basePath=m[0].substr(0,m[0].lastIndexOf("/")+1);if(m[1])for(var m=m[1].split("&"),p=m.length-
1;0<=p;--p){var t=m[p].split("=");g.options[t[0]]=t[1]}var q=!g.options.dontUseMoz&&l.mozDrawText&&!l.fillText;if(l.fillText&&!g.options.reimplement&&!/iphone/i.test(navigator.userAgent))return window._typeface_js={loadFace:function(){}};g.lookupFamily=function(a){var c=this.faces,b,d,e=this.equivalentFaces,f=this.genericFaces;if(c[a])return c[a];if(f[a])for(b=0;b<f[a].length;b++)if(d=this.lookupFamily(f[a][b]))return d;if(!(d=e[a]))return!1;for(b=0;b<d.length;b++)if(a=c[d[b]])return a;return!1};
g.getFace=function(a,c,b){var d=this.lookupFamily(a);if(!d)return!1;if(d&&d[c]&&d[c][b])return d[c][b];if(!this.options.autoload)return!1;var e=a.replace(/[ -]/g,"_")+"-"+c+"-"+b,d=this.xhr,e=this.basePath+this.options.autoload+"/"+e+".js",d=u();d.open("get",e,!1);d.send(null);if(200==d.status)return eval(d.responseText),this.faces[a][c][b];throw"Unable to load the font ["+a+" "+c+" "+b+"]";};g.loadFace=function(a){var c=a.familyName.toLowerCase();this.faces[c]=this.faces[c]||{};a.strokeFont?(this.faces[c].normal=
this.faces[c].normal||{},this.faces[c].normal.normal=a,this.faces[c].normal.italic=a,this.faces[c].bold=this.faces[c].normal||{},this.faces[c].bold.normal=a,this.faces[c].bold.italic=a):(this.faces[c][a.cssFontWeight]=this.faces[c][a.cssFontWeight]||{},this.faces[c][a.cssFontWeight][a.cssFontStyle]=a);return a};window._typeface_js={faces:g.faces,loadFace:g.loadFace};g.getFaceFromStyle=function(a){var c=r(a.weight),b=a.family,d,e;for(d=0;d<b.length;d++)if(e=this.getFace(b[d].toLowerCase().replace(/^-webkit-/,
""),c,a.style))return e;return!1};try{l.font="10px sans-serif",l.textAlign="start",l.textBaseline="alphabetic"}catch(v){}l.parseStyle=function(a){if(g._styleCache[a])return this.getComputedStyle(g._styleCache[a]);var c={},b;this._elt||(this._elt=document.createElement("span"),this.canvas.appendChild(this._elt));this.canvas.font="10px sans-serif";this._elt.style.font=a;b=n(this._elt);c.size=b.fontSize;c.weight=r(b.fontWeight);c.style=b.fontStyle;b=b.fontFamily.split(",");for(i=0;i<b.length;i++)b[i]=
b[i].replace(/^["'\s]*/,"").replace(/["'\s]*$/,"");c.family=b;return this.getComputedStyle(g._styleCache[a]=c)};l.buildStyle=function(a){return a.style+" "+a.weight+" "+a.size+'px "'+a.family+'"'};l.renderText=function(a,c){var b=g.getFaceFromStyle(c),d=c.size/b.resolution*.75,e=0,f,k=String(a).split(""),h=k.length;s||(this.scale(d,-d),this.lineWidth/=d);for(f=0;f<h;f++)e+=this.renderGlyph(k[f],b,d,e)};l.renderGlyph=s?function(a,c,b,d){var e,f,k,h=c.glyphs[a]||c.glyphs[g.options.fallbackCharacter];
if(h){if(h.o)for(c=h._cachedOutline||(h._cachedOutline=h.o.split(" ")),k=c.length,a=0;a<k;)switch(e=c[a++],e){case "m":this.moveTo(c[a++]*b+d,c[a++]*-b);break;case "l":this.lineTo(c[a++]*b+d,c[a++]*-b);break;case "q":e=c[a++]*b+d;f=c[a++]*-b;this.quadraticCurveTo(c[a++]*b+d,c[a++]*-b,e,f);break;case "b":e=c[a++]*b+d,f=c[a++]*-b,this.bezierCurveTo(c[a++]*b+d,c[a++]*-b,c[a++]*b+d,c[a++]*-b,e,f)}return h.ha*b}}:function(a,c){var b,d,e,f,k,h=c.glyphs[a]||c.glyphs[g.options.fallbackCharacter];if(h){if(h.o)for(f=
h._cachedOutline||(h._cachedOutline=h.o.split(" ")),k=f.length,b=0;b<k;)switch(d=f[b++],d){case "m":this.moveTo(f[b++],f[b++]);break;case "l":this.lineTo(f[b++],f[b++]);break;case "q":d=f[b++];e=f[b++];this.quadraticCurveTo(f[b++],f[b++],d,e);break;case "b":d=f[b++],e=f[b++],this.bezierCurveTo(f[b++],f[b++],f[b++],f[b++],d,e)}h.ha&&this.translate(h.ha,0)}};l.getTextExtents=function(a,c){var b=0,d=0,e=g.getFaceFromStyle(c),f,k=a.length,h;for(f=0;f<k;f++)h=e.glyphs[a.charAt(f)]||e.glyphs[g.options.fallbackCharacter],
b+=Math.max(h.ha,h.x_max),d+=h.ha;return{width:b,height:e.lineHeight,ha:d}};l.getComputedStyle=function(a){var c,b=n(this.canvas),d={},e=a.size,b=parseFloat(b.fontSize),f=parseFloat(e);for(c in a)d[c]=a[c];"number"===typeof e||-1!=e.indexOf("px")?d.size=f:-1!=e.indexOf("em")?d.size=b*f:-1!=e.indexOf("%")?d.size=b/100*f:-1!=e.indexOf("pt")?d.size=f/.75:d.size=b;return d};l.getTextOffset=function(a,c,b){var d=n(this.canvas);a=this.measureText(a);c=c.size/b.resolution*.75;var e={x:0,y:0,metrics:a,scale:c};
switch(this.textAlign){case "center":e.x=-a.width/2;break;case "right":e.x=-a.width;break;case "start":e.x="rtl"==d.direction?-a.width:0;break;case "end":e.x="ltr"==d.direction?-a.width:0}switch(this.textBaseline){case "alphabetic":break;default:case null:case "ideographic":case "bottom":e.y=b.descender;break;case "hanging":case "top":e.y=b.ascender;break;case "middle":e.y=(b.ascender+b.descender)/2}e.y*=c;return e};l.drawText=function(a,c,b,d,e){d=this.parseStyle(this.font);var f=g.getFaceFromStyle(d),
k=this.getTextOffset(a,d,f);this.save();this.translate(c+k.x,b+k.y);f.strokeFont&&!e&&(this.strokeStyle=this.fillStyle);this.lineCap="round";this.beginPath();q?(this.mozTextStyle=this.buildStyle(d),this[e?"mozPathText":"mozDrawText"](a)):(this.scale(g.scaling,g.scaling),this.renderText(a,d),f.strokeFont&&(this.lineWidth=2+d.size*("bold"==d.weight?.08:.015)/2));this[e||f.strokeFont&&!q?"stroke":"fill"]();this.closePath();this.restore();g.options.debug&&(a=Math.floor(k.x+c)+.5,b=Math.floor(b)+.5,this.save(),
this.strokeStyle="#F00",this.lineWidth=.5,this.beginPath(),this.moveTo(a+k.metrics.width,b),this.lineTo(a,b),this.moveTo(a-k.x,b+k.y),this.lineTo(a-k.x,b+k.y-d.size),this.stroke(),this.closePath(),this.restore())};l.fillText=function(a,c,b,d){this.drawText(a,c,b,d,!1)};l.strokeText=function(a,c,b,d){this.drawText(a,c,b,d,!0)};l.measureText=function(a){var c=this.parseStyle(this.font),b={width:0};if(q)this.mozTextStyle=this.buildStyle(c),b.width=this.mozMeasureText(a);else{var d=g.getFaceFromStyle(c),
d=c.size/d.resolution*.75;b.width=this.getTextExtents(a,c).ha*d*g.scaling}return b}})();