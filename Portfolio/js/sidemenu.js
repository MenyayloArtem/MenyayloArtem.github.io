const openMenu = document.querySelector(".side-menu__ico.open")
const closeMenu = document.querySelector(".side-menu__ico.close")
const menu = document.querySelector(".side-menu")

openMenu.onclick = () => {
    if(!menu.classList.contains(".expanded")){
        menu.classList.add('expanded')
    }
}

closeMenu.onclick = () => {
    menu.classList.remove('expanded')
}