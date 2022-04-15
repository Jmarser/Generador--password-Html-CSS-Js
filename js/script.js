
//vinculamos con los elementos del dom que vamos a necesitar.
const show = document.getElementById('show-pass');
const copy = document.getElementById('copy');
const length = document.getElementById('length');
const upper = document.getElementById('toggle1');
const lower = document.getElementById('toggle2');
const number = document.getElementById('toggle3');
const symbol = document.getElementById('toggle4');
const gen = document.getElementById('gen');




/*Funciones para generar los aleatorios */

/*Función que genera un número aleatorio del código ASCII partiendo del 97 que corresponde al inicio de
las letras en minusculas y el aleatorio será entre 1 y 26 que son las letras del alfabeto español sin
ñ */
const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//Genera un aleatorio en el rango de letras que corresponden a las minúsculas.
const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//Genera un aleatorio de los números del 1 al 10
const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Obtiene un simbolo aleatorio del String proporcionado en la función.
const getRandomSymbol = () => {
    const symbols = "!@#$%*&^(){}=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

/*Función que valida que se haya indicado un tamaño para el password y que se haya seleccionado
al menos una de las opciones de los componentes del password. */
const validateOptions = () => {

    if (length.value > 0) {

        if (upper.checked || lower.checked || number.checked || symbol.checked) {
            return true;
        }
    }
    return false;
}

/*Genera un array compuesto por los aleatorios creados con las funciones antes vistas.
Cada vez que es llamado crea un elemento por cada opción seleccionada. */
const generatePassword = () => {
    const aux = [];

    if (upper.checked) {
        aux.push(getRandomUpper());
    }

    if (lower.checked) {
        aux.push(getRandomLower());
    }

    if (number.checked) {
        aux.push(getRandomNumber());
    }

    if (symbol.checked) {
        aux.push(getRandomSymbol());
    }

    return aux[Math.floor(Math.random() * aux.length)];

}

/*Función que se encarga de mostrar el password creado si pasa la validación de las opciones, en caso
de no hacerlo muestra un mensaje */
const showPassword = () => {

    let password = "";

    if (validateOptions()) {
        for (let i = 0; i < length.value; i++) {
            password += generatePassword();
        }
    }else{
        password = "Seleccione opciones!!"
    }

    show.textContent = password;
}

//Vamos a mostrar un mensaje sobre el botón de copiar para avisar al usuario de que se ha copiado.
const showMessageCopy = () => {
    show.classList.add("active");

    setTimeout(() => {
        show.classList.remove("active");
    }, 3000);
}

/*Función que se encarga de copiar el password generado en el portapapeles.
Al haber dos métodos para copiar en el portapapeles, pero uno de ellos está deprecated y puede 
desaparecer, usamos los dos métodos */
const copyPassword = () => {

    const pass = show.value;

    if (pass.length != "") {

        if (!navigator.clipboard) { //en navegador no soporta la api navigator, usamos el método antiguo

            document.execCommand("copy", false, pass);
            showMessageCopy();

        } else { //El navegador soporta la api navigator

            navigator.clipboard.writeText(pass)
                .then(showMessageCopy)
                .catch(() => {
                    alert("Error al copiar el password.");
                });
        }

    } else {

        alert("No nay nada que copiar.");
    }
}

//Eventos click de los botones

gen.addEventListener('click', showPassword);

copy.addEventListener('click', copyPassword);