document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded');
})

const cardContainer = document.getElementById('card-container')
const search = document.getElementById('search')
const searchBreak = document.createElement('br')
const searchForm = document.querySelector('#search form')
const searchResult = document.createElement('div')
const error = document.createElement('h1')
search.append(searchBreak, searchForm)
cardContainer.append(search)

const URL = 'https://reviewery-backend.herokuapp.com/posts'


fetch(URL)
.then(res => res.json())
.then(brewery => brewery.forEach(renderCard))

function renderCard(brewery) {
    const card = document.createElement('div')
    const cardTop = document.createElement('div')
    const title = document.createElement('h2')
    const location = document.createElement('h2')
    const mid = document.createElement('mid')
    const bottom = document.createElement('div')
    const reviewery = document.createElement('button')
    const like = document.createElement('p')
    const likeButton = document.createElement('button')
    const dislikeButton = document.createElement('button')
    const form = document.createElement('form')
    const text = document.createElement('input')
    const submit = document.createElement('button')
    const modal = document.createElement('div')
    const modalH1 = document.createElement('h1')
    const commentForm = document.createElement('div')
    const closeModal = document.createElement('span')
    const breaktag = document.createElement('br')
    const p = document.createElement('p')

    like.innerText = `Total Likes: ${brewery.likes}`
    likeButton.innerText = '+'
    dislikeButton.innerText = '-'
    reviewery.innerText = 'Revieweries'
    submit.innerText = 'Add Comment'
    modalH1.innerText = 'Comments'
    closeModal.innerText = 'X'
    title.innerText = brewery.title
    location.innerText = brewery.location
    // error.innerText = 'Sorry, your search returned no results'

    card.id = 'card'
    cardTop.id = 'card-top'
    title.id = 'title'
    location.id = 'location'
    mid.id = 'mid'
    likeButton.id = 'like-button'
    likeButton.className = brewery.id
    dislikeButton.id = 'like-button'
    bottom.id = 'bottom'
    reviewery.id = 'review'
    modal.id = 'modal'
    commentForm.id = 'comment-form'
    closeModal.id = 'close'
    text.id = 'text-area'
    submit.id = 'submit'
    // searchResult.id = 'search-result'
    // error.id = 'error'
    
    cardTop.append(title, location)
    mid.append(like, likeButton, dislikeButton)
    bottom.append(reviewery)
    form.append(text, breaktag, submit)
    commentForm.append(closeModal, modalH1, form)
    modal.append(commentForm)
    card.append(cardTop, mid, bottom, modal)
    cardContainer.append(card)

    reviewery.addEventListener('click', () => {
        modal.style.display = 'block'
    })
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none'
    })
    
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none'
        }
    })

    likeButton.addEventListener('click', () => {
        like.innerText = `Total Likes: ${++brewery.likes}`

        fetch(`https://reviewery-backend.herokuapp.com/posts/${brewery.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                likes: brewery.likes
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err, 'error'))
    })

    dislikeButton.addEventListener('click', () => {
        like.innerText = `Total Likes: ${--brewery.likes}`

        fetch(`https://reviewery-backend.herokuapp.com/posts/${brewery.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                likes: brewery.likes
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err, 'error'))
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        p.innerText = text.value
        form.append(p)
        form.reset()
        fetch(`https://reviewery-backend.herokuapp.com/posts/${brewery.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                comments: p.innerText
            })
        })
    })

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const searchBar = document.getElementById('search-form').value
        const line = document.createElement('div')
        
        line.id = 'line'
        card.remove()
        search.append(searchResult)
        console.log(location.innerText);
        if(searchBar == location.innerText) {
            searchResult.append(card)
        } else if(searchBar === '') {
            searchResult.append(error)
        }
    })

    fetch(`https://reviewery-backend.herokuapp.com/posts/${brewery.id}/comments`)
    .then(res => res.json())
    .then(comments => comments.forEach(renderComments))

    function renderComments(brewery) {
        const comment = document.createElement('p')
        comment.innerText = brewery.comments
        form.append(comment)
    }


}
