
/**
 * Nosotros crearemos los accesos para los artesanos, daremos una contraseña 
 * provicional dado que hay que controlar sus cards de presentación.
 * 
 */

let form = document.getElementById('formArtesano');
let correo = document.getElementById("correo");
let pass = document.getElementById('pass');
let alertaLogin = document.getElementById('alertaLogin');
 
 
 
form.addEventListener('submit', e => {
    e.preventDefault();
    
    let valido = false;
    let erroneo = true;
    let alerta = "";
    alertaLogin.innerHTML = "";
     
 
    if(correo.value == ''){
        alerta += `<h3>Introduzca una dirrección de correo</h3> <br>`;
        valido = true;
    }//validaciónCorreoElectrónioEsVacío
 
    if(pass.value == ''){
        alerta += `<h3>Introducir una contraseña</h3> <br>`;
        valido = true;
    }//validaciónContraseñaVacía
  
    if(!valido){
       
         
       /**nuestra consulta a la base */
       iniciarSesion(correo.value,pass.value);
     }
 
     if(valido){
         alertaLogin.innerHTML += `
         <div class="alert alert-danger" role="alert">
             ${alerta}
         </div>`;
         pass.value = '';
     
     }
 
 
 });
 
 
 function iniciarSesion(correo,pass){

    let usuarioDatos = {
        "email": correo,
        "password": pass
    }

    let endPoint = 'http://127.0.0.1:8085/api/login/artesano';
    fetch(endPoint, {
	    method: 'post', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioDatos)
        
    }).then(function(data){
      
        return data.json()
    }).then(function(data){
      
        if(data.accessToken === undefined){
            alertaLogin.innerHTML += `
            <div class="alert alert-danger" role="alert">
                <h3>No pudimos encontrar tu cuenta o </h3> <br>
                <h3>la contraseña es incorrecta. Vuelve a intentarlo</h3> <br>
                <h3>o haz clic en "¿Olvidaste tu contraseña?"</h3> <br>
            </div>`;
        }
        else{
            sessionStorage.setItem('sessionToken',data.accessToken);
            alertaLogin.innerHTML += `
                <div class="alert alert-success" role="alert">
                    <h3>Bienvenid@</h3> <br>
                </div>`;
            window.setTimeout(() => {window.location.href = './../pages/ArtesanoAdmin.html';}, 2000);  
        }
       
    
    })
    
    .catch(function(error){
    })

}//siLosDatosSonValidosColocamosEnLocal


