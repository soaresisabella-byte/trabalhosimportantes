// Simples e básico!

function marcarLinkAtivo() {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.href.includes(window.location.pathname.split('/').pop())) {
      link.classList.add('active');
    }
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.minWidth = '260px';
  notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  notification.style.opacity = '0';
  notification.style.transition = 'opacity 0.25s ease';
  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    notification.style.opacity = '1';
  });

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.addEventListener('transitionend', () => notification.remove(), { once: true });
  }, 3200);
}

function attachCadastroFormHandler() {
  const form = document.getElementById('formCadastro');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const conteudo = document.getElementById('conteudo').value;
    if (conteudo.length < 10) {
      window.connectaCampus.showNotification('O conteúdo deve ter no mínimo 10 caracteres', 'error');
      return;
    }

    window.connectaCampus.showNotification('✓ Notícia publicada com sucesso!', 'success');
    setTimeout(() => this.reset(), 1000);
  });
}

function attachAdminLoginFormHandler() {
  const form = document.getElementById('adminLoginForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario.length < 3) {
      window.connectaCampus.showNotification('Usuário deve ter no mínimo 3 caracteres', 'error');
      return;
    }

    if (senha.length < 6) {
      window.connectaCampus.showNotification('Senha deve ter no mínimo 6 caracteres', 'error');
      return;
    }

    window.connectaCampus.showNotification('✓ Login realizado com sucesso!', 'success');
    setTimeout(() => {
      alert('Redirecionando para área administrativa...');
    }, 1500);
  });
}

function attachStudentLoginFormHandler() {
  const form = document.getElementById('studentLoginForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const matricula = document.getElementById('matricula').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!/^[A-Za-z0-9.\-_/]{4,}$/.test(matricula)) {
      window.connectaCampus.showNotification('Informe uma matrícula válida com letras, números e/ou pontos.', 'error');
      return;
    }

    if (senha.length < 6) {
      window.connectaCampus.showNotification('A senha deve ter no mínimo 6 caracteres.', 'error');
      return;
    }

    window.connectaCampus.showNotification('✓ Login realizado com sucesso! Redirecionando...', 'success');
    setTimeout(() => {
      window.location.href = 'homepage.html';
    }, 1200);
  });
}

function validarFormulario(form) {
  const campos = form.querySelectorAll('input[required], textarea[required], select[required]');
  let valido = true;

  campos.forEach(campo => {
    if (!campo.value.trim()) {
      campo.style.borderColor = 'red';
      valido = false;
    } else {
      campo.style.borderColor = '';
    }
  });

  return valido;
}

window.connectaCampus = window.connectaCampus || {};
window.connectaCampus.showNotification = showNotification;

document.addEventListener('DOMContentLoaded', function() {
  marcarLinkAtivo();
  attachCadastroFormHandler();
  attachAdminLoginFormHandler();
  attachStudentLoginFormHandler();
});
