const handleSubmit = (event) => {
    event.preventDefault();
  
    const myForm = event.target;
    const formData = new FormData(myForm);
  
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => navigate("/thank-you/"))
      .catch((error) => alert(error));
  };

  

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const captchaAnswer = document.getElementById('captcha').value;
    const correctAnswer = "7"; // La respuesta correcta a la pregunta "¿Cuánto es 3 + 4?"

    if (captchaAnswer === correctAnswer) {
        // Aquí puedes agregar la lógica para enviar el formulario (por ejemplo, usando AJAX)
        document.getElementById('formMessage').innerText = 'Formulario enviado correctamente.';
        document.getElementById('formMessage').style.color = 'green';
    } else {
        document.getElementById('formMessage').innerText = 'Respuesta incorrecta en el captcha. Inténtalo de nuevo.';
        document.getElementById('formMessage').style.color = 'red';
    }
});
  