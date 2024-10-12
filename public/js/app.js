let menu = document.querySelector(".menu span");
let sidemenu = document.querySelector(".sidemenu");
let main = document.querySelector("#main")
let dot = document.querySelector(".dot");


let menuclose = document.querySelector(".menuclose span")

document.addEventListener("DOMContentLoaded",()=>{
    


menu.addEventListener("click",(e)=>{
    sidemenu.style.marginTop = '0'
 })
 
 menuclose.addEventListener("click",(e)=>{
     sidemenu.style.marginTop = '-100vh'
 })

 let fnc = () => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  }
  fnc()

  
  main.addEventListener("mousemove",(e)=>{
    let mainDiv = main.getBoundingClientRect()
     dot.style.left = e.clientX - mainDiv.left + 5+ "px"
     dot.style.top = e.clientY - mainDiv.top+ 5 + "px"
  })
  main.addEventListener("mouseleave",(e)=>{
     dot.style.display = 'none'
     dot.style.opacity = '0'
  })
  main.addEventListener("mouseenter",(e)=>{
     dot.style.display = 'block'
     dot.style.opacity = '1'
  })
})