function getinfo(){
    return fetch('http://yesno.wtf/api')
        .then((response) => console.log(response.json())) // return promise
        .then((data) => console.log(data)) // return promise data
        .catch((error) => console.log(error))
}

