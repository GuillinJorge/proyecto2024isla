/* script para email */

const form = document.querySelector("form");

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");


function sendEmail() {
    const bodyMessage = `FullName:${fullName.value}<br>Email:${email.value}<br>Phone Number:${phone.value}<br>Message:${mess.value}`;
    
    email.send({
        Host: "smtp.elasticemail.com",
        Username:"josegonzalez281190@gmail.com",
        Password:"4E8319B484C24E376290D76F6BA563BB9DFB",
        To:'josegonzalez281190@gmail.com',
        From:"josegonzalez281190@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            
            if (message == "OK") {
                Swal.fire({
                    title: "Realizado",
                    text: "Mensaje enviado correctamente!",
                    icon: "Realizado"
                });
            }

        }
    );
}

function checkInputs(){
    const items = document.querySelectorAll(".item");

    for (const item of items){
        if (item.value == ""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        item.addEventListener("keyup", ()=> {
            if (item.value !=""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}




form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
});
