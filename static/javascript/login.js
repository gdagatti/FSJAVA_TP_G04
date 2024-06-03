/**
 * Autor
 * version
 * fercha
 * El siguiente script sirve a index.html y genera control de flujos y repite el codigo con bucle do-while
 */

// Definimos Variables 
let loginForm = document.getElementById("form_registro");
let contador = 3;

// Agregamos un evento para que inicialice el formulario. 
loginForm.addEventListener("submit", function(evento){
evento.preventDefault()

// Declaración de las variables con los valores que vienen del formulario
    let usr = document.getElementById("email").value;
    let clave = document.getElementById("pass").value;

    if ((usr === "codo@codo.com") && clave === "123") {
        // Si son correctos, mostramos un mensaje de ingreso exitoso
        alert("Ingreso exitoso. ¡Bienvenido, " + usr + "!");
        location.href = './privado.html'
    } else {   
        // Si no son correctos, mostramos un mensaje de error
        contador--  //Actualizacion de la variable de control

        if(contador >0){
            alert("Mail o Contraseña incorrectos. Por favor, inténtelo de nuevo. OJO!! te quedan " + contador + "  intentos");
        }else{
            loginForm.style.display = "none";
            alert("Demasiados intentos. Se ha bloqueado tu acceso.");
        }

    }
})