    //==========選取copy元素
    const copyBtn = document.querySelector('#copy')

    copyBtn.addEventListener('click', doCopy)

    function doCopy() {
        const copyUrl = document.querySelector('#shortUrl')
        navigator.clipboard.writeText(`${copyUrl}`)
    }