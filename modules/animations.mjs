export function toggleMediaMenu(menuStatus){
  console.log('in media menu func');
  console.log(menuStatus);
  // let menuStatus = false;
// !menuStatus ? showMenu() : hideMenu();
switch(menuStatus){
  case true: hideMenu();
return menuStatus = false;
  case false: showMenu();
  return menuStatus = true;
}
  
}
function showMenu(){
  const menu = document.querySelector('.media-menu');
  const tl = new TimelineMax();
 tl.to(menu,1,{scaleX:1,transformOrigin: 'right center'})
// tl.from(menu,0.5,{scaleX: 0, transformOrigin: 'right center'})
// tl.set(menu,{scaleX:0, transformOrigin: 'right center'})
return tl;
}
function hideMenu(){
  const menu = document.querySelector('.media-menu');
  const tl = new TimelineMax();
 tl.to(menu,1,{scaleX:0,transformOrigin: 'right center'})
// tl.from(menu,0.5,{scaleX: 0, transformOrigin: 'right center'})
// tl.set(menu,{scaleX:0, transformOrigin: 'right center'})
return tl;
}