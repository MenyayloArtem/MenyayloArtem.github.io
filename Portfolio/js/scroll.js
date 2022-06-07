const offsetY = 100
const sections = document.querySelectorAll('section')
function sublightLink(y){
    const headerLinks = document.querySelectorAll(".header__link")
    let max = 0
    for(let i = 0; i < sections.length; i++){
        let n = sections[i].offsetTop - offsetY;
        headerLinks[i].classList.remove('active')
        if(y >= n){
            max = i
        }
    }
    headerLinks[max].classList.add('active')
}


const offsetMap = {}


for(let i = 0; i < sections.length; i++){
    let el = sections[i]
    offsetMap[el.id] = el.offsetTop
}

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click",(e)=>{
        e.preventDefault()
        const id = link.getAttribute("href").slice(1)

        window.scrollTo({
            left : 0,
            top : offsetMap[id] - offsetY,
            behavior : "smooth"
        })
        sublightLink(offsetMap[id] + offsetY)
    })
})

document.addEventListener("scroll",()=>{
    sublightLink(pageYOffset)
})