// importa o express
const { application, urlencoded } = require('express');
var express = require('express');

// chamo as funcionalidades do express
var app = express();

// declaração da porta que seráutilizada
var port = 8000;

// importa o mongoose
var mongoose = require('mongoose');

// conexão com o banco de dados Atlas
mongoose.connect('mongodb+srv://raunylima:monGo9872dB@cluster0.jqmcn.mongodb.net/minhaBiblioteca?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Conectado ao Banco de Dados');
})
    .catch(error => {
        console.log('Deu Ruim ' + error);
    });

// ALUNOS

// criando aqui o modelo para o banco de dados
const alunos = mongoose.model('alunos', {
    nomeAluno: String,
    nomeCurso: String,
    email: String,
    telefone: Number
});

// criando aqui o modelo para o banco de dados
const livros = mongoose.model('livros', {
    titulo: String,
    nomeAutor: String,
    anoPublicacao: Number,
    editora: String,
    genero: String
});

// criando aqui o modelo para o banco de dados
const emprestimo = mongoose.model('emprestimo', { //alterar o 'emprestimo' para a classe com letra maiuscula.
    tituloLivro: String,
    autorLivro: String,
    qtdeLivro: Number,
    nomeAluno: String
});

// configuração para visualização, primeiro chmando o moto de visualização
app.set('view engine', 'ejs');

// definição do diretório do moto e visualização
app.set('views', __dirname + '/views')

// aqui permite que os dados sejam enviados de uma página para outra
app.use(express.urlencoded());

// transporto através do JSON
app.use(express.json());

// chamando public
app.use(express.static(__dirname + '/public'));

// rotas
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cadastrar', (req, res) => {
    res.render('cadastrarLivros')
})

app.get('/atualizar', (req, res) => {
    res.render('atualizarLivros')
})

app.get('/criar', (req, res) => {
    res.render('cadastrarAlunos')
})

app.get('/editar', (req, res) => {
    res.render('atualizarAlunos')
})

app.get('/emprestimo', (req, res) => {
    alunos.find({}, (erro, alunos) => {
        if (erro)
            return res.status(500).send('Erro ao Consultar Aluno')
        livros.find({}, (erro, livros) => {
            if (erro)
                return res.status(500).send('Erro ao Consultar Livros')
            res.render('reservar', { alunos_item: alunos, livros_item: livros });
        })
    })
})

app.post('/livrosReservados', (req, res) => {
    let idLivros = req.body.grupo
    let idAlunos = req.body.nomeAluno
    idLivros.forEach(function (livrosId){
        livros.findById(livrosId, (erro, resultado) => {
            if (erro) throw erro
            let emprestaLivro = new emprestimo //classe depois do new começar com letra maiúscula
            emprestaLivro.tituloLivro = resultado.titulo
            emprestaLivro.autorLivro = resultado.nomeAutor
            emprestaLivro.qtdeLivro = 1
            alunos.findById(idAlunos, (erro1, resultado1) => {
                if (erro1) throw erro1
                emprestaLivro.nomeAluno = resultado1.nomeAluno;

                emprestaLivro.save((erro2) => {
                    if (erro2)
                        return res.status(500).send('Erro ao Reservar Livros')
                    })
                })
            })
        })
    return res.redirect('/listaEmprestimo')
    // listaEmprestimo
})

app.get('/listaEmprestimo', (req, res) => {
    var listaEmprestimos = emprestimo.find({}, (erro, emprestimos) => {
        if (erro)
            return res.status(500).send('Erro ao Emprestar Livros')
        res.render('listaEmprestimo', { emprestimo_item: emprestimos })
    })
})

app.get('/deletarEmprestimo/:id', (req, res) => {
    var idEmprestimo = req.params.id
    emprestimo.deleteOne({ _id: idEmprestimo }, (erro, resultado) => {
        if (erro)
            return res.status(500).send('Erro ao Excluir Emprestimo')
        res.redirect('/listaEmprestimo')
    })
})

// aqui renderizamos a página livros
app.get('/alunos', (req, res) => {
    var listaAlunos = alunos.find({}, (erro, alunos) => {
        if (erro)
            return res.status(500).send('Erro ao Consultar Aluno')
        res.render('alunos', { alunos_item: alunos })
    })
})

// metódo para envio dos dados para cadastrar os livros no banco de dados
app.post('/cadastrarAlunos', (req, res) => {
    let aluno = new alunos()
    // requisição para pegar do corpo do "ejs" a informação digitada na variável e enviar para a colection
    aluno.nomeAluno = req.body.nomeAluno
    aluno.nomeCurso = req.body.nomeCurso
    aluno.email = req.body.email
    aluno.telefone = req.body.telefone

    aluno.save((erro) => {
        if (erro)
            return res.status(500).send('Erro ao Cadastrar Aluno')
        return res.redirect('/alunos')
    })
})

