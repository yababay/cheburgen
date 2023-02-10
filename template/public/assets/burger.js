(function(){
    const burgerBreakpoint = 480
    const main = document.querySelector('main')
    const links = document.querySelector('#links')
    const burger = document.querySelector('#burger')// a.bi.x
    const close = document.querySelector('header a.bi.x') 

    if(main && links && burger){

        function toggleMenu(state = 'none') {
            links.style.display = state
        }

        burger.addEventListener('click', e => {
            e.preventDefault()
            toggleMenu('block')
        })

        close.addEventListener('click', e => {
            e.preventDefault()
            toggleMenu('none')
        })

        window.addEventListener('resize', e => {
            toggleMenu(window.innerWidth > burgerBreakpoint ? 'inline-block' : 'none')
        })

        document.addEventListener("click", e => {
            let target = e.target;      
            do {
                if (target == links || target == burger) return;
                target = target.parentNode;
            } 
            while (target);
            toggleMenu('none')
        });

        window.addEventListener('keyup', e => e.key == 'Escape' && toggleMenu())
    }
})()
