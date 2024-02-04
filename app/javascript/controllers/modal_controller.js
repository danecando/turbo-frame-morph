import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "modal" ]
  connect() {
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