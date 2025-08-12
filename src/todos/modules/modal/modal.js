import modalHTML from './modal.html?raw';
import './modal.css';
import todoStore from '../../../store/todo-store';

let modalElement = null;
let currentTodoId = null;
let isModalOpen = false;
let escapeKeyListener = null;

// Modal element IDs
const modalIDs = {
    overlay: '#modal-overlay',
    container: '.modal-container',
    closeBtn: '#modal-close',
    editInput: '#edit-input',
    cancelBtn: '#btn-cancel',
    saveBtn: '#btn-save',
    inputError: '#input-error',
    editForm: '#edit-form'
};

/**
 * Initialize the modal by injecting HTML into DOM
 */
const initModal = () => {
    if (modalElement) return;
    
    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    modalElement = modalDiv.firstElementChild;
    
    // Append to body
    document.body.appendChild(modalElement);
    
    // Setup event listeners
    setupEventListeners();
};

/**
 * Setup all modal event listeners
 */
const setupEventListeners = () => {
    const overlay = modalElement; // modalElement IS the overlay
    const closeBtn = modalElement.querySelector(modalIDs.closeBtn);
    const cancelBtn = modalElement.querySelector(modalIDs.cancelBtn);
    const saveBtn = modalElement.querySelector(modalIDs.saveBtn);
    const editInput = modalElement.querySelector(modalIDs.editInput);
    const editForm = modalElement.querySelector(modalIDs.editForm);

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close on overlay click (backdrop)
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    });

    // Close on Escape key (remove previous listener if exists)
    if (escapeKeyListener) {
        document.removeEventListener('keydown', escapeKeyListener);
    }
    
    escapeKeyListener = (event) => {
        if (event.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    };
    
    document.addEventListener('keydown', escapeKeyListener);

    // Save todo on save button click
    saveBtn.addEventListener('click', saveTodo);

    // Save todo on Enter key in input
    editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            saveTodo();
        }
    });

    // Form submission
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveTodo();
    });

    // Clear error on input change
    editInput.addEventListener('input', clearError);
};

/**
 * Open modal with todo data
 * @param {string} todoId - The ID of the todo to edit
 * @param {string} currentTitle - Current title of the todo
 */
export const openModal = (todoId, currentTitle) => {
    // Initialize modal if not done
    initModal();
    
    currentTodoId = todoId;
    const editInput = modalElement.querySelector(modalIDs.editInput);
    const overlay = modalElement; // modalElement IS the overlay
    
    // Set current title in input
    editInput.value = currentTitle || '';
    
    // Clear any previous errors
    clearError();
    
    // Show modal with animation
    overlay.classList.add('active');
    isModalOpen = true;
    
    // Focus input after animation
    setTimeout(() => {
        editInput.focus();
        editInput.select();
    }, 150);
};

/**
 * Close modal with animation
 */
export const closeModal = () => {
    if (!modalElement || !isModalOpen) return;
    
    const overlay = modalElement; // modalElement IS the overlay
    
    // Add closing animation
    overlay.classList.add('closing');
    
    // Remove modal after animation
    setTimeout(() => {
        overlay.classList.remove('active', 'closing');
        isModalOpen = false;
        currentTodoId = null;
        clearError();
    }, 300);
};

/**
 * Save the edited todo
 */
const saveTodo = async () => {
    const editInput = modalElement.querySelector(modalIDs.editInput);
    const saveBtn = modalElement.querySelector(modalIDs.saveBtn);
    const newTitle = editInput.value.trim();
    
    // Validate input
    if (!validateInput(newTitle)) {
        return;
    }
    
    try {
        // Disable save button during save
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
        
        // Update todo through store
        await todoStore.updateTodo(currentTodoId, newTitle);
        
        // Close modal on success
        closeModal();
        
        // Trigger re-render (you might want to emit an event instead)
        // This assumes you have a way to trigger re-render
        if (window.todoApp && window.todoApp.displayTodos) {
            window.todoApp.displayTodos();
        }
        
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update task. Please try again.');
    } finally {
        // Re-enable save button
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
    }
};

/**
 * Validate input and show error if invalid
 * @param {string} title - Title to validate
 * @returns {boolean} - Whether input is valid
 */
const validateInput = (title) => {
    if (!title) {
        showError('Task description cannot be empty');
        return false;
    }
    
    if (title.length > 100) {
        showError('Task description must be less than 100 characters');
        return false;
    }
    
    return true;
};

/**
 * Show error message
 * @param {string} message - Error message to show
 */
const showError = (message) => {
    const editInput = modalElement.querySelector(modalIDs.editInput);
    const errorElement = modalElement.querySelector(modalIDs.inputError);
    
    editInput.classList.add('error');
    errorElement.textContent = message;
    
    // Focus input
    editInput.focus();
};

/**
 * Clear error state
 */
const clearError = () => {
    const editInput = modalElement.querySelector(modalIDs.editInput);
    const errorElement = modalElement.querySelector(modalIDs.inputError);
    
    editInput.classList.remove('error');
    errorElement.textContent = '';
};

/**
 * Destroy modal and cleanup
 */
export const destroyModal = () => {
    if (modalElement) {
        modalElement.remove();
        modalElement = null;
        currentTodoId = null;
        isModalOpen = false;
    }
    
    // Remove escape key listener
    if (escapeKeyListener) {
        document.removeEventListener('keydown', escapeKeyListener);
        escapeKeyListener = null;
    }
};

// Export default object with all functions
export default {
    openModal,
    closeModal,
    destroyModal
};