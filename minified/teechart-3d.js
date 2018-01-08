/*
 TeeChart(tm) for JavaScript(tm)
 @fileOverview TeeChart for JavaScript(tm)
 v2.3 Jan 2018
 Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
 http://www.steema.com

 Licensed with commercial and non-commercial attributes,
 specifically: http://www.steema.com/licensing/html5

 JavaScript is a trademark of Oracle Corporation.
*/
var Tee=Tee||{};
(function(){"undefined"!==typeof exports&&(exports.Tee=Tee);Tee.ColorGrid=function(d,G){Tee.PaletteSeries.call(this,d,G);this.dataChanged=this.smooth=!0;var r,t,n,u,z,b,A,C,y,k,p,e,m,D,q,w,B;this.addRandom=function(g,k){g=g||200;k=k||g;for(var e=this.data.values=[],n=0;n<g;n++){var t=Array(k);e[n]=t;var b=Math.cos(n/(.2*k));b*=.5*b;for(var m=0;m<k;m++){var p=Math.cos(m/(.2*g));t[m]=p*p-Math.cos(m/(.5*k))+b}}this.dataChanged=!0};this.fillPixels=function(k){for(var g=0,e,b,m=this.palette.grayScale,p=
this.palette.inverted,d=0;d<n;d++){e=r[d];for(var u=0;u<t;u++)m?(b=B*(p?q-e[u]:e[u]-D),z[g++]=b,z[g++]=b,z[g++]=b):(b=this.getColor(e[u]),z[g++]=b.r,z[g++]=b.g,z[g++]=b.b),z[g++]=k}};this.draw=function(){var g=this.chart.ctx;if(0<t){if(!u||b.width!=t||b.height!=n){b||(b=document.createElement("canvas"));if(!b||!b.getContext)return;b.width=t;b.height=n;A=b.getContext("2d");u=A.getImageData(0,0,t,n);z=u.data}this.dataChanged&&(this.fillPixels(255*(1-this.format.transparency)),this.dataChanged=!1);A.putImageData(u,
0,0);var d=this.smooth,q=this.chart.canvas.style;q&&(null!==q.getPropertyValue("image-rendering")&&q.setProperty("image-rendering",d?"optimizeQuality":"optimizeSpeed",null),void 0!==q.msInterpolationMode&&(q.msInterpolationMode=d?"bicubic":"nearest-neighbor"));g.mozImageSmoothingEnabled=d;g.webkitImageSmoothingEnabled=d;C=this.mandatoryAxis;y=this.notmandatory;m=C.calc(-.5);p=C.calc(n-.5);k=y.calc(-.5);e=y.calc(t-.5);d=this.chart.chartRect;q=k;var w=p,r=1,B=1;C.inverted&&(B=-1,w=d.y-m-p+d.height);
y.inverted&&(r=-1,q=d.x-e-k+d.width);g.scale(r,B);g.drawImage(A.canvas,0,0,t,n,q,w,e-k,m-p);d=this.format.stroke;if(""!==d.fill){B=Math.max(1+4*t/Math.abs(y.calc(t)-y.calc(0))|0,1);w=Math.max(1+4*n/Math.abs(C.calc(n)-C.calc(0))|0,1);g.beginPath();for(r=1;r<t;r+=B)q=y.calc(r-.5),g.moveTo(q,m),g.lineTo(q,p);for(r=1;r<n;r+=w)q=C.calc(r-.5),g.moveTo(k,q),g.lineTo(e,q);d.prepare();g.stroke()}}};this.valueText=function(g){return this.data.values[g/t|0][g%t].toFixed(this.decimals)};this.minXValue=function(){return-.5};
this.maxXValue=function(){return t-.5};this.minYValue=function(){return-.5};this.maxYValue=function(){return n-.5};this.recalcAxes=function(){Tee.Series.prototype.recalcAxes.call(this);r=this.data.values;n=r.length;t=0<n?r[0].length:0;this.size={x:t,y:n};if(0<t&&this.dataChanged){q=D=r[0][0];for(var g,k,b=0;b<n;b++){k=r[b];for(var e=0;e<t;e++)g=k[e],g<D?D=g:g>q&&(q=g)}w=q-D;B=q==D?1:255/(q-D);this._min=D;this._max=q;this._range=w;this.prepareColors()}};this.clicked=function(g){if(g.x>=k&&g.x<=e){var b=
t*(g.x-k)/(e-k)|0;if(g.y>=p&&g.y<=m)return g=n*(g.y-p)/(m-p)|0,g*t+b}return-1}};Tee.ColorGrid.prototype=new Tee.PaletteSeries;Tee.Surface=function(d,G){Tee.ColorGrid.call(this,d,G);var r;this.grid=(new Tee.Format(d)).stroke;this.wireFrame=!1;this.maxZ=3;this.getY=function(d,n){return r[d][n]};this.draw=function(){if(0<this.size.x&&0<this.size.y&&(r=this.data.values,this.chart.__webgl)){var d={};this.bounds(d);this.chart.ctx.surface(this.size,this.getY,d,this.wireFrame,this.grid.visible?this.grid.fill:
null,this.maxZ)}};this.minXValue=function(){return 0};this.maxXValue=function(){return this.size.y};this.minYValue=function(){return this._min};this.maxYValue=function(){return this._max}};Tee.Surface.prototype=new Tee.ColorGrid;THREE.SubdivisionModifier=function(d){this.subdivisions=void 0===d?1:d};THREE.SubdivisionModifier.prototype.modify=function(d){for(var G=this.subdivisions;0<G--;)this.smooth(d);delete d.__tmpVertices;d.computeFaceNormals();d.computeVertexNormals()};(function(){function d(d,
n,u){return u[Math.min(d,n)+"_"+Math.max(d,n)]}function G(d,n,u,r,b,A){var t=Math.min(d,n),y=Math.max(d,n),k=t+"_"+y;k in r?u=r[k]:(u={a:u[t],b:u[y],newEdge:null,faces:[]},r[k]=u);u.faces.push(b);A[d].edges.push(u);A[n].edges.push(u)}var r=["a","b","c"];THREE.SubdivisionModifier.prototype.smooth=function(t){var n=new THREE.Vector3,u,z;var b=t.vertices;var A=t.faces;var C=Array(b.length);var y={};var k=0;for(z=b.length;k<z;k++)C[k]={edges:[]};k=0;for(z=A.length;k<z;k++){var p=A[k];G(p.a,p.b,b,y,p,
C);G(p.b,p.c,b,y,p,C);G(p.c,p.a,b,y,p,C)}z=[];for(g in y){k=y[g];var e=new THREE.Vector3;p=.375;var m=.125;var D=k.faces.length;2!=D&&(p=.5,m=0);e.addVectors(k.a,k.b).multiplyScalar(p);n.set(0,0,0);for(p=0;p<D;p++){var q=k.faces[p];for(u=0;3>u;u++){var w=b[q[r[u]]];if(w!==k.a&&w!==k.b)break}n.add(w)}n.multiplyScalar(m);e.add(n);k.newEdge=z.length;z.push(e)}var B;q=[];var g=0;for(k=b.length;g<k;g++){u=b[g];D=C[g].edges;e=D.length;3==e?B=.1875:3<e&&(B=3/(8*e));w=1-e*B;m=B;2>=e&&2==e&&(w=.75,m=.125);
var L=u.clone().multiplyScalar(w);n.set(0,0,0);for(p=0;p<e;p++)w=D[p],w=w.a!==u?w.a:w.b,n.add(w);n.multiplyScalar(m);L.add(n);q.push(L)}n=q.concat(z);C=q.length;b=[];g=0;for(k=A.length;g<k;g++)q=A[g],B=d(q.a,q.b,y).newEdge+C,w=d(q.b,q.c,y).newEdge+C,z=d(q.c,q.a,y).newEdge+C,b.push(new THREE.Face3(B,w,z)),b.push(new THREE.Face3(q.a,B,z)),b.push(new THREE.Face3(q.b,w,B)),b.push(new THREE.Face3(q.c,z,w));t.vertices=n;t.faces=b}})();Tee.MyParametricGeometry=function(d,G,r,t){THREE.Geometry.call(this);
var n=this.vertices,u=this.faces,z=this.faceVertexUvs[0];t=void 0===t?!1:t;var b,A,C=G+1,y=1/G,k=1/C,p=1/r,e=1/(r+1);for(b=0;b<=r;b++)for(A=0;A<=G;A++)n.push(new THREE.Vector3(b*p-.5,d(b,A),.5-A*y));for(b=0;b<r;b++){var m=b*e;var D=(b+1)*e;var q=b*C;var w=(b+1)*C;for(A=0;A<G;A++){d=q+A;n=w+A;var B=A*k;var g=B+k;y=new THREE.Vector2(B,m);p=new THREE.Vector2(g,m);B=new THREE.Vector2(B,D);var L=new THREE.Vector2(g,D);if(t){g=d+1;var O=n+1;u.push(new THREE.Face3(d,g,n));u.push(new THREE.Face3(g,O,n));
z.push([y,p,B]);z.push([p,L,B])}else u.push(new THREE.Face4(d,d+1,n+1,n)),z.push([y,p,L,B])}}this.computeFaceNormals();this.computeVertexNormals()};"undefined"!==typeof THREE&&(Tee.MyParametricGeometry.prototype=new THREE.Geometry);var Q="undefined"!==typeof HTMLCanvasElement;Tee.Three=function(d){function G(a,c,f,h,l,v,d,b){a&&(c=new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors}),c.wireframe=a);c.vertexColors=THREE.VertexColors;a||(c.side=THREE.DoubleSide);a=new THREE.Mesh(l,c);l=b-d;
b===d&&(l=1);b=h.height/l;a.position.set(h.x+.5*(h.width-F),h.y+.5*(h.height-E)-(d+.5*l)*b,.5*-k);a.scale.set(h.width,b,k*v);m.add(a)}function r(a){M.extrudeOptions.amount=k*M.depth;a=0==M.depth?new THREE.ShapeGeometry(a):a.extrude(M.extrudeOptions);a=THREE.SceneUtils.createMultiMaterialObject(a,[M.getMaterial()]);M.showShadows&&(a.receiveShadow=!0,a.castShadow=!0);return a}function t(a,c,f,h,l,v){a.moveTo(c,f+v);a.lineTo(c,f+l-v);a.quadraticCurveTo(c,f+l,c+v,f+l);a.lineTo(c+h-v,f+l);a.quadraticCurveTo(c+
h,f+l,c+h,f+l-v);a.lineTo(c+h,f+v);a.quadraticCurveTo(c+h,f,c+h-v,f);a.lineTo(c+v,f);a.quadraticCurveTo(c,f,c,f+v)}function n(a){if("rgb("==a.substr(0,4))return a=a.slice(4,a.length-1).split(","),a[2]|a[1]<<8|a[0]<<16;switch(a){case "white":return 16777215;case "silver":return 14737632;case "darkgray":case "darkgrey":return 8421504;case "black":return 0;case "red":return 16711680;case "green":return 65280;case "blue":return 255;default:return 16777215}}function u(a,c){var f,h=P.length;for(f=0;f<h;f++){var l=
P[f];if(l.text===a&&l.size===c)return l.obj}return null}function z(a,c){var f=J;f.width=a;f.height=c;x.setSize(a,c);H.aspect=a/c;H.updateProjectionMatrix()}function b(){C?(z(y.width,y.height),C=!1):(y.width=J.width,y.height=J.height,z(window.innerWidth,window.innerHeight),C=!0);M.refresh()}this.setEnabled=function(a,c){if(!a||!Detector||Detector.webgl){if(this.__webgl=a)x&&(c.__webgl=!0,c.canvas.style.display="none",c.canvas=this,c.ctx=this,x&&x.domElement&&(x.domElement.style.display="block"));else{var f=
J;e||(Q?(e=document.createElement("canvas"),f instanceof HTMLCanvasElement?(f.parentElement.appendChild(e),e.style.background=f.style.background):f.appendChild(e)):"undefined"!=typeof G_vmlCanvasManager&&(e=document.createElement("canvas"),e=G_vmlCanvasManager.initElement(e),f.appendChild(e)));e&&(e.setAttribute("width",f.width),e.setAttribute("height",f.height),e.height=f.clientHeight,e.width=f.clientWidth);x&&x.domElement?x.domElement.style.display="none":Q&&f instanceof HTMLCanvasElement&&(f.style.display=
"none");e&&(e.style.display="block");c.canvas=e;c.ctx=null;c.__webgl=null;c.bounds.set(0,0,e.width,e.height);e&&(e.chart=c,e.onmousedown=e.ontouchstart=c.domousedown,e.onmouseup=e.ontouchstop=c.domouseup,e.onmousemove=e.ontouchmove=c.domousemove,e.onmousewheel=c._doWheel)}I&&(I.enabled=a);c.aspect.view3d=a;c.draw()}};this.zPos=function(){return k*(1-this.z-.5*this.depth)};this.Gradient=function(){this.colors=[];this.stops=[];this.addColorStop=function(a,c){this.stops.push(a);this.colors.push(c)}};
this.clearRect=function(){m&&K.remove(m);m=new THREE.Object3D;K.add(m);this.needsRender=!0};this.beginPath=function(){this.items=[];this.closedPath=!1};this.moveTo=function(a,c,f){this.items.push({kind:0,x:a,y:c,z:f})};this.lineTo=function(a,c,f){this.items.push({kind:1,x:a,y:c,z:f})};this.lineZ=function(a,c,f,h){this.moveTo(a,c,f);this.lineTo(a,c,h)};this.surface=function(a,c,f,h,l,v){c=new Tee.MyParametricGeometry(c,a.x-1,a.y-1,!0);c.computeBoundingBox();var d=c.boundingBox,b=d.min.y;d=d.max.y;
var k=d-b,g,e=["a","b","c","d"],n=c.vertices;for(g=0;g<c.vertices.length;g++){var m=new THREE.Color;var p=.7*(d-n[g].y)/k;m.setHSL(p,.9/(1>(p=.9)?p:2-p),.5*p);c.colors[g]=m}for(g=0;g<c.faces.length;g++)for(k=c.faces[g],m=0;3>m;m++)k.vertexColors[m]=c.colors[k[e[m]]];g=new THREE.MeshLambertMaterial({color:16777215,opacity:this.globalAlpha,wireframe:this.wireframe});G(h,g,a,f,c,v,b,d);l&&!h&&(h=new THREE.MeshBasicMaterial({color:this.colorToInt(l),opacity:this.globalAlpha}),h.wireframe=!0,G(!1,h,a,
f,c,v,b,d))};this.slice=function(a,c,f,h,l,v,d,g){this.beveled=void 0===g?!1:g;0<v?(this.path=8,this.p=a,this.torus=d,this.center=c,this.radius=f,this.angle0=h,this.angle1=l,this.donut=v,this.items=[]):(this.beginPath(),this.moveTo(a.x,a.y),this.arc(c.x,c.y,f,h,l,!1),this.closePath())};this.closePath=function(){this.closedPath=!0};this.createLinearGradient=function(){return new this.Gradient};this.createRadialGradient=function(){return new this.Gradient};var A;this.getMaterial=function(a){var c=this.fillStyle;
return a?(A||(A=THREE.ImageUtils.loadTextureCube("textures/pisa/px.png textures/pisa/nx.png textures/pisa/py.png textures/pisa/ny.png textures/pisa/pz.png textures/pisa/nz.png".split(" "),null,function(){M.refresh()})),new THREE.MeshBasicMaterial({color:16777215,envMap:A})):new THREE.MeshPhongMaterial({color:this.colorToInt(c),opacity:this.globalAlpha,wireframe:this.wireframe,specular:5592405,map:null})};this.spline=function(a,c){this.items=[];var f=this.path=0;if(c){for(var h=[];f<a.length;)h.push(new THREE.Vector2(a[f],
-a[f+1])),f+=2;this.items.push({kind:12,p:h})}else{for(h=new THREE.SplineCurve3;f<a.length;)h.points.push(new THREE.Vector3(a[f],-a[f+1],0)),f+=2;this.items.push({kind:8,geo:h})}};this.bezierCurveTo=function(a,c,f,h,l,v){this.items.push({kind:11,a:a,b:c,c:f,d:h,e:l,f:v})};this.quadraticCurveTo=function(a,c,f,h){this.items.push({kind:7,x:a,y:c,width:f,height:h})};this.arc=function(a,c,f,h,l,v){this.items.push({kind:4,x:a,y:c,radius:f,angle:h,endAngle:l,clockwise:v})};this.extrudeOptions={amount:1,
bevelEnabled:!1,bevelSegments:16,steps:12,curveSegments:64,bevelThickness:10,bevelSize:8};this.getContext=function(){return this};this.beginParent=function(){D=m;m=new THREE.Object3D;D.add(m);return m};this.endParent=function(){m=D};this.translate=function(a,c){};this.rotate=function(a){};this.fill=function(){var a=M.getMaterial();var c=this.items,f=c.length,h=this.r;if(0<f)if(8==c[0].kind)c=new THREE.TubeGeometry(c[0].geo,100,.05*k*this.depth,8,!1,!1),a=new THREE.Mesh(c,a),a.position.set(.5*-F,.5*
E,this.zPos()),m.add(a);else if(this.closedPath){a=new THREE.Shape;for(var l,v,d,b=0;b<f;b++)if(l=c[b],0==l.kind){if(0==b||v!==l.x||d!==-l.y)v=l.x,d=-l.y,a.moveTo(v,d)}else if(1==l.kind){if(0==b||v!==l.x||d!==-l.y)v=l.x,d=-l.y,a.lineTo(v,d)}else 4==l.kind?a.absarc(v,d,l.radius,2*Math.PI-l.angle,2*Math.PI-l.endAngle,l.clockwise):7==l.kind?a.quadraticCurveTo(l.x,l.y,l.width,l.height):11==l.kind?a.bezierCurveTo(l.a,-l.b,l.c,-l.d,l.e,-l.f):12==l.kind&&(a.moveTo(l.p[0].x,l.p[0].y),a.splineThru(l.p));c=
this.extrudeOptions.bevelEnabled;if(this.extrudeOptions.bevelEnabled=this.beveled)f=.02*this.extrudeOptions.bevelSize,this.depth-=f,this.z+=.5*f;a=r(a);a.position.set(.5*-F,.5*E,this.zPos()-k*this.depth*.5);m.add(a);this.extrudeOptions.bevelEnabled=c}else{d=new THREE.Geometry;v=-k*this.depth;a.side=THREE.DoubleSide;for(b=0;b<f;b++)d.vertices.push(new THREE.Vector3(c[b].x,-c[b].y,0),new THREE.Vector3(c[b].x,-c[b].y,v)),0<b&&(l=new THREE.Face4(2*(b-1),2*b-1,2*b+1,2*b),d.faces.push(l));d.computeFaceNormals();
a=new THREE.Mesh(d,a);a.position.set(.5*-F,.5*E,this.zPos()-.5*v);m.add(a)}else if(0==this.depth)if(0<this.rx)a=new THREE.Shape,t(a,h.x,-h.y,h.width,h.height,this.rx),a=r(a),a.position.set(.5*-F,-h.height+.5*E,this.zPos()),m.add(a);else if(6==this.path)a=new THREE.Shape,a.absellipse(0,0,.5*h.width,.5*h.height,0,2*Math.PI,!0),a=r(a),a.position.set(this.cx-.5*F,-this.cy+.5*E,this.zPos()),m.add(a);else{var e=new THREE.PlaneGeometry(h.width,h.height);a.side=THREE.DoubleSide;e=new THREE.Mesh(e,a)}else 5==
this.path?(1==this.topRadius?(w||(w=new THREE.CylinderGeometry(1,1,1,32,1)),e=w):(B||(B=new THREE.CylinderGeometry(0,1,1,32,1)),e=B),e=new THREE.Mesh(e,a),a=.5*Math.min(this.vertical?h.width:h.height,k),e.scale.x=a,e.scale.z=a,e.scale.y=this.vertical?h.height:h.width,this.vertical||(e.rotation.z=.5*Math.PI,e.rotation.y=Math.PI)):7==this.path?(O||(O=new THREE.SphereGeometry(1,32,32)),e=new THREE.Mesh(O,a),e.scale.set(.5*h.width,.5*h.height,k*this.depth)):6==this.path?(a=new THREE.Shape,a.absellipse(0,
0,.5*h.width,.5*h.height,0,2*Math.PI,!0),a=r(a),a.position.set(this.cx-.5*F,-this.cy+.5*E,this.zPos()),m.add(a)):8==this.path?(this.angle0=2*Math.PI-this.angle0,this.angle1=2*Math.PI-this.angle1,this.torus?(c=Math.abs(this.angle1-this.angle0),c=new Tee.TorusGeometry(this.radius-.5*this.donut,.5*this.donut,16,Math.max(16,90*Math.PI/c|0),c),a=new THREE.Mesh(c,a),a.position.set(this.center.x-.5*F,-this.center.y+.5*E,this.zPos()+this.donut),a.rotation.z=this.angle1,m.add(a)):(a=new THREE.Shape,a.moveTo(this.p.x,
this.p.y),a.absarc(this.center.x,this.center.y,this.radius,this.angle0,this.angle1,!0),a.absarc(this.center.x,this.center.y,this.donut,this.angle0,this.angle1,!1),c=this.extrudeOptions.bevelEnabled,this.extrudeOptions.bevelEnabled=this.beveled,a=r(a),a.position.set(.5*-F,.5*-E,this.zPos()),m.add(a),this.extrudeOptions.bevelEnabled=c)):(1===p?(g||(g=new THREE.BoxGeometry(1,1,1)),e=g):(L||(L=new THREE.BoxGeometry(1,1,1,p,p,p),(new THREE.SubdivisionModifier(2)).modify(L)),e=L),e=new THREE.Mesh(e,a),
e.scale.set(h.width,h.height,k*this.depth));e&&(e.position.set(h.x+.5*h.width-.5*F,-(h.y+.5*h.height)+.5*E,this.zPos()),this.showShadows&&(e.receiveShadow=!0,e.castShadow=!0),m.add(e))};this.setLineDash=function(a){this.dash=a};this.lineMaterial=function(){var a={color:this.colorToInt(this.strokeStyle),opacity:this.globalAlpha};this.dash&&0<this.dash.length?(a=new THREE.LineDashedMaterial(a),a.dashSize=3,a.gapSize=1):(a=new THREE.LineBasicMaterial(a),a.linecap=this.cap,a.linejoin=this.join);a.linewidth=
this.lineWidth;return a};this.polygon=function(a,c){var f,h=a.length,d=new THREE.Shape;d.moveTo(a[0].x,-a[0].y);for(f=1;f<h;f++){var b=a[f];d.lineTo(b.x,-b.y)}var e=d.makeGeometry();""!==c.fill&&(this.fillStyle=c.fill,0<this.depth?f=r(d):(b=this.getMaterial(),f=new THREE.Mesh(e,b),this.wireFrame||(b.side=THREE.DoubleSide)),e=k*(1-this.z),f.position.set(.5*-F,.5*E,e-.5*this.depth),this.showShadows&&(f.castShadow=!0),m.add(f));if(""!==c.stroke.fill){e=new THREE.Geometry;for(f=0;f<h;f++)b=a[f],e.vertices.push(new THREE.Vector3(b.x,
-b.y,0));h=new THREE.Line(e,this.lineMaterial());e=k*(1-this.z+this.depth);h.position.set(.5*-F,.5*E,e);m.add(h)}};this.stroke=function(){var a=this.items.length,c=this.lineMaterial();if(0<a){var f=new THREE.Geometry;for(var h=0;h<a;h++){var b=this.items[h];var d=void 0===b.z?this.z:b.z;d=k*(1-d);0==b.kind?(0<f.vertices.length&&(f=new THREE.Line(f,c),m.add(f)),f=new THREE.Geometry,f.vertices.push(new THREE.Vector3(b.x-.5*F,-b.y+.5*E,d))):1==b.kind&&f.vertices.push(new THREE.Vector3(b.x-.5*F,-b.y+
.5*E,d))}0<f.vertices.length&&(f=new THREE.Line(f,c),m.add(f))}else 0==this.depth&&(a=new THREE.Path,d=this.r,0==this.path||1==this.path?0<this.rx?t(a,d.x,-d.y-d.height,d.width,d.height,this.rx):(a.moveTo(d.x,-d.y-d.height),a.lineTo(d.x+d.width,-d.y-d.height),a.lineTo(d.x+d.width,-d.y),a.lineTo(d.x,-d.y)):6==this.path&&a.absellipse(this.cx,-this.cy,.5*d.width,.5*d.height,0,2*Math.PI,!0),f=new THREE.Line(a.createPointsGeometry(),c),f.position.set(.5*-F,.5*E,this.zPos()),m.add(f))};this.measureText=
function(a){return{width:1.4*S.measureText(a).width}};this.roundRect=function(a,c,d,h,b,e){this.path=0;this.r={x:a,y:c,width:d,height:h};this.depth=0;this.rx=b;this.ry=e};this.rect=function(a,c,d,b){this.path=0;this.r={x:a,y:c,width:d,height:b};this.ry=this.rx=this.depth=0};this.cube=function(a,c){this.path=1;this.r=a;this.items=[];p=0<c?6:1};this.sphere=function(a,c,d,b){q||(q=new THREE.SphereGeometry(1,32,32));var f=new THREE.Mesh(q,this.getMaterial());f.position.set(a-.5*F,-c+.5*E,this.zPos());
f.scale.set(.5*d,.5*b,.5*Math.min(d,k));m.add(f)};this.save=function(){};this.clip=function(){};this.restore=function(){};this.colorToInt=function(a){a=a instanceof this.Gradient?a.colors[a.colors.length-1]:a;return"#"==a.substr(0,1)?parseInt(a.substr(1),16):n(a)};this.pyramid=function(a,c){var d=[new THREE.Vector3(100,0,0),new THREE.Vector3(0,100,0),new THREE.Vector3(0,0,100),new THREE.Vector3(0,0,0)];new THREE.ConvexGeometry(d)};this.ellipsoid=function(a,c){this.path=7;this.r=a;this.vertical=c;
this.items=[]};this.cylinder=function(a,c,d){this.path=5;this.r=a;this.topRadius=c;this.vertical=d;this.items=[]};this.ellipsePath=function(a,c,d,b){this.path=6;this.cx=a;this.cy=c;this.r={x:a,y:c,width:d,height:b};this.items=[]};this.addLight=function(a,c,d,b,e,g){a=new a(c);a.position.set(d,b,e);a.shadowsEnabled=g;this.showShadows&&g&&(a instanceof THREE.SpotLight||a instanceof THREE.DirectionalLight)&&(a.castShadow=!0);K.add(a);this.lights.push(a);return a};this.fillText=function(a,c,d){if(""!==
a){a:{var b=this.font.split(" ");var f,e;for(f=0;f<b.length;f++)if(e=parseFloat(b[f])){b=e;break a}b=20}e=u(a,b);f=0;e||(e=new THREE.TextGeometry(a,{size:b,height:this.textDepth,curveSegments:2,font:"helvetiker"}),e.computeBoundingBox(),P.push({text:a,obj:e,size:b}));var g=u("Wj",b);g||(g=new THREE.TextGeometry("Wj",{size:b,height:this.textDepth,curveSegments:2,font:"helvetiker"}));g.computeBoundingBox();a=g.boundingBox;P.push({text:"Wj",obj:g,size:b});g=e.boundingBox;g=g.max.x-g.min.x;a=a.max.y-
a.min.y;if("center"===this.textAlign)f=-.5*g;else if("right"===this.textAlign||"end"===this.textAlign)f=-g;g=new THREE.MeshLambertMaterial({color:this.colorToInt(this.fillStyle),opacity:this.globalAlpha,overdraw:!1});e=new THREE.Mesh(e,g);g="top"===this.textBaseline?a:"middle"==this.textBaseline?.5*a:0;e.position.x=c+f-.5*F;e.position.y=-d+.5*E-g+(a-b);e.position.z=1+k*(1-this.z);e.rotation.x=0;e.rotation.y=2*Math.PI;m.add(e)}};this.update=function(){this.__webgl&&(I&&I.enabled&&I.update(1),this.needsRender&&
(this.hitTest&&this.doHitTest(),this.doRender()))};this.setCamera=function(a){H&&K.remove(H);this.camera=H=a?new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,1E4):new THREE.OrthographicCamera(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,.1,1E4);H.lookAt(K.position);H.position.set(0,0,800);I&&(I.object=H);this.refresh()};this.refresh=function(){this.needsRender=!0;this.update()};this.createTrackball=function(){x&&"undefined"!==typeof THREE.TrackballControls&&
(I=this.trackBall=new THREE.TrackballControls(H,x.domElement),I.enabled=!0,I.keys=[65,83,68],I.dynamicDampingFactor=.2,-1<("undefined"!=typeof navigator?navigator.userAgent.toLowerCase():"").indexOf("mac os x")&&(I.zoomSpeed=.1),I instanceof THREE.TrackballControls&&I.addEventListener("change",function(){M.needsRender=!0}))};var C,y={};document.addEventListener("fullscreenchange",b,!1);document.addEventListener("mozfullscreenchange",b,!1);document.addEventListener("webkitfullscreenchange",b,!1);this.fullScreen=
function(){var a=J,c=a.requestFullscreen||a.mozRequestFullscreen||a.webkitRequestFullscreen||a.msRequestFullScreen;c&&c.call(a)};this.onWindowResize=function(){H instanceof THREE.PerspectiveCamera&&(H.aspect=window.innerWidth/Math.max(1,window.innerHeight));H.updateProjectionMatrix();x&&x.setSize(window.innerWidth,window.innerHeight)};this.setShowShadows=function(a){this.showShadows=a;for(a=0;a<this.lights.length;a++){var c=this.lights[a];(c instanceof THREE.SpotLight||c instanceof THREE.DirectionalLight)&&
c.shadowsEnabled&&(c.castShadow=this.showShadows)}R.receiveShadow=this.showShadows;x&&(x.shadowMapEnabled=this.showShadows,x.shadowMapType=THREE.PCFSoftShadowMap,this.showShadows&&(x.shadowMapAutoUpdate=!0))};this.setShowLights=function(a){this.showLights=a;var c,d=this.lights.length;for(c=0;c<d;c++){var b=this.lights[c];if(b.__helper)a=b.visible&&this.showLights,b.__helper.traverse(function(c){c.visible=a});else if(this.showLights){if(b instanceof THREE.SpotLight)b.__helper=new THREE.SpotLightHelper(b,
16,100);else if(b instanceof THREE.PointLight)b.__helper=new THREE.PointLightHelper(b,16);else if(b instanceof THREE.DirectionalLight)b.__helper=new THREE.DirectionalLightHelper(b,16,100);else continue;K.add(b.__helper)}}this.needsRender||this.refresh()};this.showLight=function(a,c){var b=this.lights[a];b.visible=c;b.__helper&&(c=c&&this.showLights,b.__helper.traverse(function(a){a.visible=c}));this.refresh()};this.doHitTest=function(){};this.doRender=function(){x&&(x.render(K,H),x.shadowMapAutoUpdate=
!1,N&&N.visible&&N.update());this.needsRender=!1};this.clearTextCache=function(){P=[]};this.toogle=function(a,b){a.visible=b;a.visual?(a.visual.traverse(function(a){a.visible=b}),this.needsRender=!0):a.chart.draw();this.update()};this.isEnabled=function(){return this.__webgl};this.__webgl="undefined"===typeof Detector||Detector&&Detector.webgl;this.needsRender=!0;var k=200;this.showShadows=this.showLights=!1;this.items=[];this.closedPath=!1;this.textDepth=this.z=0;this.beveled=!1;var p=1,e,m;this.wireframe=
!1;this.globalAlpha=1;var D,q,w,B,g,L,O,M=this,P=[],J=document.getElementById(d),F=J.clientWidth,E=J.clientHeight,H;d=null;Q&&J instanceof HTMLCanvasElement&&(d=J);if(this.__webgl){var K=new THREE.Scene;var x=new THREE.WebGLRenderer({antialias:!0,canvas:d,clearAlpha:1})}var S=null;Q&&(S=document.createElement("canvas").getContext("2d"));this.width=F;this.height=E;this.camera=H;this.scene=K;(this.renderer=x)?x.sortObjects=!1:this.__webgl=!1;var N=this.stats=null;document.addEventListener&&"undefined"!==
typeof Stats&&(N=this.stats=new Stats,N.visible=!0,N.setVisible=function(a){N.visible=a;N.domElement.style.display=a?"block":"none"});x&&(x.setSize(F,E),this.showShadows&&(x.shadowMapEnabled=!0,x.shadowMapSoft=!0));d="#AAAA77";window.getComputedStyle&&(d=window.getComputedStyle(J).backgroundColor);x&&(x.setClearColor(this.colorToInt(d)),J!==x.domElement&&J.appendChild(x.domElement));this.lights=[];if(x){this.addLight(THREE.SpotLight,12303291,-300,300,400,!0);this.addLight(THREE.DirectionalLight,8947848,
400,1800,1600,!1);this.addLight(THREE.PointLight,8947848,500,120,-500,!1);this.setShowLights(this.showLights);d=this.ambientLight=new THREE.AmbientLight(2236962);d.visible=!1;K.add(d);d=this.hemiLight=new THREE.HemisphereLight(16777215,16777215,.5);d.position.y=500;d.visible=!1;K.add(d);var R=this.floor=new THREE.Mesh(new THREE.CylinderGeometry(4E3,4E3,50,32,1),new THREE.MeshLambertMaterial({color:this.colorToInt("silver"),map:null,opacity:.9,transparent:!0}));this.showShadows&&(R.receiveShadow=!0);
R.position.y=-20-.5*E;K.add(R);var I=this.trackBall=null;this.setCamera(!0);this.createTrackball()}this.needsRender=!0}}).call(this);