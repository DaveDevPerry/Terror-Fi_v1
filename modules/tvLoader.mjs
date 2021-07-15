export function tvLoader(){
  console.log('loader');
  setTimeout(()=>{
    document.querySelector('.tv-loader')
    // .style.display = 'none';
    const tl = new TimelineMax();
    tl.to('.tv-loader',0.5,{y:'100%'})

    // make a gsap transition to slide the loader downwards
  },5000)
}