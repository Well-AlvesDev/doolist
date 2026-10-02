// Procura na página o botão que abre o menu e a lista de links do menu.
// Se algum desses elementos não existir, o código não tenta usar o menu.
const menuToggle = document.querySelector(".navbar__toggle");
const menu = document.querySelector("#menu-principal");

// Procura também o fundo escurecido que aparece atrás do menu em celulares.
const menuOverlay = document.querySelector(".navbar__overlay");

if (menuToggle && menu) {
    // Fecha o menu e atualiza os avisos usados por leitores de tela.
    const closeMenu = () => {
        // Remove as classes que deixam o menu e o fundo visíveis.
        menu.classList.remove("is-open");
        menuOverlay?.classList.remove("is-visible");

        // Informa que o menu está fechado e que o botão serve para abri-lo.
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    };

    // Quando a pessoa toca no botão, alterna entre abrir e fechar o menu.
    menuToggle.addEventListener("click", () => {
        // Lê o estado atual do botão: "true" significa que o menu está aberto.
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        // Mostra ou esconde o menu e o fundo escurecido conforme o novo estado.
        menu.classList.toggle("is-open", !isOpen);
        menuOverlay?.classList.toggle("is-visible", !isOpen);

        // Atualiza o estado e o texto acessível do botão.
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    });

    // Tocar no fundo escurecido também fecha o menu.
    menuOverlay?.addEventListener("click", closeMenu);

    // Fecha o menu quando a pessoa escolhe um link dentro dele.
    menu.addEventListener("click", (event) => {
        // Confere se o elemento clicado é um link.
        if (event.target instanceof HTMLAnchorElement) {
            closeMenu();
        }
    });

    // Permite fechar o menu pelo teclado, pressionando a tecla Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu();

            // Em celulares, devolve o foco ao botão depois de fechar o menu.
            if (window.matchMedia("(max-width: 600px)").matches) {
                menuToggle.focus();
            }
        }
    });
}
