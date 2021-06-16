export function loader(){
  console.log('loader');
  setTimeout(()=>{
    // document.querySelector('.loader')
    // .style.display = 'none';
    const tl = new TimelineMax();
    tl.to('.loader',2,{y:'100%'})

    // make a gsap transition to slide the loader downwards
  },10000)
}