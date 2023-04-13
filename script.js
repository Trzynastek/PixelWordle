function next(id) {
    if (document.getElementById(id-1).value.length == 0) {
        if (document.getElementById(id-1)) {
            document.getElementById(id-1).focus()
        }
    } else {
        if (document.getElementById(id)) {
            document.getElementById(id).focus()
        }
    }
    if (id <= 5) {
        check(5)
    } else if (id > 5 && id <= 10) {
        check(10)
    }else if (id > 10 && id <= 15) {
        check(15)
    }else if (id > 15 && id <= 20) {
        check(20)
    }else if (id > 20 && id <= 25) {
        check(25)
    }else if (id > 25 && id <= 30) {
        check(30)
    }
}
document.addEventListener("keydown", function(event) {
    id = parseFloat(document.getElementById(document.activeElement.getAttribute('id')).id)
    if (event.key == "Backspace") {
        document.getElementById(id).value = ''
        document.getElementById(id-1).focus()
        event.preventDefault()
    } else if (event.key == 'ArrowLeft') {
        document.getElementById(id-1).focus()
    } else if (event.key == 'ArrowRight') {
        document.getElementById(id+1).focus()
    } else {
        if (document.getElementById(id).value != '') {
            document.getElementById(id+1).focus()
        }
    }
})
function check(id) {
    id = id-5
    input = document.getElementById(id).value
    input += document.getElementById(id+1).value
    input += document.getElementById(id+2).value
    input += document.getElementById(id+3).value
    input += document.getElementById(id+4).value
    if (input.length == 5) {
        if (words.includes(input.toLowerCase()) || possibilities.includes(input.toLowerCase())) {
            letter(id, 0)
            letter(id+1, 1)
            letter(id+2, 2)
            letter(id+3, 3)
            letter(id+4, 4)
            if (document.getElementById(id+5)) {
                document.getElementById(id+5).focus()
            }
            if (input == word) {
                document.getElementById('gg').style.display = 'block'
                document.getElementById('definition').innerHTML = 'definition: ' + definition
            } else {
                if (id == 25) {
                    document.getElementById('lost').style.display = 'block'
                    document.getElementById('word').innerHTML = 'word: ' + word
                    document.getElementById('definition').innerHTML = 'definition: ' + definition
                }
            }
        } else {
            shake(id)
            shake(id+1)
            shake(id+2)
            shake(id+3)
            shake(id+4)
        }
    }
}
function letter(id, pos) {
    if (document.getElementById(id).value == word[pos]) {
        document.getElementById(id).classList.add('c')
        document.getElementById(document.getElementById(id).value).classList.add('y')
        document.getElementById(id).disabled = true
    } else if (word.includes(document.getElementById(id).value)) {
        document.getElementById(id).classList.add('p')
        document.getElementById(document.getElementById(id).value).classList.add('y')
        document.getElementById(id).disabled = true
    } else {
        document.getElementById(id).classList.add('i')
        document.getElementById(document.getElementById(id).value).classList.add('n')
        document.getElementById(id).disabled = true
    }
    if (document.getElementById(id+5)) {
        document.getElementById(id+5).disabled = false
    }
}
function clear() {
    inputs = document.getElementsByTagName("input")
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "submit" && inputs[i].type != "reset") {
            inputs[i].value = ""
            if (i > 5) {
                inputs[i].disabled = true
            }
        }
    }
}
function shake(id) {
    document.getElementById(id).classList.add('shake')
    setTimeout(() => {
        document.getElementById(id).classList.remove('shake')
    }, 300);
}
clear()
document.getElementById('0').focus()
async function start() {
    found = false
    while (!found) {
        word = possibilities[Math.floor(Math.random() * possibilities.length)]
        await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            try {
                definition = data[0].meanings[0].definitions[0].definition;
                if (definition.length > 0) {
                    found = true
                }
            } catch (error) {}
        })
        console.log(word)
        word.split('')
    }
}
start()