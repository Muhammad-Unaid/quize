const formSection = document.getElementById('form-section');
const quizSection = document.getElementById('quiz-section');
const userForm = document.getElementById('user-form');
const quizForm = document.getElementById('quiz-form');
const timerElement = document.getElementById('time-left');

let timeLeft = 120;
let timer;

// Questions for the quiz
const questions = [

  
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HyperText Making Language",
            "HyperText Markup Language",
            "None of the above"
        ],
        answer: "HyperText Markup Language"

    },
    {
        question: "Which class in Bootstrap is used to create a responsive fixed-width container?",
        options: [
            ".container",
            ".container-fluid",
            ".container-fixed",
            ".container-responsive"
        ],
        answer: ".container"
    },
    {
        question: "Which Bootstrap class is used to create a primary button?",
        options: [
            ".btn-primary",
            ".btn-default",
            ".btn-main",
            ".btn-action"
        ],
        answer: ".btn-primary"
    },
    {
        question: "Which property is used to change the font size in CSS?",
        options: [
            "font-size",
            "text-size",
            "font-style",
            "text-style"
        ],
        answer: "font-size"
    },
    {
        question: "Which class in Bootstrap is used to create a responsive navigation bar?",
        options: [
            ".navbar",
            ".nav",
            ".navigation",
            ".navbar-responsive"
        ],
        answer: ".navbar"
    },
    {
        question: "Which property is used to change the text color in CSS?",
        options: [
            "color",
            "text-color",
            "font-color",
            "text-style"
        ],
        answer: "color"
    },
    {
        question: "Which class in Bootstrap is used to create a grid system?",
        options: [
            ".grid",
            ".container",
            ".row",
            ".column"
        ],
        answer: ".row"
    },
    {
        question: "Which property is used to set the space between elements in CSS?",
        options: [
            "margin",
            "padding",
            "spacing",
            "border"
        ],
        answer: "margin"
    },
    {
        question: "Which class in Bootstrap is used to create a responsive image?",
        options: [
            ".img-responsive",
            ".img-fluid",
            ".image-responsive",
            ".image-fluid"
        ],
        answer: ".img-fluid"
    },
    {
        question: "Which property is used to set the width of an element in CSS?",
        options: [
            "width",
            "size",
            "length",
            "dimension"
        ],
        answer: "width"
    },
    {
        question: "Which class in Bootstrap is used to create a modal dialog?",
        options: [
            ".modal",
            ".dialog",
            ".popup",
            ".window"
        ],
        answer: ".modal"
    },
    {
        question: "Which property is used to set the font family in CSS?",
        options: [
            "font-family",
            "text-family",
            "font-type",
            "text-type"
        ],
        answer: "font-family"
    },
    {
        question: "Which class in Bootstrap is used to create a badge?",
        options: [
            ".badge",
            ".label",
            ".tag",
            ".marker"
        ],
        answer: ".badge"
    },
    {
        question: "Which property is used to set the text alignment in CSS?",
        options: [
            "text-align",
            "align-text",
            "text-position",
            "align"
        ],
        answer: "text-align"
    },
    {
        question: "Which class in Bootstrap is used to create a carousel?",
        options: [
            ".carousel",
            ".slider",
            ".gallery",
            ".slideshow"
        ],
        answer: ".carousel"
    },
    // {
    //     question: "Which property is used to set the border style in CSS?",
    //     options: [
    //         "border-style",
    //         "border",
    //         "border-width",
    //         "border-color"
    //     ],
    //     answer: "border-style"
    // },
    
    // {
    //     question: "Which class in Bootstrap is used to create a jumbotron?",
    //  options: [
    //      ".jumbotron",
    //      ".hero",
    //      ".banner",
    //      ".highlight"
    //  ],
    //  answer: ".jumbotron"
    //  },
    // Add more questions here

   
];

// Form submit handler
document.getElementById('submit-form').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const rollNumber = document.getElementById('rollNumber').value.trim();

    if (!name || !email || !rollNumber) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            color: '#ffff',
            background: "#fff url(https://media.istockphoto.com/id/1392420739/vector/led-screen-dot-rgb-background-television-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=cepLXMMT5w1qW8o4o47V__AUtc61L34CTa5f_Xo5dJ4=) no-repeat ",
            text: 'Please fill out all fields!'
        });
        return;
    }

    // Save user data to localStorage
    localStorage.setItem('userData', JSON.stringify({ name, email, rollNumber }));

    formSection.classList.add('d-none');
    quizSection.classList.remove('d-none');

    startQuiz();
});

// Start quiz and timer
function startQuiz() {
    loadQuestions();

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

// Load questions dynamically
function loadQuestions() {
    const quizQuestions = document.getElementById('quiz-questions');
    questions.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('mb-3');
        questionBlock.innerHTML = `
                    <p><strong>Q${index + 1}: ${q.question}</strong></p>
                    ${q.options.map(option => `
                        <div class="form-check">
                            <input class="form-check-input"  type="radio" name="question${index}" value="${option}">
                            <label class="form-check-label" >${option}</label>
                        </div>
                    `).join('')}
                `;
        quizQuestions.appendChild(questionBlock);
    });
}

// Submit quiz handler
document.getElementById('submit-quiz').addEventListener('click', submitQuiz);

function submitQuiz() {
    clearInterval(timer);

    const formData = new FormData(quizForm);
    let score = 0;

    questions.forEach((q, index) => {
        if (formData.get(`question${index}`) === q.answer) {
            score++;
        }
    });

    Swal.fire({
        icon: 'success',
        title: 'Quiz Completed!',
        color: "#black",
        background: "#fff url(https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-abstract-shiny-spectrum-multicolor-wave-design-element-on-white-background-png-image_4645761.png) no-repeat ",
        
        text: `You scored ${score} out of ${questions.length}`
    });
}