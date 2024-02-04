import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "modal", "frame" ]
  connect() {
    this.frameTarget.addEventListener('turbo:before-morph-attribute', (event) => {
      if (event.detail.attributeName === 'src') {
        console.log('turbo:before-morph-attribute src', event.detail.newValue)
      }
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'src') {
          const src = mutation.target.src;
          console.log('frame mutation observer new src: ', src)
        }
      });
    });
    observer.observe(this.frameTarget, { attributes: true });

    this.element.addEventListener('turbo:frame-load', () => {
      this.open()
    })
  }

  open() {
    this.modalTarget.classList.remove('hidden')
  }

  close(event) {
    event.preventDefault()
    this.modalTarget.classList.add('hidden')
  }
}