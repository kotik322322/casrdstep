import AuthModal from './AuthModal.js'
import Api from './API.js'
import CreateVisitModal from "./CreateVisitModal.js";
import Cards from './Cards.js'
import EditCard from './EditCard.js'; 


const modal = new AuthModal()
const visit = new CreateVisitModal()



const card = new Cards()
card.createsFilters()

 if(sessionStorage.getItem('token')) {
     card.showAllCard()
 }

 const cardItem = document.querySelectorAll(".cards__item")
 const title = document.querySelector(".title")





const api = new Api()





