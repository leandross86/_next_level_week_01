function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() }) //pode ser da assim: then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]") //Pode ser usado assim: ("[name=state]")

    const ufValue = event.target.value
        //console.log(event.target.value)

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then((res) => { return res.json() }) //pode ser da assim: then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
// pegar todos os itens da lista
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectItem(event) {

    const itemLi = event.target

    //add or remove a class with JavaScript
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados,
    //se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    //se ja estiver selecionado 
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else { //senão estiver selecionado
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    //para verificar: console.log(selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}