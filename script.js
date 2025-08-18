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

// Controle do menu mobile
function toggleMobileMenu() {
  const menuLateral = document.querySelector('.menu-lateral')
  const overlay = document.querySelector('.menu-overlay')

  if (menuLateral.classList.contains('mobile-open')) {
    closeMobileMenu()
  } else {
    openMobileMenu()
  }
}

function openMobileMenu() {
  const menuLateral = document.querySelector('.menu-lateral')
  const overlay = document.querySelector('.menu-overlay')

  menuLateral.classList.add('mobile-open')
  overlay.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function closeMobileMenu() {
  const menuLateral = document.querySelector('.menu-lateral')
  const overlay = document.querySelector('.menu-overlay')

  menuLateral.classList.remove('mobile-open')
  overlay.style.display = 'none'
  document.body.style.overflow = 'auto'
}

// Fechar menu ao clicar em links
document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.menu-lateral a')
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu)
  })
})

function atualizarCapaComGif(gif) {
  const imagemCapa = document.querySelector('.imagem-capa')
  if (!imagemCapa || !gif) return

  const imagemAnterior = imagemCapa.querySelector('img')
  if (imagemAnterior) imagemAnterior.remove()

  const novaImagem = document.createElement('img')
  novaImagem.src = gif.url
  novaImagem.alt = gif.alt
  novaImagem.style.opacity = '0'
  novaImagem.style.transition = 'opacity 0.5s ease-in-out'
  imagemCapa.appendChild(novaImagem)

  novaImagem.onload = function () {
    novaImagem.style.opacity = '1'
  }

  reiniciarTimer()
}

// carregar GIF na capa
function carregarCapaAleatoria() {
  const gifSelecionado = selecionarGifAleatorio()
  atualizarCapaComGif(gifSelecionado)
  if (gifSelecionado) console.log(`Capa carregada: ${gifSelecionado.alt}`)
}

//  GIF favorito na capa
function carregarFavorito() {
  if (!gifsFavoritos.length) {
    carregarCapaAleatoria()
    return
  }
  const gifSelecionado = selecionarGifFavorito()
  atualizarCapaComGif(gifSelecionado)
  if (gifSelecionado) console.log(`GIF favorito carregado: ${gifSelecionado.alt}`)
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

// contador de visitantes
function atualizarContador() {
  const contadorElement = document.getElementById('contador-visitantes')
  if (contadorElement) {
    let visitantes = localStorage.getItem('visitantes') || 1
    visitantes = parseInt(visitantes) + 1
    localStorage.setItem('visitantes', visitantes)
    contadorElement.textContent = visitantes
  }
}

// att status dinâmicamente
function atualizarStatus() {
  const statusItems = [
    {
      label: 'Atualmente:',
      valores: ['Codando', 'Estudando', 'Pensando'],
    },
    {
      label: 'Ouvindo:',
      valores: [
        'The Smiths',
        'Joy Division',
        'Radiohead',
        'The strokes',
        'Black sabbath',
        'Bob dylan',
        'Elliott Smith',
        'Jeff Buckley',
        'Lana del Rey',
        'Nirvana',
        'Leornard Cohen',
        'Neil Young',
        'The cure',
        'The Smashing Pumpkins',
        'The voidz',
        'Cigarettes After Sex',
      ],
    },
    {
      label: 'Assistindo:',
      valores: [
        'Serial Experiments Lain',
        'Neon Genesis Evangelion',
        'Perfect Blue',
        'Akira',
        'Hana & Alice',
        'Where is the friends house',
        'Paris, texas',
        'Sound of metal',
        'Manchester by the sea',
        'Evil does not exist',
        'Blade runner 2049',
      ],
    },
  ]

  const statusElements = document.querySelectorAll('.status-valor')
  statusElements.forEach((element, index) => {
    if (statusItems[index]) {
      const valores = statusItems[index].valores
      const valorAleatorio = valores[Math.floor(Math.random() * valores.length)]
      element.style.opacity = '0'

      setTimeout(() => {
        element.textContent = valorAleatorio
        element.style.opacity = '1'
      }, 200)
    }
  })
}

// efeitos hover aos links rápidos
function adicionarEfeitosLinks() {
  const linksRapidos = document.querySelectorAll('.link-rapido')

  linksRapidos.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      link.style.transform = 'scale(0.95)'
      link.style.transition = 'transform 0.1s ease'

      setTimeout(() => {
        link.style.transform = 'scale(1)'
      }, 100)
    })
  })
}

// inicializar todas as interatividades
function inicializarWidgets() {
  atualizarContador()
  adicionarEfeitosLinks()

  // Atualizar status a cada 30 segundos
  setInterval(atualizarStatus, 30000)
}

// (gosto/não gosto)
let mostrandoGostos = true

const preferenciasData = {
  gostos: [
    'filmes',
    'backend',
    'café',
    'chuva',
    'silêncio',
    'livros',
    'música',
    'noites frias',
    'animes',
    'contrabaixo',
  ],
  naoGostos: [
    'sabádo',
    'domingo',
    'segunda-feira',
  ],
}

function alternarPreferencias() {
  const titulo = document.getElementById('preferencias-titulo')
  const lista = document.getElementById('preferencias-lista')
  const toggle = document.querySelector('.preferencias-toggle')

  if (!titulo || !lista) return

  // Animação de saída
  lista.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
  lista.style.opacity = '0'
  lista.style.transform = 'translateY(-10px)'

  setTimeout(() => {
    // Alternar estado
    mostrandoGostos = !mostrandoGostos

    // att título
    titulo.textContent = mostrandoGostos ? 'eu gosto de...' : 'eu não gosto de...'

    // att símbolo do botão
    toggle.textContent = mostrandoGostos ? '↔' : '↕'

    // Limpar lista atual
    lista.innerHTML = ''

    // Add novos itens
    const itensAtivos = mostrandoGostos ? preferenciasData.gostos : preferenciasData.naoGostos

    itensAtivos.forEach(item => {
      const div = document.createElement('div')
      div.className = `preferencia-item${!mostrandoGostos ? ' negativo' : ''}`
      div.textContent = item
      lista.appendChild(div)
    })

    // Animação de entrada
    setTimeout(() => {
      lista.style.opacity = '1'
      lista.style.transform = 'translateY(0)'
    }, 50)
  }, 300)
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
