//First page
let anyType = document.getElementById("any-type");
let mainPg = document.getElementById("main");
let Types = document.getElementById("type");
let nestedTypes = document.getElementById("nested-type");
let showNestedType = document.getElementById("show-nested-type");
let allTypes = document.querySelectorAll(".items");
let dropDownLogo = document.createElement("i");
dropDownLogo.classList.add("fa-solid", "fa-caret-down");
anyType.appendChild(dropDownLogo);

const typeSetted = (types) => {
    let dropDownLogo = document.createElement("i");
    dropDownLogo.classList.add("fa-solid", "fa-caret-down");
    anyType.textContent = types.textContent;
    anyType.appendChild(dropDownLogo);
    Types.style.display = "none";
}
allTypes.forEach((types) => {
    types.addEventListener("click", () => { typeSetted(types) });
})
const setType = () => {
    Types.style.display = "block";
}
const showSetType = () => {
    nestedTypes.style.display = "block";
}
const hideTypes = (event) => {
    if (!Types.contains(event.target) && event.target !== anyType) {
        Types.style.display = "none";
    }
}
document.addEventListener("click", hideTypes);
anyType.addEventListener("click", setType);
showNestedType.addEventListener("click", showSetType);

//Next Page

let allUrl = [
    "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple",
    "https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple"
]

let randomIndex = Math.floor(Math.random() * 7);
let randomIndex2 = Math.floor(Math.random() * 4);
let secondPg = document.getElementById("scnd-pg");

