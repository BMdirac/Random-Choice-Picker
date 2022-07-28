const tagsEl = document.getElementById('tags') // tagsEl => tags Element
const textarea = document.getElementById('textarea')

// this is needed so that if we go to the page it will automatically put the cursor in the textarea
textarea.focus()

// this fires up when you press down and you let go
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        // setTimeout is used to clear input value when Enter is pressed
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    // filter helps to return certain things based on conditionals(here it helps to trim out white space)
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    tagsEl.innerHTML = '' // we need to clear this otherwise it will pile up

    // to loop through the tags use forEach
    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    // the number of times its going to select each choice before it stops on one of them
    const times = 30 

    // this is to set the interval for the highlight and the remove of highlight of each choice
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100) // this should happen every one hundred mili seconds
    }, 100); 

    
    setTimeout(() => {
        clearInterval(interval)

        // this pick a random tag to land on and highlight
        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100) // note that the setTimeout time here should be the same as the one above
    }, times*100)


}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random()* tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}

