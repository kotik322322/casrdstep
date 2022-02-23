import AuthModal from './AuthModal.js'


const BASE_URL = 'https://ajax.test-danit.com/api/v2'




class Api {

  getToken() {
    return sessionStorage.getItem('token');
  }


  logIn(email, password) {
    return fetch(`${BASE_URL}/cards/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

  }


  getCardById(id) {
    return fetch(`${BASE_URL}/cards/${id}`, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify()
      })
      .then(response => response.json())



  }



  getAllCard() {
    return fetch(`${BASE_URL}/cards`, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify()
      })
      .then(response => response.json())

  }



  postCard(value) {
    return fetch(`${BASE_URL}/cards`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify(value)
      })
      .then(response => response.json())



  }



  deleteCard(id) {
    return  fetch(`${BASE_URL}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      },
    })



  }


  editCard(id, value) {
    return fetch(`${BASE_URL}/cards/${id}`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        body: JSON.stringify(value)

      })
      .then(response => response.json())


  }


}


export default Api