const tagsEl = document.getElementById('tags')
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

    tagsEl.innerHTML = ''

    // to loop through the tags use forEach
    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    // the number of time its going to select each one before it stops
    const times = 30 

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100);

    // pick a random tag to stop on
    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)
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

