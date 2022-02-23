import CreateVisitModal from "./CreateVisitModal.js";
import Modal from "./Modal.js";
import Api from "./API.js";
import EditCard from './EditCard.js'



class Cards {
    filters = {}
    statusFilter = {}
    searchFilter = {}

    createCard(e) {
        this.data = new FormData(e.target);

        this.value = Object.fromEntries(this.data.entries());

        const api = new Api()
        api.postCard(this.value)

            .then(response => {

                this.renderCard(response.id, response.Name, response.Doctor)


                this.buttonMore.addEventListener('click', () => {
                    this.userNameValue.innerText = ''
                    this.userDoctorValue.innerText = ''


                    this.container = document.createElement('div')
                    this.container.classList.add('container__card')
                    this.cardInner.append(this.container)

                })
            })
            .then(() => {
                this.showAllCard()
            })
    }

    renderCard(card) {
        this.cardItem = document.createElement('div')
        this.cardItem.classList.add('cards__item')

        this.selectCard = document.createElement("div")
        this.selectCard = document.createElement("select");
        this.selectCard.classList.add('card__select--status')

        this.selectCard.addEventListener('change', (e) => {
            if (e.target.value === 'Done') {
                card.Status = 'Done'
                const api = new Api()
                api.editCard(card.id, card)

            } else {
                card.Status = 'Open'
                const api = new Api()
                api.editCard(card.id, card)

            }

        })


        this.optionOpen = document.createElement("option")
        this.optionOpen.name = 'optionsName'
        this.optionOpen.value = 'Open'
        this.optionOpen.innerText = 'Open'
        if (card.Status === 'Open') {
            this.optionOpen.selected = 'true'

        }

        this.optionDone = document.createElement("option")
        this.optionDone.name = 'optionsName'
        this.optionDone.value = 'Done'
        this.optionDone.innerText = 'Done'
        if (card.Status === 'Done') {
            this.optionDone.selected = 'true'

        }



        this.selectCard.appendChild(this.optionOpen)
        this.selectCard.appendChild(this.optionDone)

        this.closeBtn = document.createElement('button')
        this.closeBtn.classList.add('cards__close')
        this.closeBtn.innerText = '✖'

        this.closeBtn.addEventListener('click', () => {
            const api = new Api()
            api.deleteCard(card.id)
                .then(() => {
                    this.showAllCard()
                })
        })



        this.cardInner = document.createElement('div')
        this.cardInner.classList.add('card__inner')
        this.cardInner.id = `inner__card${card.id}`

        this.buttonWrapper = document.createElement('div')
        this.buttonWrapper.classList.add('button__wrapper')

        this.buttonMore = document.createElement('button')
        this.buttonMore.classList.add('cards__btn--more')
        this.buttonMore.id = 'card__btn-more'
        this.buttonMore.innerText = 'More'

        this.buttonMore.addEventListener('click', () => {

            Object.keys(card).map(
                key => {

                    this.moreInfo = document.createElement('div')
                    this.moreInfo.classList.add('more__info')
                    this.cardInfo = document.getElementById(`inner__card${card.id}`)
                    this.cardInfo.append(this.moreInfo)


                    this.moreInfo.insertAdjacentHTML('afterbegin', `<p class="card__info card__info__${key}">
                    <span class="span__key">${key}</span> : <span class="span__value"> ${card[key]}</span> </p>`)

                    document.querySelector(`.user__doctor-value${card.id}`).innerHTML = ``
                    document.querySelector(`.user__name-value${card.id}`).innerHTML = ``

                }
            )

        }, {
            once: true
        })


        this.buttonEdit = document.createElement('button')
        this.buttonEdit.classList.add('cards__btn--edit')
        this.buttonEdit.id = 'card__btn-edit'
        this.buttonEdit.innerText = 'Edit'


        this.buttonEdit.addEventListener('click', () => {


            switch (card.Doctor) {
                case 'Therapist': {
                    console.log(card);
                    const cardEdit = new EditCard()
                    cardEdit.renderEditTherapist()



                    cardEdit.select.value = card.Doctor
                    cardEdit.inputName.value = card.Name
                    cardEdit.inputPurpose.value = card.Purpose
                    cardEdit.selectUrgency.value = card.Urgency
                    cardEdit.textAreaDescription.value = card.Description
                    cardEdit.inputTherapist.value = card.Age


                    cardEdit.selectCard.value = card.Status



                    cardEdit.therapistWrapper.addEventListener('submit', (e) => {
                        e.preventDefault()
                        this.data = new FormData(e.target);

                        this.value = Object.fromEntries(this.data.entries());
                        this.value.Status = cardEdit.selectCard.value

                        const api = new Api()
                        api.editCard(card.id, this.value)

                            .then(resp => {
                                document.querySelector(`.user__name-value${card.id}`).innerText = `Name : ${card.Name}`;
                                document.querySelector(`.user__doctor-value${card.id}`).innerText = `Doctor : ${card.Doctor}`

                                this.closeEditModal()
                                this.showAllCard()
                            })
                    })
                }
                return

            case "Dentist": {
                const cardEdit = new EditCard()
                cardEdit.renderEditDentist()

                cardEdit.inputName.value = card.Name
                cardEdit.inputPurpose.value = card.Purpose
                cardEdit.selectUrgency.value = card.Urgency
                cardEdit.textAreaDescription.value = card.Description
                cardEdit.inputDentist.value = card.LastVisit


                cardEdit.dentistWrapper.addEventListener('submit', (e) => {
                    e.preventDefault()
                    this.data = new FormData(e.target);

                    this.value = Object.fromEntries(this.data.entries());
                    this.value.Status = cardEdit.selectCard.value

                    const api = new Api()
                    api.editCard(card.id, this.value)

                        .then(resp => {

                            document.querySelector(`.user__name-value${card.id}`).innerText = `Name : ${card.Name}`
                            document.querySelector(`.user__doctor-value${card.id}`).innerText = `Doctor : ${card.Doctor}`

                            this.closeEditModal()
                            this.showAllCard()
                        })
                })
            }
            return

            case "Cardiologist": {
                console.log(card);

                const cardEdit = new EditCard()
                cardEdit.renderEditCardiologist()

                cardEdit.select.value = card.Doctor
                cardEdit.inputName.value = card.Name
                cardEdit.inputPurpose.value = card.Purpose
                cardEdit.selectUrgency.value = card.Urgency
                cardEdit.textAreaDescription.value = card.Description
                cardEdit.inputCardiologistPressure.value = card.Pressure
                cardEdit.inputCardiologistIndex.value = card.MassIndex
                cardEdit.inputCardiologistDiseases.value = card.Diseases
                cardEdit.inputCardiologistAge.value = card.Age
                // cardEdit.selectCard.value = card.Status


                cardEdit.cardiologistWrapper.addEventListener('submit', (e) => {
                    e.preventDefault()
                    this.data = new FormData(e.target);

                    this.value = Object.fromEntries(this.data.entries());
                    this.value.Status = cardEdit.selectCard.value

                    const api = new Api()
                    api.editCard(card.id, this.value)

                        .then(resp => {

                            document.querySelector(`.user__name-value${card.id}`).innerText = `Name : ${card.Name}`
                            document.querySelector(`.user__doctor-value${card.id}`).innerText = `Doctor : ${card.Doctor}`

                            this.closeEditModal()
                            this.showAllCard()
                        })
                })
            }
            return


            }


        })



        this.userNameValue = document.createElement('p')
        this.userNameValue.classList.add(`user__name-value${card.id}`)

        this.userName = document.createElement('span')
        this.userName.classList.add('user__name')
        this.userName.innerText = 'Name : '

        this.responseUserName = document.createElement('span')
        this.responseUserName.classList.add('user__name')
        this.responseUserName.innerText = card.Name

        this.userNameValue.append(this.userName, this.responseUserName)


        this.userDoctorValue = document.createElement('p')
        this.userDoctorValue.classList.add(`user__doctor-value${card.id}`)

        this.userDoctor = document.createElement('span')
        this.userDoctor.classList.add('user__doctor')
        this.userDoctor.innerText = 'Doctor : '


        this.responseUserDoctor = document.createElement('span')
        this.responseUserDoctor.classList.add('user__doctor')
        this.responseUserDoctor.innerText = card.Doctor

        this.userDoctorValue.append(this.userDoctor, this.responseUserDoctor)


        this.responseId = document.createElement('span')
        this.responseId.id = 'resp__id'
        this.responseId.innerText = card.id

        this.buttonWrapper.append(this.buttonMore, this.buttonEdit)

        this.cardInner.append(this.responseId, this.userNameValue, this.userDoctorValue)

        this.cardItem.append(this.selectCard, this.closeBtn, this.cardInner, this.buttonWrapper)

        this.root = document.body.querySelector('#root')

        this.root.append(this.cardItem)

    }

