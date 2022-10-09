export const handleNonEmptyFieldCSS = (event, isFirstRender) => {
  document.querySelectorAll(".text-input").forEach((element) => {
    if (!isFirstRender) {
      element.addEventListener("blur", (event) => {
        if (event.target.value != "") {
          event.target.nextElementSibling.classList.add("nonEmpty")
        } else {
          event.target.nextElementSibling.classList.remove("nonEmpty")
        }
      })
    } else {
      if (element.value != "") {
        element.nextElementSibling.classList.add("nonEmpty")
      } else {
        element.nextElementSibling.classList.remove("nonEmpty")
      }
    }
  })
}

