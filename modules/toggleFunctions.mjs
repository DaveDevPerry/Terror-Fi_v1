export function displayMedia(id){
  console.log(id);










  const mediaDislpays = document.querySelectorAll('.media-container');
  mediaDislpays.forEach((display) => {
    console.log(display);
    display.classList.remove('media-active');

  })
  document.querySelector(`.${id}`).classList.add('media-active');
}