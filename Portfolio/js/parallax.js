let bg = document.querySelector("#bg")
let mr = document.querySelector("#mr")
let ml = document.querySelector("#ml")
let fog = document.querySelector("#fog")
let parallax = document.querySelector('.header__parallax')

parallax.addEventListener('mousemove',(e)=>{
    let width = parallax.clientWidth
    let p = e.pageX / width * 100
    let offsetMl = 25
    let offsetFog = 60;
    let offsetMr = 15
    let offsetBg = 10
    ml.style.transform = `translateX(${offsetMl * p / 100 - offsetMl}px)`
    fog.style.transform = `translateX(${offsetFog * p / 100 - offsetFog}px)`
    mr.style.transform = `translateX(${offsetMr * p / 100 + offsetMr}px)`
    bg.style.transform = `translateX(${offsetBg * p / 100 - offsetBg}px)`
})