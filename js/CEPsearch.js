function formataCEP() {
  var cep = document.getElementById("inputCEP").value;
  //Regex - Expressão Regular
  cep = cep.replace(/\D/g, ''); // Remove tudo o que não é dígito
  cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');

  // Atualiza o valor do elemento de inputCEP com o CEP formatado
  document.getElementById('inputCEP').value = cep;
 // console.log(cep)[]
}
function limpaForm() {
  //Limpa valores do formulário de cep.
  //document.getElementById('inputCEP').value = ("");
  document.getElementById('rua').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('uf').value = ("");
  document.getElementById('inputCEP').focus();
  //  document.getElementById('ibge').value = ("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('uf').value = (conteudo.uf);
    //document.getElementById('ibge').value = (conteudo.ibge);


  } //end if.
  else {
    //CEP não Encontrado.
    limpaForm();
    alert("CEP não encontrado.");
  }
}

function pesquisaCEP() {

  var cep = document.getElementById("inputCEP").value;
  //Verifica se campo cep possui valor informado.
  if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      formataCEP();
      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById("rua").value = "...";
      document.getElementById("bairro").value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);


    } //end if.
    else {
      //cep é inválido.
      limpaForm();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpaForm();
  }
}
