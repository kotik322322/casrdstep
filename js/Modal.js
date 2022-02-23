

class Modal {
    createModal(element = '') {
        this.modalVisit = document.createElement('div')
        this.modalVisit.classList.add('modal-main')


        this.modalBody = document.createElement('div')
        this.modalBody.classList.add('modal__body')

        this.modalControl = document.createElement('div')
        this.modalControl.classList.add('modal__control')

        this.closeBtn = document.createElement('button')
        this.closeBtn.id = 'modal-close'
        this.closeBtn.classList.add('modal__close')
        this.closeBtn.innerText = "✖"

        this.modalInner = document.createElement('div')
        this.modalInner.classList.add('modal-body')

        this.modalFooter = document.createElement('div')
        this.modalFooter.classList.add('modal-footer', 'card-modal-footer')



        this.modalVisit.append(this.modalBody)
        this.modalBody.append(this.modalControl)

        this.modalControl.append(this.closeBtn, this.modalInner, this.modalFooter)

        this.modalContainer = document.createElement('div')
        this.modalContainer.id = 'modal__container'
        this.modalContainer.append(this.modalVisit)

        document.getElementById('root').prepend(this.modalContainer)
        this.modalControl.appendChild(element)

        this.closeModal()

    }

    closeModal() {
        document.addEventListener('click', (e) => {
            this.closeBtn = document.getElementById('modal-close')
            this.modalBody = document.querySelector('.modal__body')
            if (e.target === this.closeBtn ||
                e.target === this.modalBody
            ) {
                document.getElementById('modal__container').innerHTML = ``
            } 

        })
    }


}




export default Modal