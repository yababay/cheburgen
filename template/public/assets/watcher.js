(function(){
    const pause = 500
    let failureCounter = 0
    let socket = null 
    let watcher = setInterval(function(){
        if(socket) {failureCounter = 0; return}
        try {

            socket = new WebSocket("ws://" + location.host + "/watch");

            socket.onopen = event => {
                console.log('Starting to watch...')
            }

            socket.onmessage = event => {
                if(event.data.includes('.scss')){
                    const styleLink = document.head.querySelector('link[rel="stylesheet"]')
                    let href = styleLink.getAttribute('href')
                    let [base] = /^([^\?]+)/.exec(href)
                    styleLink.setAttribute('href', `${base}?${Math.random()}`)
                    return
                }
                window.location.reload()
            }

            socket.onclose = event => {
                console.log('The websocket is closing...');
                socket = null
            }

            socket.onerror = event => {
                console.log('Error on Websocket')
                socket = null
            }
        }
        catch(err){
            if(!failureCounter) console.log('It seems the websocket is unavailable.')
            failureCounter++
            if(failureCounter > pause * 2 * 60) {
                clearInterval(watcher) 
                console.log('Please fix the server and reload the page manually.')
            }
        }
    }, pause)
})()