document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("button");

    button.addEventListener("click", function(event) {
        event.preventDefault(); // Evita o envio do formulário sem validação

        let warnerror = document.getElementsByClassName("Warn");
        let hasError = false;

        for (let i = 0; i < warnerror.length; i++) {
            let input = warnerror[i].querySelector("input");

            if (input && input.value.trim() === "") {
                input.classList.add("is-invalid"); // Bootstrap classe para borda vermelha
                hasError = true;
            } else {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid"); // Bootstrap classe para borda verde
            }
        }

        if (!hasError) {
            alert("Cadastro realizado com sucesso!");
        }
    });
});