const allQuiz = async (url) => {
    const response = await fetch(url);
    const quizzes = await response.json();
    const questions = quizzes.results;

    let currentIndex = 0;
    let marks = 0;
    let answerChecked = false;
    let quizTypeHeading = document.getElementById("quiz-type");
    let numberOfQuestions = document.getElementById("numOfQuestion");
    let allQuestions = document.getElementById("questions");
    let options = document.getElementById("options");
    let results = document.getElementById("results");
    let nxtBtn = document.getElementById("nxtButton");

    const displayQuestions = () => {

        if (currentIndex < questions.length) {

            questions.forEach((obj) => {
                quizTypeHeading.textContent = obj.category + " Quiz:";
            });
            numberOfQuestions.innerText = `Question ${currentIndex + 1} of 5`;

            // Questions
            allQuestions.innerHTML = "";
            allQuestions.classList.add("que");
            let li = document.createElement("li");
            li.textContent = currentIndex + 1 + ". " + questions[currentIndex].question;
            allQuestions.appendChild(li);
            li.appendChild(document.createElement("br"));
            li.classList.add("question");

            //Options

            options.innerHTML = "";
            let option = questions[currentIndex].incorrect_answers;
            option.push(questions[currentIndex].correct_answer);
            let shuffleOptions = [...option].sort(() => Math.random() - 0.5);
            shuffleOptions.map((opt) => {
                let optionLi = document.createElement("li");
                let optButtons = document.createElement("button");
                optionLi.appendChild(optButtons);
                optButtons.innerText = opt;
                optButtons.classList.add("opt");
                optButtons.addEventListener("click", checkAnswer);
                options.appendChild(optionLi);
                optionLi.appendChild(document.createElement("br"));
            });

            currentIndex++;
            answerChecked = false;
        }
        else {
            showResult();
        }
    }


    const checkResults = () => {
        results.style.display = "none";
        secondPg.style.display = "block";

        currentIndex = 0;

        quizTypeHeading.textContent = questions[currentIndex].category + " Quiz:";

        numberOfQuestions.innerText = `Question ${currentIndex + 1} of 5`;
        allQuestions.innerHTML = `${currentIndex + 1}. ${questions[currentIndex].question}<br>`;

        options.innerHTML = "";
        let option = questions[currentIndex].incorrect_answers;
        let shuffleOptions = [...option].sort(() => Math.random() - 0.5);
        shuffleOptions.forEach((opt) => {
            let optionLi = document.createElement("li");
            let optButtons = document.createElement("button");
            optionLi.appendChild(optButtons);
            optButtons.innerText = opt;
            options.appendChild(optionLi);
            optionLi.appendChild(document.createElement("br"));
            optButtons.classList.add("opt2");
            if (opt === questions[currentIndex].correct_answer) {
                optButtons.classList.add("opt3");
            }
        });

        const goToNext = () => {
            currentIndex++;
            if (currentIndex < questions.length) {
                quizTypeHeading.textContent = questions[currentIndex].category + " Quiz:";
                numberOfQuestions.innerText = `Question ${currentIndex + 1} of 5`;
                allQuestions.innerHTML = `${currentIndex + 1}. ${questions[currentIndex].question}<br>`;
                options.innerHTML = "";
                let option = questions[currentIndex].incorrect_answers;
                let shuffleOptions = [...option].sort(() => Math.random() - 0.5);
                shuffleOptions.forEach((opt) => {
                    let optionLi = document.createElement("li");
                    let optButtons = document.createElement("button");
                    optionLi.appendChild(optButtons);
                    optButtons.innerText = opt;
                    options.appendChild(optionLi);
                    optionLi.appendChild(document.createElement("br"));
                    optButtons.classList.add("opt2");
                    if (opt === questions[currentIndex].correct_answer) {
                        optButtons.classList.add("opt3");
                    }
                });

                if (currentIndex === questions.length - 1) {
                    const goBack = () => {
                        location.reload();
                    }
                    nxtBtn.textContent = "Go back to Quizzes";
                    nxtBtn.style.width = "200px"
                    nxtBtn.classList.add("goBackBtn");
                    nxtBtn.addEventListener("click", goBack);
                }
            }
        };

        nxtBtn.textContent = "Next =>";
        nxtBtn.classList.add("btns");
        nxtBtn.addEventListener("click", goToNext);
    };

    //Check Answers

    const checkAnswer = (event) => {
        if (!answerChecked) {
            let choosenAns = event.target.textContent;
            let correctAns = questions[currentIndex - 1].correct_answer;
            if (choosenAns === correctAns) {
                marks++;
            }
            answerChecked = true;
            event.target.style.backgroundColor = "white";
            displayQuestions();
        }
    }
    const startQuiz = () => {
        mainPg.style.display = "none";
        secondPg.style.display = "block";
        displayQuestions();
    }
    const strtQuiz = document.getElementById("start-quiz");
    strtQuiz.addEventListener("click", startQuiz);


    const showResult = () => {
        secondPg.style.display = "none";
        results.style.display = "block";
        let h4 = document.createElement("h4");
        h4.textContent = "Quiz Results";
        results.appendChild(h4);
        let p = document.createElement("p");
        p.textContent = `You scored ${marks} out of 5`;
        results.appendChild(p);


        const goBack = () => {
            location.reload();
        }
        let goBackBtn = document.createElement("buttons");
        goBackBtn.textContent = "Go back to Quizzes";
        goBackBtn.classList.add("goBackBtn");
        goBackBtn.addEventListener("click", goBack);
        results.appendChild(goBackBtn);

        let checkingBtn = document.createElement("button");
        checkingBtn.classList.add("checkingBtn");
        checkingBtn.textContent = "Correct Answers";
        checkingBtn.onclick = checkResults;
        results.appendChild(checkingBtn);
    }
}

if (anyType.innerHTML == 'Any &nbsp;<i class="fa-solid fa-caret-down"></i>') {
    allQuiz(allUrl[randomIndex]);
}
const checkType = (index) => {
    if (index === 0) {
        allQuiz(allUrl[randomIndex]);
    } else if (index === 1) {
        allQuiz(allUrl[0]);
    } else if (index === 2) {
        allQuiz(allUrl[1]);
    } else if (index === 3) {
        allQuiz(allUrl[2]);
    } else if (index === 4) {
        allQuiz(allUrl[3]);
    } else if (index === 5) {
        allQuiz(allUrl[4]);
    } else if (index === 6) {
        allQuiz(allUrl[5]);
    } else if (index === 7) {
        allQuiz(allUrl[6]);
    }
}

const allCategory = document.querySelectorAll(".items");
allCategory.forEach((categories, index) => {
    categories.addEventListener("click", () => { checkType(index) });
});