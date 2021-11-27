// essa função jquery lê todo o doc e coloca a tag "span com hide"
$(document).ready (function(){
    $("span").hide();
});

// contador
count = 0;

// função para verificar o campo título do arquivo "cadastrarLivros.ejs". São duas condiçnoes que devem ser satisfeitas e o campo "nome" só pode receber letrar e ˜ão pode ficar vazio. No caso de uma das condições não sere atendidas, entra no "else" e via envento "onblur" a caixa de texto ficará vermleha, porque não responde alguma das condições. No caso de atender as duas condições, entra no "if" e a caixa de texto fica verde.
function validaTitulo(){
    let letras = /ˆ[a-zA-Z\s]*$/;
    let nomeLivro = document.getElementById("titulo").value;
    let campoNome = document.getElementById("titulo")
        if(/*nome.match(letras) &&*/ nomeLivro!=""){
            campoNome.style.border = "2px solid green"
            count++
        }
        else {
            campoNome.style.border = "2px solid red"
        }
}

function validaAutor(){
    let letras = /ˆ[a-zA-Z\s]*$/;
    let autorNome = document.getElementById("nomeAutor").value;
    let campoAutor = document.getElementById("nomeAutor")
        if(/*autorNome.match(letras) &&*/ autorNome!=""){
            campoAutor.style.border = "2px solid green"
            count++
        }
        else {
            campoAutor.style.border = "2px solid red"
        }
}

function validaAno(){
    let anoLivro = document.getElementById("anoPublicacao").value;
    let campoAno = document.getElementById("anoPublicacao")
        if(anoLivro.length==4){
            campoAno.style.border = "2px solid green"
            count++
        }
        else {
            campoAno.style.border = "2px solid red"
        }
}

function validaEditora (){
    let letras = /ˆ[a-zA-Z\s]*$/;
    let editoraLivro = document.getElementById("editora").value;
    let campoEditora = document.getElementById("editora")
        if(/*editoraLivro.match(letras) &&*/ editoraLivro!=""){
            campoEditora.style.border = "2px solid green"
            count++
        }
        else {
            campoEditora.style.border = "2px solid red"
        }
}

function validaGenero (){
    let letras = /ˆ[a-zA-Z\s]*$/;
    let generoLivro = document.getElementById("genero").value;
    let campoGenero = document.getElementById("genero")
        if(/*generoLivro.match(letras) && */generoLivro!=""){
            campoGenero.style.border = "2px solid green"
            count++
        }
        else {
            campoGenero.style.border = "2px solid red"
        }
}

// aqui validamos o botão para que se o contador for maior ou igual a 5 o botão envia os dados, se não, chama o "span" 
function validarCampos(){
    var span = document.getElementsByTagName("span")
    var botao = document.querySelector("button")
        if(count >=5){
            botao.setAttribute("type", "submit")
        }
        else{
            $("span").show();
        }
}