    showAllCard() {



        const api = new Api()
        api.getAllCard()
            .then(response => {

                

                let filteredResponse = response

                Object.keys(this.filters).forEach(key => {
                    if (this.filters[key] != 'all') {

                        filteredResponse = filteredResponse.filter(item => {

                            return item.Urgency === this.filters[key]
                        })

                    }

                })

                Object.keys(this.statusFilter).forEach(key => {
                    if (this.statusFilter[key] != 'all') {

                        filteredResponse = filteredResponse.filter(item => {

                            return item.Status === this.statusFilter[key]
                        })

                    }

                })


                Object.keys(this.searchFilter).forEach(key => {
                    if (this.searchFilter[key] === this.filterSearch.value && this.filterSearch.value !== '') {
                        console.log(this.searchFilter[key]);
                        console.log(this.filterSearch.value);
                        filteredResponse = filteredResponse.filter(item => {


                            return item.Description === this.searchFilter[key]
                        })

                    }

                })


                const cardItems = document.querySelectorAll('.cards__item')

                cardItems.forEach(item => {
                    item.remove()
                })


                filteredResponse.forEach(card => {
                    this.renderCard(card)
                })

                const title = document.querySelector('.title')
                const cardsList = document.getElementsByClassName('cards__item')
                if (cardsList.length !== 0) {
                    title.innerHTML = ''
                }
            })


    }

    closeEditModal() {

        this.modalContainer = document.getElementById('modal__container')
        this.modalContainer.innerHTML = ''
    }

    createsFilters() {
        this.filterUrgency = document.getElementById('Urgency')
        //Сдеать по дефолту all
        this.filterUrgency.addEventListener('change', (e) => {
            this.filters.Urgency = e.target.value
            this.showAllCard()
        })

        this.filterStatus = document.getElementById('Status')
        this.filterStatus.addEventListener('change', (e) => {
            this.statusFilter.Status = e.target.value
            this.showAllCard()
        })

        this.filterSearch = document.getElementById('Search')
        this.filterSearch.addEventListener('change', (e) => {
            this.searchFilter.Description = e.target.value
            this.showAllCard()

        })
    }

}

export default Cards