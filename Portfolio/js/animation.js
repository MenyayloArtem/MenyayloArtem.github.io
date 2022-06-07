const el = document.querySelectorAll(".block");

el.forEach((item,i)=>{
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry)
        const title = el[i].querySelector(".block__title");
            if(entry.isIntersecting){
                title.classList.add('visible')
                return
            }
            title.classList.remove('visible')
        })
    })

    observer.observe(el[i])
})
