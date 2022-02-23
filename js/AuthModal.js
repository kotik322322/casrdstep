import Modal from './Modal.js'
import Api from './API.js'
import CreateVisitModal from './CreateVisitModal.js';
import Cards from './Cards.js';

class AuthModal extends Modal {
    constructor() {
        super()
        this.changeHeaderBtn()
    }


    //Создает форму регистрации
    createAuthInput() {
        const html = `
                <label for="formEmail" class="auth__label">Email</label>
                    <input id="formEmail" type="text" name="userEmail" placeholder="Email" class="auth__input">
    
                <label for="formName" class="auth__label">Password</label>
                    <input id="formPassword" type="password" name="userPassword" placeholder="Password" class="auth__input">
                    `;
        const authItem = document.createElement('div')
        authItem.classList.add('auth__item')
        authItem.insertAdjacentHTML('beforeend', html)
        return authItem
    }

    //Помещаем кнопку и форму регистрации в форму
    createAuthForm() {
        const authForm = document.createElement('form')
        authForm.classList.add('auth__form')
        authForm.id = 'auth__form'
        authForm.action = '#'
        authForm.appendChild(this.createAuthInput())
        authForm.appendChild(this.createAuthBtn())

        return authForm
    }


    renderAuthForm() {
        this.openingBtn = document.querySelector('#header-btn')
        this.openingBtn.addEventListener('click', () => {
            this.createModal(this.createAuthForm())
        })

    }

    //  Создает в форме кнопку логин
    createAuthBtn() {
        this.loginBtn = document.createElement('button')
        this.loginBtn.type = 'submit'
        this.loginBtn.id = 'auth__modal__btn'
        this.loginBtn.classList.add('auth__btn')
        this.loginBtn.innerText = 'Log in'


        this.loginBtn.addEventListener('click', (e) => {
            e.preventDefault()

            const emailInput = document.getElementById('formEmail')
            const passwordInput = document.getElementById('formPassword')

            const api = new Api()
            api.logIn(emailInput.value, passwordInput.value)

                .then(function (response) {
                    
                    if (response.status !== 200) {
                        alert('Неправильный логин или пароль')
                        return;
                    }
                    response.text()
                        .then(token => {
                            sessionStorage.setItem('token', token)
                            const modal = new AuthModal()
                            modal.removeModal()
                            const card = new Cards()
                            card.showAllCard()
                        })
                        
                })
            })



        return this.loginBtn
    }
    changeHeaderBtn() {
        if (!sessionStorage.getItem('token')) {
            this.renderAuthForm()
        } 
        else {
            this.openingBtn = document.querySelector('#header-btn')
            this.openingBtn.parentNode.removeChild(this.openingBtn);
            const container = document.querySelector('.header__btn')

            this.createCardBtn = document.createElement('button')
            this.createCardBtn.id = 'btn-render__modal'
            this.createCardBtn.classList.add('header__action-btn')
            this.createCardBtn.innerText = 'Create Card'
            container.append(this.createCardBtn)

            const visitModal = new CreateVisitModal()
            this.createCardBtn.addEventListener('click', 
            ()=>  {this.createModal(visitModal.createVisitForm())}
            
            )


            

        }
    }

    removeModal() {
        document.getElementById('root').innerHTML = ``
    }

}


export default AuthModal