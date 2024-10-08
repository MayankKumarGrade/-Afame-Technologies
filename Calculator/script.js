document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const historyButton = document.getElementById('historyButton');
    const historyPanel = document.getElementById('historyPanel');
    const fullHistory = document.getElementById('fullHistory');
    const clearHistoryButton = document.getElementById('clearHistoryButton');
    const title = document.getElementById('title');
    const starContainer = document.querySelector('.stars');
    const numberOfStars = 200;

    let currentInput = '';
    let calculationHistory = [];
    let longPressTimer;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-shadow';
    document.body.appendChild(cursor);

    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('Particles.js config loaded');
    });

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    historyButton.addEventListener('click', function () {
        historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
    });

    clearHistoryButton.addEventListener('click', function () {
        calculationHistory = [];
        fullHistory.innerHTML = '';
    });

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            handleInput(value);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key.match(/[0-9\/*\-+.%]/)) {
            handleInput(e.key);
        } else if (e.key === 'Enter') {
            handleInput('=');
        } else if (e.key === 'Backspace') {
            handleInput('Backspace');
        } else if (e.key === 'Escape') {
            handleInput('C');
        }
    });

    const backspaceButton = document.querySelector('.btn.backspace');
    backspaceButton.addEventListener('mousedown', function () {
        longPressTimer = setTimeout(function () {
            currentInput = '';
            display.value = currentInput;
            updateCaretPosition();
        }, 500);
    });

    backspaceButton.addEventListener('mouseup', function () {
        clearTimeout(longPressTimer);
        handleInput('Backspace');
    });

    backspaceButton.addEventListener('mouseleave', function () {
        clearTimeout(longPressTimer);
    });

    function handleInput(input) {
        if (input === 'C') {
            currentInput = '';
            display.value = currentInput;
        } else if (input === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (input === '=') {
            calculateResult();
        } else {
            const operatorMap = {
                '÷': '/',
                'x': '*'
            };
            currentInput += operatorMap[input] || input;
            display.value = currentInput.replace(/\*/g, 'x').replace(/\//g, '÷');
        }
        updateCaretPosition();
    }    
        
    function calculateResult() {
        try {
            const sanitizedInput = currentInput.replace(/[^-()\d/*+.]/g, '');
            if (sanitizedInput) {
                const result = Function('"use strict";return (' + sanitizedInput + ')')();
                if (result === Infinity || result === -Infinity) {
                    throw new Error("Divide by zero");
                }
                calculationHistory.push(currentInput.replace(/\*/g, 'x').replace(/\//g, '÷') + ' = ' + result);
                fullHistory.innerHTML = calculationHistory.join('<br>');
                currentInput = result.toString();
                display.value = currentInput;
            }
        } catch (error) {
            if (error.message === "Divide by zero") {
                display.value = "Cannot divide by zero";
            } else {
                display.value = 'Error';
            }
            currentInput = '';
        }
    }
    
    function updateCaretPosition() {
        const caret = document.querySelector('.caret');
        const displayWidth = display.offsetWidth;
        const textWidth = display.scrollWidth;
        const caretWidth = caret.offsetWidth;

        caret.style.left = `${displayWidth - caretWidth}px`;
        caret.style.top = `calc(50% - ${caret.offsetHeight / 2}px)`;
    }

    updateCaretPosition();
    document.addEventListener('input', updateCaretPosition);

    function typeWriter(text, i) {
        if (i < text.length) {
            title.innerHTML += text.charAt(i);
            setTimeout(function() {
                typeWriter(text, i + 1);
            }, 100);
        }
    }
    typeWriter(titleText, 0);
});
