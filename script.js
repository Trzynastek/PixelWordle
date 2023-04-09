function next(id, opt) {
    if (document.getElementById(id-1).value.length = 0) {
        if (document.getElementById(id-1)) {
            document.getElementById(id-1).focus()
        }
    } else {
        if (document.getElementById(id)) {
            document.getElementById(id).focus()
        }
    }
    if (opt == 'check') {
        check(id)
    }
}
document.addEventListener("keydown", function(event) {
    if (event.key == "Backspace") {
        focused = document.activeElement
        if (focused) {
            focused.value = ''
            document.getElementById(focused.getAttribute('id')-1).focus()
            event.preventDefault()
        }
    }
})
inputs = document.querySelectorAll("input")
inputs.forEach(function(input) {
    input.addEventListener("focus", function() {
        this.select()
    })
})
function check(id) {
    id = id-5
    input = document.getElementById(id).value
    input += document.getElementById(id+1).value
    input += document.getElementById(id+2).value
    input += document.getElementById(id+3).value
    input += document.getElementById(id+4).value
    if (words.includes(input.toLowerCase())) {
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
        }
    } else {
        shake(id, 0)
        shake(id+1, 1)
        shake(id+2, 2)
        shake(id+3, 3)
        shake(id+4, 4)
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
word = words[Math.floor(Math.random() * words.length)]
console.log(word)
word.split('')