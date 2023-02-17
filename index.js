// Random quotes API
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById('quote');
const userInput = document.getElementById('quote_input');

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// Display quotes

const renderNewQuote = async () => {
    //Fetch
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    //array of chars in quote
    let arr = quote.split('').map((value) => {
        return "<span class='quote_chars'>" + value + "</span>";
        // backgtick


    })

    quoteSection.innerHTML += arr.join('')

}



userInput.addEventListener('input', () => {
    let quote_chars = document.querySelectorAll('.quote_chars');
    quote_chars = Array.from(quote_chars);
    let user_input_chars = userInput.value.split('');

    quote_chars.forEach((item, index) => {
        console.log(item)
        //-
        if (item.innerText == user_input_chars[index]) {
            item.classList.add('succes')
        } else if (user_input_chars[index] == null) {
            if (item.classList.contains('success')) {
                item.classList.remove('success');
            } else {
                item.classList.remove('fail')
            }
        } else {
            if (!item.classList.contains('fail')) {
                mistakes++;
                item.classList.add('fail')
            }
            document.querySelector('.mistakes').innerText = mistakes;
        }

        let check = quote_chars.every((element) => {
            return element.classList.contains('success');
        })

        if (check) {
            displayResult()
        }
    });
});

function updateTimer() {
    if (time == 0) {
        displayResult();
    } else {
        document.querySelector('.timer').innerText = --time + 's'
    }
}

const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("test_stop").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "mot(s) par minute";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
};

const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("test_start").style.display = "none";
    document.getElementById("test_stop").style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    document.getElementById("test_start").style.display = "block";
    document.getElementById("test_stop").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}