app.get('/deletarAlunos/:id', (req, res) => {
    var idAluno = req.params.id
    alunos.deleteOne({ _id: idAluno }, (erro, resultado) => {
        if (erro)
            return res.status(500).send('Erro ao Excluir Aluno')
        res.redirect('/alunos')
    })
})

// rota para atualizar livros pelo id. No caso de erro entra no if, caso não haja erro, renderiz a página atualizar livros com os dados dos libros a serem atualizados.
app.get('/atualizarAlunos/:id', (req, res) => {
    alunos.findById(req.params.id, (erro, alunos) => {
        if (erro)
            return res.status(500).send('Erro ao Editar Aluno')
        res.render('atualizarAlunos', { alunos_item: alunos })
    })
})

// rota para atualizar livros. Sempre pelo id, no caso da busca dar erro, mostra a mensagem de erro ao consultar livros. Consulta realizada, entra no cadastro de livros, com as informações do livro inserido e altera-se as mesmas para realizar a edição ou atualização, caso ocorrer erro ao editar, chama mensagem de erro descrita no "if (erro)", caso contrário atualiza e redireciona para rota livros.
app.post('/atualizarAlunos', (req, res) => {
    var id = req.body.id
    alunos.findById(id, (erro, aluno) => {
        if (erro)
            return res.status(500).send('Erro ao Consultar Aluno')
        aluno.nomeAluno = req.body.nomeAluno
        aluno.nomeCurso = req.body.nomeCurso
        aluno.email = req.body.email
        aluno.telefone = req.body.telefone

        aluno.save((erro) => {
            if (erro)
                return res.status(500).send('Erro ao Atualizar Aluno')
            return res.redirect('/alunos')
        })
    })
})

// aqui renderizamos a página livros
app.get('/livros', (req, res) => {
    var listaLivros = livros.find({}, (erro, livros) => {
        if (erro)
            return res.status(500).send('Erro ao Consultar Livros')
        res.render('livros', { livros_item: livros })
    })
})



// metódo para envio dos dados para cadastrar os livros no banco de dados
app.post('/cadastrarLivros', (req, res) => {
    let livro = new livros()
    // requisição para pegar do corpo do "ejs" a informação digitada na variável e enviar para a colection
    livro.titulo = req.body.titulo
    livro.nomeAutor = req.body.nomeAutor
    livro.anoPublicacao = req.body.anoPublicacao
    livro.editora = req.body.editora
    livro.genero = req.body.genero

    livro.save((erro) => {
        if (erro)
            return res.status(500).send('Erro ao Cadastrar Livros')
        return res.redirect('/livros')
    })
})

app.get('/deletarLivros/:id', (req, res) => {
    var idLivro = req.params.id
    livros.deleteOne({ _id: idLivro }, (erro, resultado) => {
        if (erro)
            return res.status(500).send('Erro ao Excluir Livro')
        res.redirect('/livros')
    })
})

// rota para atualizar livros pelo id. No caso de erro entra no if, caso não haja erro, renderiz a página atualizar livros com os dados dos libros a serem atualizados.
app.get('/atualizarLivros/:id', (req, res) => {
    livros.findById(req.params.id, (erro, livros) => {
        if (erro)
            return res.status(500).send('Erro ao Editar Livros')
        res.render('atualizarLivros', { livros_item: livros })
    })
})

// rota para atualizar livros. Sempre pelo id, no caso da busca dar erro, mostra a mensagem de erro ao consultar livros. Consulta realizada, entra no cadastro de livros, com as informações do livro inserido e altera-se as mesmas para realizar a edição ou atualização, caso ocorrer erro ao editar, chama mensagem de erro descrita no "if (erro)", caso contrário atualiza e redireciona para rota livros.
app.post('/atualizarLivros', (req, res) => {
    var id = req.body.id
    livros.findById(id, (erro, livro) => {
        if (erro)
            return res.status(500).send('Erro ao Consultar Livros')
        livro.titulo = req.body.titulo
        livro.nomeAutor = req.body.nomeAutor
        livro.anoPublicacao = req.body.anoPublicacao
        livro.editora = req.body.editora
        livro.genero = req.body.genero

        livro.save((erro) => {
            if (erro)
                return res.status(500).send('Erro ao Atualizar Livros')
            return res.redirect('/livros')
        })
    })
})

// variável app para ouvir a "port 3000" e imprimir no prompt o console.log para verificar se passa pela porta
app.listen(port, () => {
    console.log('Rodando na Porta' + port)
})