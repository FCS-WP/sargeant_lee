const blockSelector = '.wp-block-ai-zippy-child-header-search';

const trapFocus = (dialog, event) => {
  const focusableElements = dialog.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  if (!focusableElements.length) {
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const initSearchBlock = (block) => {
  const trigger = block.querySelector('[data-search-modal-trigger]');
  const modal = block.querySelector('[data-search-modal]');
  const dialog = block.querySelector('.ai-zippy-child-header-search__dialog');
  const input = block.querySelector('.ai-zippy-child-header-search__input');
  const closeButtons = block.querySelectorAll('[data-search-modal-close]');

  if (!trigger || !modal || !dialog || !input) {
    return;
  }

  let previousActiveElement = null;

  const openModal = () => {
    previousActiveElement = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('ai-zippy-child-search-modal-open');
    window.setTimeout(() => input.focus(), 20);
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('ai-zippy-child-search-modal-open');

    if (previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    } else {
      trigger.focus();
    }
  };

  trigger.addEventListener('click', openModal);

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      trapFocus(dialog, event);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(blockSelector).forEach(initSearchBlock);
});
