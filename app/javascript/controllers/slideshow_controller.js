import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["grid", "overlay", "photo", "floatingIcon", "floatingIconImg", "iconThumb"]

  connect() {
    this.photos = []
    this.photoIndex = 0
    this.onKeydown = (e) => { if (e.key === "Escape") this.close() }
    document.addEventListener("keydown", this.onKeydown)
  }

  disconnect() {
    document.removeEventListener("keydown", this.onKeydown)
  }

  open(event) {
    const tile = event.currentTarget
    const iconSrc = tile.dataset.iconSrc
    const photos = JSON.parse(tile.dataset.photos)
    const rect = tile.getBoundingClientRect()

    this.photos = photos
    this.photoIndex = 0

    // Prep icon thumb inside overlay (hidden until animation finishes)
    this.iconThumbTarget.src = iconSrc
    this.iconThumbTarget.style.opacity = "0"

    // Position floating icon exactly over the clicked grid tile
    const fi = this.floatingIconTarget
    this.floatingIconImgTarget.src = iconSrc
    fi.style.transition = "none"
    fi.style.top = rect.top + "px"
    fi.style.left = rect.left + "px"
    fi.style.width = rect.width + "px"
    fi.style.height = rect.height + "px"
    fi.style.opacity = "1"
    fi.classList.remove("hidden")

    // Show overlay (transparent) and fade out grid
    const overlay = this.overlayTarget
    overlay.style.transition = "none"
    overlay.style.opacity = "0"
    overlay.classList.remove("hidden")

    this.gridTarget.style.opacity = "0"
    this.gridTarget.style.pointerEvents = "none"

    // Kick off animations after two frames (so initial styles apply)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Fade in dark background
        overlay.style.transition = "opacity 0.4s"
        overlay.style.opacity = "1"

        // Slide icon to top-left corner
        fi.style.transition = "top 0.5s ease, left 0.5s ease, width 0.5s ease, height 0.5s ease"
        fi.style.top = "1rem"
        fi.style.left = "1rem"
        fi.style.width = "80px"
        fi.style.height = "80px"

        // Preload first photo
        this.photoTarget.style.transition = "none"
        this.photoTarget.style.opacity = "0"
        this.photoTarget.src = photos[0]

        // After icon lands, reveal photo and swap floating icon → static thumb
        setTimeout(() => {
          this.photoTarget.style.transition = "opacity 0.4s"
          this.photoTarget.style.opacity = "1"

          this.iconThumbTarget.style.opacity = "1"
          fi.style.opacity = "0"
          setTimeout(() => fi.classList.add("hidden"), 200)
        }, 520)
      })
    })
  }

  advance() {
    this.photoIndex++

    if (this.photoIndex >= this.photos.length) {
      this.close()
      return
    }

    const photo = this.photoTarget
    photo.style.transition = "opacity 0.15s"
    photo.style.opacity = "0"
    setTimeout(() => {
      photo.src = this.photos[this.photoIndex]
      photo.style.transition = "opacity 0.3s"
      photo.style.opacity = "1"
    }, 150)
  }

  close() {
    const overlay = this.overlayTarget

    overlay.style.transition = "opacity 0.4s"
    overlay.style.opacity = "0"

    this.gridTarget.style.transition = "opacity 0.4s"
    this.gridTarget.style.opacity = "1"

    setTimeout(() => {
      overlay.classList.add("hidden")
      this.photoTarget.style.opacity = "0"
      this.iconThumbTarget.style.opacity = "0"
      this.gridTarget.style.pointerEvents = ""
    }, 400)
  }
}
