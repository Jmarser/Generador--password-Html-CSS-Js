const show = document.getElementById('show-pass');
const copy = document.getElementById('copy');
const length = document.getElementById('length');
const upper = document.getElementById('toggle1');
const lower = document.getElementById('toggle2');
const number = document.getElementById('toggle3');
const symbol = document.getElementById('toggle4');
const gen = document.getElementById('gen');




/*Funciones para generar los aleatorios */
const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

const getRandomSymbol = () => {
    const symbols = "!@#$%*&^(){}=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const validateOptions = () => {

    if (length.value > 0) {

        if (upper.checked || lower.checked || number.checked || symbol.checked) {
            return true;
        }
    }
    return false;
}


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

const copyPassword = () => {

    const pass = show.value;

    if (pass.length != "") {

        if (!navigator.clipboard) {
            document.execCommand("copy", false, pass);
        } else {
            navigator.clipboard.writeText(pass)
                .then(() => {
                    show.classList.add("active");

                    setTimeout(() => {
                        show.classList.remove("active");
                    }, 3000);

                }).catch(() => {
                    alert("Error al copiar el password.");
                });
        }

    } else {

        alert("No nay nada que copiar.");
    }
}

gen.addEventListener('click', showPassword);

copy.addEventListener('click', copyPassword);