// agent-agile-team — site giới thiệu: header dính, hiện dần, nút sao chép, menu màn hẹp, nền mạng lưới
(function(){
  var h=document.getElementById('siteHeader');
  if(h){var f=function(){h.classList.toggle('scrolled',window.scrollY>8)};window.addEventListener('scroll',f,{passive:true});f();}
})();
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('.reveal');
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){
    if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
  })},{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
  // mở thẳng một neo (#cai-dat…) thì hiện ngay khối đích, không chờ cuộn
  window.addEventListener('hashchange',function(){
    var t=location.hash&&document.getElementById(location.hash.slice(1));
    if(t)t.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});
  });
})();
// nút sao chép: chép nội dung <pre><code> trong cùng .code-card
(function(){
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var card=btn.closest('.code-card');var code=card&&card.querySelector('pre code');var txt=code?code.innerText:'';
      function flash(ok){btn.classList.toggle('done',ok);var l=btn.querySelector('.lbl');
        if(l){l.textContent=ok?'Đã chép':'Không chép được';setTimeout(function(){btn.classList.remove('done');l.textContent='Sao chép';},1800);}}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){flash(true)},function(){flash(false)});}
      else flash(false);
    });
  });
})();
// menu trên màn hẹp: nút mở / đóng danh sách trang
(function(){
  var btn=document.querySelector('.nav-toggle'), nav=document.getElementById('siteNav');
  if(!btn||!nav)return;
  function set(open){nav.classList.toggle('open',open);btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Đóng menu':'Mở menu');}
  btn.addEventListener('click',function(e){e.stopPropagation();set(!nav.classList.contains('open'));});
  document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
})();
// nền mạng lưới: các nút trôi chậm, nối theo khoảng cách
(function(){
  var c=document.getElementById('netbg'); if(!c||!c.getContext) return;
  var ctx=c.getContext('2d');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var darkQ=matchMedia('(prefers-color-scheme: dark)');
  var dpr=Math.min(window.devicePixelRatio||1,2), W=0,H=0,pts=[];
  var mouse={x:-9999,y:-9999};
  function col(a){return (darkQ.matches?'rgba(120,160,255,':'rgba(47,109,246,')+a+')';}
  function resize(){
    W=window.innerWidth;H=window.innerHeight;
    c.width=Math.floor(W*dpr);c.height=Math.floor(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.min(70,Math.max(22,Math.floor(W*H/26000)));
    pts=Array.from({length:n},function(){return{x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-0.5)*0.28,vy:(Math.random()-0.5)*0.28};});
    if(reduce)draw();
  }
  function draw(){
    ctx.clearRect(0,0,W,H);var i,j;
    if(!reduce){for(i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;}}
    for(i=0;i<pts.length;i++){
      for(j=i+1;j<pts.length;j++){
        var a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<150){ctx.strokeStyle=col((0.13*(1-d/150)).toFixed(3));ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
      }
      var mx=pts[i].x-mouse.x,my=pts[i].y-mouse.y,md=Math.sqrt(mx*mx+my*my);
      if(md<170){ctx.strokeStyle=col((0.18*(1-md/170)).toFixed(3));ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
    }
    for(i=0;i<pts.length;i++){ctx.fillStyle=col(0.5);ctx.beginPath();
      ctx.arc(pts[i].x,pts[i].y,1.5,0,6.2832);ctx.fill();}
    if(!reduce)requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;},{passive:true});
  window.addEventListener('mouseout',function(){mouse.x=-9999;mouse.y=-9999;});
  resize(); if(!reduce)draw();
})();
