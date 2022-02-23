import Modal from "./Modal.js"
import Cards from "./Cards.js"

class CreateVisitModal extends Modal {

    constructor() {
        super()
    }
    createVisitForm() {

        //Status
        this.modalStatus = document.createElement("div")
        this.modalStatus.style.display = 'none'

        this.selectStatus = document.createElement("select");
        this.selectStatus.classList.add('card__select--status')
        this.selectStatus.id = 'statusCreateModal'
        this.selectStatus.name = 'Status'

        
        
        
        
        this.optionStatus = document.createElement("option")
        this.optionStatus.name = 'optionsName'
        this.optionStatus.value = 'Open'
        this.optionStatus.selected = 'true'

        this.modalStatus.append(this.selectStatus)
        this.selectStatus.append(this.optionStatus)
        


        //-------------------------------------------


        this.modalItemName = document.createElement('div')
        this.modalItemName.classList.add('modal__item')

        this.labelName = document.createElement('label')
        this.labelName.classList.add('modal__label')
        this.labelName.setAttribute('for', 'modalName')
        this.labelName.innerText = 'Full name'

        this.inputName = document.createElement('input')
        this.inputName.required = true
        this.inputName.id = 'modalName'
        this.inputName.type = 'text'
        this.inputName.name = 'Name'
        this.inputName.classList.add('modal__input')

        this.modalItemName.append(this.labelName, this.inputName)
        

        //---------------------------------------------------------------

        this.modalItemPurpose = document.createElement('div')
        this.modalItemPurpose.classList.add('modal__item')

        this.labelPurpose = document.createElement('label')
        this.labelPurpose.setAttribute('for', 'modalPurpose')
        this.labelPurpose.classList.add('modal__label')
        this.labelPurpose.innerText = 'Purpose'

        this.inputPurpose = document.createElement('input')
        this.inputPurpose.required = true
        this.inputPurpose.id = 'modalPurpose'
        this.inputPurpose.type = 'text'
        this.inputPurpose.name = 'Purpose'
        this.inputPurpose.classList.add('modal__input')

        this.modalItemPurpose.append(this.labelPurpose, this.inputPurpose)

        //-----------------------------------------------------------

        this.modalItemUrgency = document.createElement('div')
        this.modalItemUrgency.classList.add('modal__item')

        this.labelUrgency = document.createElement('label')
        this.labelUrgency.setAttribute('for', 'modalUrgency')
        this.labelUrgency.classList.add('modal__label')
        this.labelUrgency.innerText = 'Urgency'

        this.selectUrgency = document.createElement('select')
        this.selectUrgency.required = true
        this.selectUrgency.name = 'Urgency'
        this.selectUrgency.id = 'modalUrgency'
        this.selectUrgency.size = 1
        this.selectUrgency.classList.add('modal__input')

        this.optionsUrgency = document.createElement('option')
        this.optionsUrgency.selected = true
        this.optionsUrgency.value = ''
        this.optionsUrgency.innerText = 'Choose a urgency'

        this.optionsUrgencyUsual = document.createElement('option')
        this.optionsUrgencyUsual.value = 'usual'
        this.optionsUrgencyUsual.innerText = 'Usual'

        this.optionsUrgencyPriority = document.createElement('option')
        this.optionsUrgencyPriority.value = 'priority'
        this.optionsUrgencyPriority.innerText = 'Priority'

        this.optionsUrgencyUrgent = document.createElement('option')
        this.optionsUrgencyUrgent.value = 'urgent'
        this.optionsUrgencyUrgent.innerText = 'Urgent'



        this.selectUrgency.append(this.optionsUrgency, this.optionsUrgencyUsual, this.optionsUrgencyPriority, this.optionsUrgencyUrgent)
        this.modalItemUrgency.append(this.labelUrgency, this.selectUrgency)

        //-----------------------------

        
        this.modalItemDescription = document.createElement('div')
        this.modalItemDescription.classList.add('modal__item')

        this.labelDescription = document.createElement('label')
        this.labelDescription.setAttribute('for', 'modalDescription')
        this.labelDescription.classList.add('modal__label')
        this.labelDescription.innerText = 'Short description'

        this.textAreaDescription = document.createElement('textarea')
        this.textAreaDescription.required = true
        this.textAreaDescription.id = 'modalDescription'
        this.textAreaDescription.maxLength = 190
        this.textAreaDescription.name = 'Description'
        this.textAreaDescription.classList.add('modal__input')

        this.modalItemDescription.append(this.labelDescription, this.textAreaDescription)


        //-------------------------  Создаем форму и кладем в нее все элементы по порядку
        this.visitForm = document.createElement('form')
        this.visitForm.classList.add('modal__form')
        this.visitForm.action = '#'

        this.additionalInputs = document.createElement('div')
        this.additionalInputs.classList.add('modal__item')


        this.visitForm.append(this.selectList(), this.modalStatus, this.modalItemName, this.modalItemPurpose, this.modalItemUrgency, this.modalItemDescription, this.renderFields(), this.additionalInputs,  this.createVisitBtn() )


        this.visitForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const card = new Cards()
            card.createCard(e)

            this.modalContainer = document.getElementById('modal__container')
            this.modalContainer.innerHTML = ''

        } )

        return this.visitForm

    }

    createVisitBtn() {
        this.createBtn = document.createElement('input')
        this.createBtn.classList.add('modal__btn')
        this.createBtn.type = 'submit'
        this.createBtn.value = 'Create'

        

        return this.createBtn
    }



    selectList() {
        this.modalItem = document.createElement("div")
        this.select = document.createElement("select");

        this.optionChooseDoctor = document.createElement("option")
        this.optionCardiologist = document.createElement("option")
        this.optionDentist = document.createElement("option")
        this.optionTherapist = document.createElement("option")

        this.modalItem.classList.add('modal__item')

        this.select.id = 'doctorsList'
        this.select.size = 1
        this.select.name = 'Doctor'
        this.select.classList.add('modal__input--doctors')
        this.select.required = true

        this.optionChooseDoctor.name = 'optionsName'
        this.optionChooseDoctor.value = ''
        this.optionChooseDoctor.innerText = 'Choose the Doctor'

        this.optionCardiologist.name = 'optionsName'
        this.optionCardiologist.value = 'Cardiologist'
        this.optionCardiologist.innerText = 'Cardiologist'

        this.optionDentist.name = 'optionsName'
        this.optionDentist.value = 'Dentist'
        this.optionDentist.innerText = 'Dentist'

        this.optionTherapist.name = 'optionsName'
        this.optionTherapist.value = 'Therapist'
        this.optionTherapist.innerText = 'Therapist'

        this.select.appendChild(this.optionChooseDoctor, this.optionCardiologist, this.optionDentist, this.optionTherapist)
        this.select.appendChild(this.optionCardiologist)
        this.select.appendChild(this.optionDentist)
        this.select.appendChild(this.optionTherapist)

        this.modalItem.appendChild(this.select)


        return this.modalItem
    }

    renderFields() {


        this.select.addEventListener('change', () => {
            switch (this.select.value) {
                case 'Dentist':
                    this.additionalInputs.innerHTML = ``
                    this.additionalInputs.append(this.renderDentistField())  
                    
                    break
                    

                case 'Therapist':
                    this.additionalInputs.innerHTML = ``
                    this.additionalInputs.append(this.renderTherapistField())  
                    break

                case 'Cardiologist':
                    this.additionalInputs.innerHTML = ``
                    this.additionalInputs.append(this.renderCardiologistField())  
                    break
            }
        })
        return ''

    }




    renderDentistField() {

            this.modalItemDentist = document.createElement('div')
            this.modalItemDentist.classList.add('modal__item')
    
            this.labelDentist = document.createElement('label')
            this.labelDentist.setAttribute('for', 'modalDentist')
            this.labelDentist.classList.add('modal__label')
            this.labelDentist.innerText = 'Last Visit'
    
            this.inputDentist = document.createElement('input')
            this.inputDentist.id = 'modalDentist'
            this.inputDentist.type = 'text'
            this.inputDentist.name = 'LastVisit'
            this.inputDentist.classList.add('modal__input')
    
            this.modalItemDentist.append(this.labelDentist, this.inputDentist)

            return this.modalItemDentist
    }

    renderTherapistField() {

            this.modalItemTherapist = document.createElement('div')
            this.modalItemTherapist.classList.add('modal__item')
    
            this.labelTherapist = document.createElement('label')
            this.labelTherapist.setAttribute('for', 'modalTherapist')
            this.labelTherapist.classList.add('modal__label')
            this.labelTherapist.innerText = 'Age'
    
            this.inputTherapist = document.createElement('input')
            this.inputTherapist.id = 'modalTherapist'
            this.inputTherapist.type = 'text'
            this.inputTherapist.name = 'Age'
            this.inputTherapist.classList.add('modal__input')
    
            this.modalItemTherapist.append(this.labelTherapist, this.inputTherapist)

            return this.modalItemTherapist

    }

    renderCardiologistField() {
            this.modalItemCardiologistPressure = document.createElement('div')
            this.modalItemCardiologistPressure.classList.add('modal__item')
    
            this.labelCardiologistPressure = document.createElement('label')
            this.labelCardiologistPressure.setAttribute('for', 'cardiologistPressure')
            this.labelCardiologistPressure.classList.add('modal__label')
            this.labelCardiologistPressure.innerText = 'Normal Pressure'
    
            this.inputCardiologistPressure = document.createElement('input')
            this.inputCardiologistPressure.id = 'cardiologistPressure'
            this.inputCardiologistPressure.type = 'text'
            this.inputCardiologistPressure.name = 'Pressure'
            this.inputCardiologistPressure.classList.add('modal__input')
    
            this.modalItemCardiologistPressure.append(this.labelCardiologistPressure, this.inputCardiologistPressure)

            //------------------------

            this.modalItemCardiologistIndex = document.createElement('div')
            this.modalItemCardiologistIndex.classList.add('modal__item')
    
            this.labelCardiologistIndex = document.createElement('label')
            this.labelCardiologistIndex.setAttribute('for', 'cardiologistIndex')
            this.labelCardiologistIndex.classList.add('modal__label')
            this.labelCardiologistIndex.innerText = 'Body mass index'
    
            this.inputCardiologistIndex = document.createElement('input')
            this.inputCardiologistIndex.id = 'cardiologistIndex'
            this.inputCardiologistIndex.type = 'text'
            this.inputCardiologistIndex.name = 'MassIndex'
            this.inputCardiologistIndex.classList.add('modal__input')
    
            this.modalItemCardiologistIndex.append(this.labelCardiologistIndex, this.inputCardiologistIndex)

            //----------------------------

            
            this.modalItemCardiologistDiseases = document.createElement('div')
            this.modalItemCardiologistDiseases.classList.add('modal__item')
    
            this.labelCardiologistDiseases = document.createElement('label')
            this.labelCardiologistDiseases.setAttribute('for', 'cardiologistDiseases')
            this.labelCardiologistDiseases.classList.add('modal__label')
            this.labelCardiologistDiseases.innerText = 'Past diseases of the cardiovascular system'
    
            this.inputCardiologistDiseases = document.createElement('input')
            this.inputCardiologistDiseases.id = 'cardiologistDiseases'
            this.inputCardiologistDiseases.type = 'text'
            this.inputCardiologistDiseases.name = 'Diseases'
            this.inputCardiologistDiseases.classList.add('modal__input')
    
            this.modalItemCardiologistDiseases.append(this.labelCardiologistDiseases, this.inputCardiologistDiseases)

            //------------------

            this.modalItemCardiologistAge = document.createElement('div')
            this.modalItemCardiologistAge.classList.add('modal__item')
    
            this.labelCardiologistAge = document.createElement('label')
            this.labelCardiologistAge.setAttribute('for', 'cardiologistAge')
            this.labelCardiologistAge.classList.add('modal__label')
            this.labelCardiologistAge.innerText = 'Age'
    
            this.inputCardiologistAge = document.createElement('input')
            this.inputCardiologistAge.id = 'cardiologistAge'
            this.inputCardiologistAge.type = 'text'
            this.inputCardiologistAge.name = 'Age'
            this.inputCardiologistAge.classList.add('modal__input')
    
            this.modalItemCardiologistAge.append(this.labelCardiologistAge, this.inputCardiologistAge)

            this.additionalCardiologistInputs = document.createElement('div')
            this.additionalCardiologistInputs.classList.add('modal__item')

            this.additionalCardiologistInputs.append(this.modalItemCardiologistPressure, this.modalItemCardiologistIndex, this.modalItemCardiologistDiseases, this.modalItemCardiologistAge)

            return this.additionalCardiologistInputs
   
    }

    closeModalVisit() {
        

            document.getElementById('root').innerHTML = ``

        this.visitForm.innerHTML = '';
        // this.modalVisit.remove();
    }


}

export default CreateVisitModal