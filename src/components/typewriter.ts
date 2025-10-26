export function typewriter(el: HTMLElement, text: string, speedMs = 40){
  el.innerHTML = `<span class="typewrite"><span class="text"></span><span class="caret"></span></span>`;
  const span = el.querySelector(".text") as HTMLElement;
  const caret = el.querySelector(".caret") as HTMLElement;

  let i = 0;
  function tick(){
    if(i <= text.length){
      span.textContent = text.slice(0, i);
      i++;
      requestAnimationFrame(()=>setTimeout(tick, speedMs));
    }else{
      // stop at the end (caret just blinks)
      caret.style.animationPlayState = "running";
    }
  }
  caret.style.animationPlayState = "paused";
  tick();
}
