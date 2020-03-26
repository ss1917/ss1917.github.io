function TeamMember_scroll(wrapper,prev,next,img,speed,or){
   var wrapper=$(wrapper);
   var prev=$(prev);
   var next=$(next);
   var img=$(img).find('ul');
   var w=img.find('li').outerWidth(true);
   var s=speed;
   prev.click(function()
       {
           img.find('li:last').prependTo(img);
           img.css({'margin-left':-w});
           img.animate({'margin-left':0});
       }); 
   next.click(function()
       {
           img.animate({'margin-left':-w},function()
           {
               img.find('li').eq(0).appendTo(img);
               img.css({'margin-left':0});
           });
       });
     
   if(or=true){
       ad=setInterval(function(){next.click();},s*1000);
       wrapper.hover(
           function(){clearInterval(ad)},function(){ad=setInterval(function(){next.click()},s*1000);});
   }   
}
TeamMember_scroll('.team-scroll','.prev','.next','.team-list',3,true);