// Animación de carga escalonada para las tarjetas
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".memory-card")

  // Aplicar delay escalonado a las animaciones
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Efecto de ondas al hacer click en las tarjetas y abrir modal para imágenes
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Si se hizo clic en una imagen, abrir el modal
      if (e.target.classList.contains("memory-image")) {
        openImageModal(e.target)
        return
      }

      // Efecto de ondas para clicks en otras partes de la tarjeta
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      // Remover el elemento después de la animación
      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Efecto parallax suave al hacer scroll
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".memory-card")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index % 3) * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  // Aplicar parallax solo en pantallas grandes
  if (window.innerWidth > 768) {
    window.addEventListener("scroll", requestTick)
  }

  // Observador de intersección para animaciones al entrar en vista
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  cards.forEach((card) => {
    observer.observe(card)
  })
})

// Función para cambiar el tema (opcional)
function toggleTheme() {
  document.body.classList.toggle("dark-theme")
}

// Prevenir el comportamiento por defecto del arrastre de imágenes
document.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault()
  }
})

// Funcionalidad del modal para expandir imágenes
function openImageModal(imageElement) {
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")

  // Obtener información de la imagen y su tarjeta
  const card = imageElement.closest(".memory-card")
  const title = card.querySelector(".memory-title").textContent
  const description = card.querySelector(".memory-description").textContent

  // Configurar el modal
  modalImage.src = imageElement.src
  modalImage.alt = imageElement.alt
  modalTitle.textContent = title
  modalDescription.textContent = description

  // Mostrar el modal
  modal.style.display = "flex"
  setTimeout(() => {
    modal.classList.add("show")
  }, 10)

  // Prevenir scroll del body
  document.body.style.overflow = "hidden"
}

function closeImageModal() {
  const modal = document.getElementById("imageModal")

  modal.classList.remove("show")
  setTimeout(() => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }, 300)
}

// Event listeners para cerrar el modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal")
  const closeButton = document.querySelector(".close-button")

  // Cerrar con el botón X
  closeButton.addEventListener("click", closeImageModal)

  // Cerrar haciendo clic fuera de la imagen
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeImageModal()
    }
  })

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeImageModal()
    }
  })
})
