function pesquisarLivro() {
  // Variáveis
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput1");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable1");
  tr = table.getElementsByTagName("tr");

  //Comparar o campo do input com o campo da tabela
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function pesquisarAluno() {
  // Variáveis
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable2");
  tr = table.getElementsByTagName("tr");

  //Comparar o campo do input com o campo da tabela
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function pesquisar() {
  // Variáveis
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  //Comparar o campo do input com o campo da tabela
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

$(function(){
$(".esconder").hide();
});

$("#mostrarLista").click(function(){
$(".modal").css({display: "initial"});
});

$("#logar").click(function(){
var usuario = document.getElementById("login_nome").value;
var senha = document.getElementById("senha").value;

if(usuario == "adm" && senha == "123456"){
  $(".esconder").show();
  $(".modal").css({display: "none"});
  alert("Administrador logado!")
}else{
  $(".modal").css({display: "none"});
  alert("Usuário logado!")
}
});

$(function(){
$(".close").click(function(){
  $(".modal").css({display: "none"});
});
});