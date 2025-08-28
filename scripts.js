
    // Ano no rodapé
    document.getElementById('ano').textContent = new Date().getFullYear();

    // Tema (claro/escuro) com persistência
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);

    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
    });

    // Modal de confirmação do envio
    const form = document.getElementById('contatoForm');
    const modal = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    let pendingFormData = null; // armazena dados enquanto confirma

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // não envia ainda
      // captura dados do formulário
      const dados = {
        nome: form.nome.value.trim(),
        telefone: form.telefone.value.trim(),
        email: form.email.value.trim(),
        mensagem: form.mensagem.value.trim(),
      };
      pendingFormData = dados;
      openModal();
    });

    function openModal() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }

    cancelBtn.addEventListener('click', closeModal);

    // Confirma e envia via mailto (sem backend)
    confirmBtn.addEventListener('click', () => {
      if (!pendingFormData) return;
      const para = "mylenadaluzalves@gmail.com";
      const assunto = encodeURIComponent("Contato pelo Portfólio");
      const corpo = encodeURIComponent(
        `Nome: ${pendingFormData.nome}\nTelefone: ${pendingFormData.telefone}\nE-mail: ${pendingFormData.email}\n\nMensagem:\n${pendingFormData.mensagem}`
      );
      // Abre o cliente de e-mail do usuário já com o texto montado
      window.location.href = `mailto:${para}?subject=${assunto}&body=${corpo}`;
      closeModal();
      form.reset();
      pendingFormData = null;
    });

    // Fecha modal clicando fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
