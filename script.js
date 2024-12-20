// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('click', () => {
    cursor.style.transform = 'scale(0.8)';
    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
    }, 100);
});

// Floating hearts
const createHeart = () => {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
};

setInterval(createHeart, 300);

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Love counter
const startDate = new Date('2022-06-01'); // Replace with your actual start date
const updateCounter = () => {
    const now = new Date();
    const difference = now - startDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(difference / (1000 * 60));
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
};

updateCounter();
setInterval(updateCounter, 60000);

// Memory Game
const memoryGame = (() => {
    const gameBoard = document.querySelector('.game-board');
    const startButton = document.querySelector('.start-game');
    const scoreEl = document.getElementById('memory-score');
    const timeEl = document.getElementById('memory-time');
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let timer;

    const symbols = ['❤️', '😍', '💖', '💕', '💓', '💗', '💘', '💝'];
    const gameSymbols = [...symbols, ...symbols];

    const createCard = (symbol) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        return card;
    };

    const shuffleCards = () => {
        for (let i = gameSymbols.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gameSymbols[i], gameSymbols[j]] = [gameSymbols[j], gameSymbols[i]];
        }
    };

    const flipCard = (e) => {
        const card = e.target;
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            card.textContent = card.dataset.symbol;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    };

    const checkMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedPairs++;
            score += 10;
            scoreEl.textContent = score;
            if (matchedPairs === symbols.length) {
                clearInterval(timer);
                endGame();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
            }, 500);
        }
        flippedCards = [];
    };

    const startGame = () => {
        gameBoard.innerHTML = '';
        matchedPairs = 0;
        score = 0;
        scoreEl.textContent = score;
        let time = 0;
        clearInterval(timer);
        timer = setInterval(() => {
            time++;
            timeEl.textContent = time;
        }, 1000);
        shuffleCards();
        gameSymbols.forEach(symbol => {
            const card = createCard(symbol);
            gameBoard.appendChild(card);
        });
        startButton.textContent = 'Close Game';
        startButton.removeEventListener('click', startGame);
        startButton.addEventListener('click', closeGame);
    };

    const endGame = () => {
        alert(`Congratulations! You won the Memory Game! Your score: ${score}`);
        closeGame();
    };

    const closeGame = () => {
        clearInterval(timer);
        gameBoard.innerHTML = '';
        scoreEl.textContent = '0';
        timeEl.textContent = '0';
        startButton.textContent = 'Start Game';
        startButton.removeEventListener('click', closeGame);
        startButton.addEventListener('click', startGame);
    };

    startButton.addEventListener('click', startGame);
})();

// Love Quiz
const loveQuiz = (() => {
    const quizContainer = document.querySelector('.quiz-container');
    const questionEl = quizContainer.querySelector('.question');
    const optionsEl = quizContainer.querySelector('.options');
    const startButton = document.querySelector('.start-quiz');

    const questions = [
        {
            question: "What's your favorite way to show affection?",
            options: ["Hugs and kisses", "Quality time together", "Acts of service", "Word of affermiton", "All of the Above"],
            correctAnswer: "Quality time together"
        },
        {
            question: "Which romantic gesture do you appreciate most?",
            options: ["Surprise date nights", "Handwritten love notes", "Breakfast in bed", "All of the above"],
            correctAnswer: "All of the above"
        },
        {
            question: "What's your ideal way to celebrate your anniversary?",
            options: ["Fancy dinner at a restaurant", "Cozy night in with movies Together", "Weekend getaway", "Recreating our first date"],
            correctAnswer: "Cozy night in with movies Together"
        },
        {
            question: "How do you prefer to resolve conflicts in your relationship?",
            options: ["Open communication", "Taking time to cool off", "Compromise and understanding", "Seeking advice from friends or family"],
            correctAnswer: "Open communication"
        },
        {
            question: "What's your favorite shared activity as a couple?",
            options: ["Doing activities together", "Outdoor adventures", "Watching movies or TV shows Together", "Trying new hobbies"],
            correctAnswer: "Watching movies or TV shows Together"
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const displayQuestion = () => {
        const question = questions[currentQuestion];
        questionEl.textContent = question.question;
        optionsEl.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => selectOption(option));
            optionsEl.appendChild(button);
        });
    };

    const selectOption = (option) => {
        const question = questions[currentQuestion];
        if (option === question.correctAnswer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    };

    const endQuiz = () => {
        questionEl.textContent = "Thanks for playing the Love Quiz!";
        optionsEl.innerHTML = `
            <p>Your score: ${score} out of ${questions.length}</p>
            <p>Your answers reflect the unique bond you share. Keep nurturing your love!</p>
        `;
        startButton.textContent = 'Restart Quiz';
        startButton.removeEventListener('click', startQuiz);
        startButton.addEventListener('click', restartQuiz);
    };

    const startQuiz = () => {
        currentQuestion = 0;
        score = 0;
        displayQuestion();
        startButton.textContent = 'Close Quiz';
        startButton.removeEventListener('click', startQuiz);
        startButton.addEventListener('click', closeQuiz);
    };

    const closeQuiz = () => {
        questionEl.textContent = "Love Quiz";
        optionsEl.innerHTML = '<p>Click "Start Quiz" to begin!</p>';
        startButton.textContent = 'Start Quiz';
        startButton.removeEventListener('click', closeQuiz);
        startButton.addEventListener('click', startQuiz);
    };

    const restartQuiz = () => {
        startQuiz();
    };

    startButton.addEventListener('click', startQuiz);
})();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.memory-card, .gallery img, .game, .poem-container, .love-letter').forEach((el) => {
    observer.observe(el);
});

