const intro = document.getElementById('intro');
const linha = document.getElementById('linha');

document.getElementById('abrir').addEventListener('click', () => {
  intro.classList.add('escondido');
  linha.classList.remove('escondido');
  window.scrollTo(0, 0);
});

const player = new Audio();
const botoes = document.querySelectorAll('.tocar');
let ativo = null;

function resetar() {
  botoes.forEach(b => b.textContent = '▶ Tocar');
}

botoes.forEach(btn => {
  btn.addEventListener('click', () => {
    if (ativo === btn) {
      if (player.paused) {
        player.play();
        btn.textContent = '❚❚ Pausar';
      } else {
        player.pause();
        btn.textContent = '▶ Tocar';
      }
      return;
    }
    resetar();
    ativo = btn;
    player.src = btn.dataset.audio;
    player.play();
    btn.textContent = '❚❚ Pausar';
  });
});

player.addEventListener('ended', () => {
  resetar();
  ativo = null;
});

const musicaConvite = new Audio('arquivos/final-feliz.mp3');
const btnConvite = document.getElementById('abrirConvite');
const mensagemConvite = document.getElementById('mensagemConvite');

btnConvite.addEventListener('click', () => {
  explodirCoracoes(btnConvite);

  player.pause();
  resetar();
  ativo = null;
  btnConvite.classList.add('escondido');
  mensagemConvite.classList.remove('escondido');
  musicaConvite.play();
});

botoes.forEach(btn => btn.addEventListener('click', () => musicaConvite.pause()));

function explodirCoracoes(botao) {
  const rect = botao.getBoundingClientRect();
  const centroX = rect.left + window.scrollX + rect.width / 2;
  const centroY = rect.top + window.scrollY + rect.height / 2;
  const emojis = ['❤️', '💖', '💕', '💗', '💘'];

  for (let i = 0; i < 24; i++) {
    const coracao = document.createElement('span');
    coracao.className = 'coracao';
    coracao.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    coracao.style.left = centroX + 'px';
    coracao.style.top = centroY + 'px';

    const angulo = Math.random() * Math.PI * 2;
    const distancia = 80 + Math.random() * 120;
    coracao.style.setProperty('--x', Math.cos(angulo) * distancia + 'px');
    coracao.style.setProperty('--y', Math.sin(angulo) * distancia + 'px');

    document.body.appendChild(coracao);
    setTimeout(() => coracao.remove(), 1300);
  }
}

