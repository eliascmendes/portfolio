// Lista de GIFs para capa
const capasGifs = [
  {
    url: 'https://64.media.tumblr.com/7805939ee72fe2fd1dd6daa07681587f/900526542c307808-27/s540x810/b04c4a56407f0d7d497733af99d6fb3869571d89.gifv',
    alt: 'Taste of cherry',
  },
  {
    url: 'https://64.media.tumblr.com/d24e8071a58b5dc782a8f89f55fe16c2/900526542c307808-a7/s540x810/eff319b11ca08ee05311c4c47d29a2567838aaee.gifv',
    alt: 'Taste of cherry',
  },
  {
    url: 'https://64.media.tumblr.com/8424944d2ce9db7a8a41e3fb7dc7f8ab/900526542c307808-88/s540x810/9c74a08c4cc42fab2fdd62fe77a2057e8d4c4f3a.gifv',
    alt: 'Taste of cherry',
  },
  {
    url: 'https://media1.tenor.com/m/gMfN8Tbt6_8AAAAd/yes-yep.gif',
    alt: 'Look Back',
  },
  {
    url: 'https://media1.tenor.com/m/lcMNVWq9LBwAAAAd/albus-dumbledore-dumbledore.gif',
    alt: 'Harry potter e o principe mestiço',
  },
  {
    url: 'https://tenor.com/view/vincent-van-gogh-art-painting-loving-vincent-movies-gif-12373504',
    alt: 'Van gogh',
  },
  {
    url: 'https://media1.tenor.com/m/nSW6zMdCKhcAAAAd/%D0%B2%D0%B0%D0%BD-%D0%B3%D0%BE%D0%B3.gif',
    alt: 'Van gogh',
  },
  {
    url: 'https://64.media.tumblr.com/2ca960f781405e1bdf6f70246d778fa0/709d1221026234b6-10/s400x600/ba3e2f6be60f49bfea1837af3b8c71364f292743.gifv',
    alt: 'sound of metal',
  },
  {
    url: 'https://64.media.tumblr.com/bc9c2d1f009020aed2bab398f067333f/6a6522ccc2756f57-b2/s400x600/ee27126959c8d465eb1991e9172266cd70ea0460.gifv',
    alt: 'árvore da vida',
  },
]

// favoritos com prioridade
const gifsFavoritos = []

let timerTrocaGif = null

// GIF aleatório das duas listas
function selecionarGifAleatorio() {
  const todosGifs = [...capasGifs, ...gifsFavoritos]
  const indiceAleatorio = Math.floor(Math.random() * todosGifs.length)
  return todosGifs[indiceAleatorio]
}

// GIF favorito específico
function selecionarGifFavorito() {
  const indiceAleatorio = Math.floor(Math.random() * gifsFavoritos.length)
  return gifsFavoritos[indiceAleatorio]
}

// carregar GIF na capa
function carregarCapaAleatoria() {
  const imagemCapa = document.querySelector('.imagem-capa')
  const gifSelecionado = selecionarGifAleatorio()

  if (imagemCapa) {
    const imagemAnterior = imagemCapa.querySelector('img')
    if (imagemAnterior) {
      imagemAnterior.remove()
    }

    //  nova imagem
    const novaImagem = document.createElement('img')
    novaImagem.src = gifSelecionado.url
    novaImagem.alt = gifSelecionado.alt

    //  efeito de fade-in
    novaImagem.style.opacity = '0'
    novaImagem.style.transition = 'opacity 0.5s ease-in-out'

    imagemCapa.appendChild(novaImagem)

    // Fade-in após carregar
    novaImagem.onload = function () {
      novaImagem.style.opacity = '1'
    }

    console.log(`Capa carregada: ${gifSelecionado.alt}`)

    reiniciarTimer()
  }
}

//  GIF favorito na capa
function carregarFavorito() {
  const imagemCapa = document.querySelector('.imagem-capa')
  const gifSelecionado = selecionarGifFavorito()

  if (imagemCapa) {
    const imagemAnterior = imagemCapa.querySelector('img')
    if (imagemAnterior) {
      imagemAnterior.remove()
    }

    const novaImagem = document.createElement('img')
    novaImagem.src = gifSelecionado.url
    novaImagem.alt = gifSelecionado.alt

    novaImagem.style.opacity = '0'
    novaImagem.style.transition = 'opacity 0.5s ease-in-out'

    imagemCapa.appendChild(novaImagem)

    novaImagem.onload = function () {
      novaImagem.style.opacity = '1'
    }

    console.log(`GIF favorito carregado: ${gifSelecionado.alt}`)

    reiniciarTimer()
  }
}

function reiniciarTimer() {
  if (timerTrocaGif) {
    clearTimeout(timerTrocaGif)
  }

  timerTrocaGif = setTimeout(function () {
    carregarCapaAleatoria()
    console.log('GIF trocado automaticamente após 2 minutos')
  }, 120000)
}

// adicionar novo GIF à lista
function adicionarNovoGif(url, alt) {
  capasGifs.push({ url, alt })
  console.log(`Novo GIF adicionado: ${alt}`)
}

//  trocar capa manualmente
function trocarCapa() {
  carregarCapaAleatoria()
}


//  GIF aleatório quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
  carregarCapaAleatoria()
  inicializarWidgets()
})

//  listeners para teclas
document.addEventListener('keydown', function (event) {
  if (event.key === 'r' || event.key === 'R') {
    if (!event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      trocarCapa()
    }
  }

  if (event.key === 'e' || event.key === 'E') {
    if (!event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      carregarFavorito()
    }
  }
})
