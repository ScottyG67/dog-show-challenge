const BASE_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {

fetch(BASE_URL).then(res =>res.json()).then(dogs => dogs.forEach(renderDog))

})

const renderDog = (dog) =>{
    const table = document.querySelector('#table-body')
    const row = document.createElement('tr')
        row.dataset.dogId = dog.id
    const dogName = document.createElement('td')
        dogName.className = "name"
        dogName.innerText = dog.name
    const dogBreed = document.createElement('td')
        dogBreed.className = "breed"
        dogBreed.innerText = dog.breed

    const dogSex = document.createElement('td')
        dogSex.className = "sex"
        dogSex.innerText = dog.sex

    const editBtnField = document.createElement('td')

    const editBtn = document.createElement('button')
        editBtn.innerText = "Edit"
        
        editBtn.addEventListener('click',//editDog)
        () => {
            editDog(dog)
        })

    editBtnField.appendChild(editBtn)

    row.append(dogName,dogBreed,dogSex, editBtnField)

    table.appendChild(row)

}


const editDog = (dog) => {

    console.log(dog)

    const form = document.querySelector('#dog-form')
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        form.addEventListener('submit',() =>{
            patchDog(event,dog)})


}

const patchDog = (event,dog) => {
    event.preventDefault()
    console.log(event.target.sex.value)

    let updateDog = {      
        "name": event.target.name.value,
        "breed": event.target.breed.value,
        "sex": event.target.sex.value
    }

    let reqObj= {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(updateDog)
    }

    fetch(BASE_URL+dog.id,reqObj).then(res => res.json()).then(updateDogRow)

}

function updateDogRow (dog) {
    const row = document.querySelector(`[data-dog-id='${dog.id}'`)
    const dogName = row.querySelector('.name')
        dogName.innerText = dog.name
    const dogBreed = row.querySelector('.breed')
        dogBreed.innerText = dog.breed
    const dogSex = row.querySelector('.sex')
        dogSex.innerText = dog.sex
}