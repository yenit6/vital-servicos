// Preenche ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (mobileMenu.hidden) mobileMenu.hidden = false;
  else mobileMenu.hidden = true;
});

// Quando clicar em "Agendar" em um card, preenche o select e rola ao formulário
document.querySelectorAll('.agendar').forEach(btn => {
  btn.addEventListener('click', () => {
    const serv = btn.dataset.servico || '';
    const form = document.getElementById('formContato');
    const sel = form.querySelector('select[name="servico"]');
    if (sel) {
      for (let opt of sel.options) {
        if (opt.text.includes(serv) || opt.value.includes(serv)) {
          opt.selected = true; break;
        }
      }
    }
    // rolar até o formulário
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // efeito visual rápido
    form.style.transition = 'box-shadow .25s ease';
    form.style.boxShadow = '0 8px 30px rgba(0,85,170,0.12)';
    setTimeout(() => form.style.boxShadow = '', 1200);
  });
});

// Tratamento de envio do formulário (simulado)
document.getElementById('formContato').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const data = {
    nome: f.nome.value,
    email: f.email.value,
    telefone: f.telefone.value,
    servico: f.servico.value,
    mensagem: f.mensagem.value
  };

  // Aqui você pode substituir por fetch para uma API real / Google Forms / webhook
  console.log('Dados do contato:', data);
  alert('Mensagem enviada! Obrigado — entraremos em contato em breve.');

  // limpa formulário (opcional)
  f.reset();
});

// ==== MODAL DE LOGIN / CADASTRO ====

// Seleciona elementos
const modal = document.getElementById("auth-modal");
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

// Abre o modal
openBtn.addEventListener("click", () => {
  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden"; // trava scroll
});

// Fecha o modal
closeBtn.addEventListener("click", () => {
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
});

// Fecha o modal clicando fora do conteúdo
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }
});

// Troca entre Login e Cadastro
showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
});

// "Simula" envio do formulário
document.querySelectorAll("#login-form form, #register-form form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Sistema de vitrine: operação simulada com sucesso!");
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  });
});

// ===== MODAL LOGIN/CADASTRO =====
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('auth-modal');
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegister = document.getElementById('show-register');
  const showLogin = document.getElementById('show-login');

  // ===== BACK TO TOP =====
  (function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const showAfter = 300; // px de scroll para mostrar o botão
    let supportsSmooth = 'scrollBehavior' in document.documentElement.style;

    // mostra/oculta botão com base no scroll
    function toggleBackToTop() {
      if (window.scrollY > showAfter) {
        btn.hidden = false;
        btn.classList.add('show');
        btn.setAttribute('aria-hidden', 'false');
      } else {
        btn.classList.remove('show');
        // esperar a animação desaparecer antes de esconder para leitores de tela
        setTimeout(() => { if (!btn.classList.contains('show')) btn.hidden = true; }, 300);
        btn.setAttribute('aria-hidden', 'true');
      }
    }

    // ação de voltar ao topo
    function scrollToTop() {
      if (supportsSmooth) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // fallback simples
        let current = window.scrollY;
        const step = () => {
          if (current <= 0) return;
          current -= Math.max(10, current / 8);
          window.scrollTo(0, current);
          requestAnimationFrame(step);
        };
        step();
      }
    }

    // evento de clique
    btn.addEventListener('click', scrollToTop);

    // acessibilidade: Enter / Space
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });

    // mostrar/ocultar on scroll + inicial
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    document.addEventListener('DOMContentLoaded', toggleBackToTop);
    // também checar logo após o carregamento caso já esteja scrolado
    setTimeout(toggleBackToTop, 100);
  })();


  // Abrir modal
  openBtn.addEventListener('click', () => {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  });

  // Fechar modal (botão X)
  closeBtn.addEventListener('click', () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  });

  // Fechar modal clicando fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  });

  // Alternar entre login e cadastro
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  });

  // Simular envio
  document.querySelectorAll('#login-form form, #register-form form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Simulação: operação realizada com sucesso!');
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      form.reset();
    });
  });
});

// ===== MODAIS DOS TREINAMENTOS =====
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  const openButtons = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('.close-btn');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(`modal-${id}`);
      if (modal) {
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    });
  });

  // fechar clicando fora
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    });
  });
});

// Função para mostrar aviso temporário
function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  toast.querySelector('p').textContent = mensagem;
  toast.hidden = false;
  toast.classList.add('show');

  // Some após 10 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => (toast.hidden = true), 400);
  }, 10000);
}

// Aciona o aviso ao clicar em "Agendar"
document.querySelectorAll('.btn.agendar').forEach(botao => {
  botao.addEventListener('click', () => {
    mostrarToast('✅ Serviço agendado com sucesso!');
  });
});
