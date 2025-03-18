function subscribe() {
  const buttonElement = document.querySelector(".js-subscribe-button");

  if (buttonElement.innerText === "Subscribe") {
    buttonElement.innerHTML = "Subscribed";
    buttonElement.classList.add("is-subscribed");
  } else {
    buttonElement.innerHTML = "Subscribe";
    buttonElement.classList.remove("is-subscribed");
  }
}

function calculateTotal() {
  let inputElement = document.querySelector(".js-cost-input");
  let cost = Number(inputElement.value);

  if(document.querySelector(".js-total").classList.contains('js-error')) {
    document.querySelector(".js-total").classList.remove('js-error');
  }

  if (cost < 0) {
    document.querySelector(".js-total").classList.add('js-error');
    document.querySelector(".js-error").innerHTML = 'Error: cost cannot be less than $0';
    return
  }
  if (cost < 40) {
    cost += 10;
  }
  document.querySelector(".js-total").innerHTML = `$${cost}`;
}

function handleCostKeyDown() {
  if (event.key === "Enter") {
    calculateTotal();
  }
}

function atualizaInput(event) {
  let inputElement = document.querySelector(".js-input");
  document.querySelector(".js-p").innerHTML = inputElement.value;
}