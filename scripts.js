// Arrays de preguntas para cada dificultad con opciones
const easyQuestions = [
    {
        question: "¿Cuál es el resultado de 2 + 2?",
        options: ["3", "4", "5"],
        answer: "4"
    },
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["París", "Londres", "Roma"],
        answer: "París"
    },
    {
        question: "¿De qué color es el cielo?",
        options: ["Verde", "Azul", "Rojo"],
        answer: "Azul"
    },
    // Agrega más preguntas fáciles aquí
];

const mediumQuestions = [
    {
        question: "¿Cuántos lados tiene un hexágono?",
        options: ["5", "6", "7"],
        answer: "6"
    },
    {
        question: "¿Cuál es la raíz cuadrada de 81?",
        options: ["7", "8", "9"],
        answer: "9"
    },
    {
        question: "¿En qué año llegó el hombre a la luna?",
        options: ["1965", "1969", "1972"],
        answer: "1969"
    },
    // Agrega más preguntas medias aquí
];

const hardQuestions = [
    {
        question: "¿Cuál es la capital de Mongolia?",
        options: ["Astana", "Ulaanbaatar", "Bishkek"],
        answer: "Ulaanbaatar"
    },
    {
        question: "¿Cuál es el número primo más pequeño mayor que 100?",
        options: ["101", "103", "107"],
        answer: "101"
    },
    {
        question: "¿Quién escribió 'Cien años de soledad'?",
        options: ["Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa"],
        answer: "Gabriel García Márquez"
    },
    // Agrega más preguntas difíciles aquí
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerDuration = 0;
let timerEnabled = false;

function startGame() {
    // Obtener la dificultad seleccionada
    const difficulty = document.getElementById('difficulty').value;

    // Cargar las preguntas correspondientes
    if (difficulty === 'easy') {
        currentQuestions = easyQuestions;
    } else if (difficulty === 'medium') {
        currentQuestions = mediumQuestions;
    } else if (difficulty === 'hard') {
        currentQuestions = hardQuestions;
    }

    // Mostrar pantalla de juego y cargar la primera pregunta
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    showNextQuestion();

    // Configurar cronómetro si está habilitado
    timerEnabled = document.getElementById('timer-enabled').checked;
    if (timerEnabled) {
        timerDuration = parseInt(document.getElementById('timer-duration').value) * 60; // Convertir minutos a segundos
        startTimer();
        document.getElementById('timer').style.display = 'block';
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        const questionObj = currentQuestions[currentQuestionIndex];
        const puzzleArea = document.getElementById('puzzle-area');
        puzzleArea.innerHTML = `
            <p>${questionObj.question}</p>
            ${questionObj.options.map(option => `<button class="answer-button" onclick="checkAnswer('${option}')">${option}</button>`).join('')}
        `;
        updateProgress();
    } else {
        showCompletionMessage();
    }
}

function checkAnswer(selectedOption) {
    const questionObj = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');

    if (selectedOption === questionObj.answer) {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
        score += 10;
    } else {
        feedback.textContent = "Incorrecto";
        feedback.style.color = "red";
        score -= 5;
    }

    currentQuestionIndex++;
    updateScore();
    setTimeout(() => {
        feedback.textContent = '';
        showNextQuestion();
    }, 1000);
}

function updateProgress() {
    const progressValue = document.getElementById('progress-value');
    const progress = Math.floor((currentQuestionIndex / currentQuestions.length) * 100);
    progressValue.textContent = `${progress}%`;
}

function updateScore() {
    const scoreValue = document.getElementById('score-value');
    scoreValue.textContent = score;
}

function showCompletionMessage() {
    const puzzleArea = document.getElementById('puzzle-area');
    puzzleArea.innerHTML = `<p>¡Felicidades! Has completado todas las preguntas.</p>`;
    if (timerEnabled) {
        stopTimer();
    }
}

function showSettings() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'flex';
}

function saveSettings() {
    document.getElementById('settings-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';

    // Actualizar la configuración del cronómetro
    timerEnabled = document.getElementById('timer-enabled').checked;
    if (timerEnabled) {
        timerDuration = parseInt(document.getElementById('timer-duration').value) * 60; // Convertir minutos a segundos
    } else {
        stopTimer();
        document.getElementById('timer').style.display = 'none';
    }
}

function cancelSettings() {
    document.getElementById('settings-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
}

function showInstructions() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('instructions-screen').style.display = 'flex';
}

function goBack() {
    document.getElementById('instructions-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    showNextQuestion();
    if (timerEnabled) {
        startTimer();
    }
}

function pauseGame() {
    alert("Juego pausado");
    if (timerEnabled) {
        stopTimer();
    }
}

function exitGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    if (timerEnabled) {
        stopTimer();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timerDuration--;
        if (timerDuration >= 0) {
            const minutes = Math.floor(timerDuration / 60);
            const seconds = timerDuration % 60;
            document.getElementById('time-value').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            stopTimer();
            showCompletionMessage();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}
