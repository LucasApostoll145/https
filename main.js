const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const resetLinks = () => {
  navLinks.forEach((link) => link.classList.remove("active"));
};

const handleScroll = () => {
  const { pageYOffset } = window;

  sections.forEach((section) => {
    const { id, offsetTop, clientHeight } = section;
    const offset = offsetTop - 1;

    if (pageYOffset >= offset && pageYOffset < offset + clientHeight) {
      resetLinks();
      navLinks.forEach((link) => {
        if (link.dataset.scroll === id) {
          link.classList.add("active");
        }
      });
    }
  });
};

document.addEventListener("scroll", handleScroll);

gsap.utils.toArray("section").forEach((section, index) => {
  const w = section.querySelector(".images");
  const [x, xEnd] = [w.scrollWidth * -1, 0];
  gsap.fromTo(
    w,
    { x },
    {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 1,
      },
    }
  );

  function escreverMensagem() {
    const h3Element = section.querySelector("h3");
    const mensagem = "Web Developer";
    let indice = 0;
    let delay = 50;

    function escreverCaractere() {
      h3Element.textContent += mensagem[indice];
      indice++;

      if (indice < mensagem.length) {
        setTimeout(escreverCaractere, delay);
      } else {
        setTimeout(apagarMensagem, 3000);
      }
    }

    function apagarMensagem() {
      if (h3Element.textContent.length > 0) {
        h3Element.textContent = h3Element.textContent.slice(0, -1);
        setTimeout(apagarMensagem, delay);
      } else {
        indice = 0;
        setTimeout(escreverCaractere, 1000);
      }
    }

    escreverCaractere();
  }

  escreverMensagem();
});
