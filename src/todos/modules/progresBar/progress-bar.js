import todoStore, { Filters } from '../../../store/todo-store';

let fillElement = null;
let valueElement = null;
let hasShownConfetti = false;

/**
 * Initialize progress bar elements
 */
const initProgressBar = () => {
    if (!fillElement) {
        fillElement = document.querySelector('.fill');
    }
    if (!valueElement) {
        valueElement = document.querySelector('.value');
    }

    if (!fillElement || !valueElement) {
        console.warn('Progress bar elements not found');
        return false;
    }

    return true;
};

/**
 * Calculate completion percentage
 * @returns {number} Percentage of completed todos (0-100)
 */
const calculateProgress = () => {
    const allTodos = todoStore.getTodos(Filters.All);
    const completedTodos = todoStore.getTodos(Filters.Completed);

    if (allTodos.length === 0) {
        return 0;
    }

    return Math.round((completedTodos.length / allTodos.length) * 100);
};

/**
 * Update progress bar visual elements
 * @param {number} percentage - Progress percentage (0-100)
 */
const updateProgressBarUI = (percentage) => {
    if (!fillElement || !valueElement) return;

    // Update fill width with smooth animation
    fillElement.style.width = `${percentage}%`;

    // Update percentage text
    valueElement.textContent = `${percentage}%`;

    // Add visual feedback for different progress levels
    fillElement.className = 'fill'; // Reset classes

    if (percentage === 0) {
        fillElement.classList.add('empty');
    } else if (percentage < 25) {
        fillElement.classList.add('low');
    } else if (percentage < 50) {
        fillElement.classList.add('medium-low');
    } else if (percentage < 75) {
        fillElement.classList.add('medium');
    } else if (percentage < 100) {
        fillElement.classList.add('high');
    } else {
        fillElement.classList.add('complete');
    }
};

/**
 * Create confetti animation
 */
const showConfetti = () => {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;

    document.body.appendChild(confettiContainer);

    // Create confetti pieces
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const startPosition = Math.random() * 100;
        const animationDelay = Math.random() * 3;
        const fallDuration = 3 + Math.random() * 2;

        confetti.style.cssText = `
            position: absolute;
            top: -10px;
            left: ${startPosition}%;
            width: 8px;
            height: 8px;
            background-color: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${fallDuration}s linear ${animationDelay}s forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;

        confettiContainer.appendChild(confetti);
    }

    // Add confetti animation styles
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }

            .confetti-piece {
                will-change: transform, opacity;
            }
        `;
        document.head.appendChild(style);
    }

    // Remove confetti after animation
    setTimeout(() => {
        if (confettiContainer && confettiContainer.parentNode) {
            confettiContainer.remove();
        }
    }, 6000);

    // Add celebration message
    showCelebrationMessage();
};

/**
 * Show celebration message
 */
const showCelebrationMessage = () => {
    const message = document.createElement('div');
    message.className = 'celebration-message';
    message.innerHTML = `
        <div class="celebration-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You completed all your tasks!</p>
        </div>
    `;

    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 3rem;
        border-radius: 1.5rem;
        box-shadow: 0 2rem 4rem rgba(0,0,0,0.3);
        text-align: center;
        z-index: 10000;
        animation: celebrationPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 90%;
        width: auto;
        min-width: 28rem;
    `;

    // Add animation styles for celebration message
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebrationPop {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }

            .celebration-content h2 {
                margin: 0 0 1rem 0;
                font-size: 2.4rem;
                font-weight: bold;
            }

            .celebration-content p {
                margin: 0;
                font-size: 1.6rem;
                opacity: 0.9;
            }

            @media (max-width: 768px) {
                .celebration-message {
                    padding: 2.5rem !important;
                    min-width: 24rem !important;
                    border-radius: 1.2rem !important;
                }

                .celebration-content h2 {
                    font-size: 2rem;
                    margin: 0 0 0.8rem 0;
                }

                .celebration-content p {
                    font-size: 1.4rem;
                }
            }

            @media (max-width: 480px) {
                .celebration-message {
                    padding: 2rem !important;
                    min-width: 20rem !important;
                    border-radius: 1rem !important;
                    max-width: 95% !important;
                }

                .celebration-content h2 {
                    font-size: 1.8rem;
                    margin: 0 0 0.6rem 0;
                }

                .celebration-content p {
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(message);

    // Remove message after 4 seconds
    setTimeout(() => {
        if (message && message.parentNode) {
            message.style.animation = 'celebrationPop 0.3s reverse';
            setTimeout(() => message.remove(), 300);
        }
    }, 4000);
};

/**
 * Update progress bar with current todo status
 */
export const updateProgressBar = () => {
    if (!initProgressBar()) return;

    const percentage = calculateProgress();
    const allTodos = todoStore.getTodos(Filters.All);

    updateProgressBarUI(percentage);

    // Show confetti when reaching 100% and there are todos
    if (percentage === 100 && allTodos.length > 0 && !hasShownConfetti) {
        setTimeout(() => {
            showConfetti();
            hasShownConfetti = true;
        }, 500); // Small delay for better UX
    } else if (percentage < 100) {
        // Reset confetti flag when not at 100%
        hasShownConfetti = false;
    }
};

/**
 * Reset progress bar
 */
export const resetProgressBar = () => {
    hasShownConfetti = false;
    updateProgressBar();
};

/**
 * Get current progress percentage
 * @returns {number} Current progress percentage
 */
export const getCurrentProgress = () => {
    return calculateProgress();
};

export default {
    updateProgressBar,
    resetProgressBar,
    getCurrentProgress
};
