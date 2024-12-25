// script.js

class AuthorExpander {
    constructor(container, options = {}) {
        this.container = container;
        this.authorList = options.authorList || [];
        this.maxDisplay = options.maxDisplay || 0;
        this.typingSpeed = options.typingSpeed || 25;
        this.expanded = false;
        this.currentAnimation = null;
        
        this.init();
    }

    getMoreAuthorsText() {
        const hiddenCount = this.authorList.length - this.maxDisplay;
        return hiddenCount <= 0 ? '' : `${hiddenCount} more author${hiddenCount > 1 ? 's' : ''}`;
    }

    getHiddenAuthors() {
        if (this.authorList.length <= this.maxDisplay) return '';
        return this.authorList.join(', ');
    }

    async animateText(targetText) {
        // Clear any existing animation
        if (this.currentAnimation) {
            clearInterval(this.currentAnimation);
        }

        let currentPos = 0;
        return new Promise((resolve) => {
            this.currentAnimation = setInterval(() => {
                this.container.textContent = targetText.substring(0, currentPos + 1);
                currentPos++;
                
                if (currentPos >= targetText.length) {
                    clearInterval(this.currentAnimation);
                    this.currentAnimation = null;
                    resolve();
                }
            }, this.typingSpeed);
        });
    }

    async toggleExpand() {
        this.expanded = !this.expanded;
        const targetText = this.expanded ? this.getHiddenAuthors() : this.getMoreAuthorsText();
        await this.animateText(targetText);
    }

    init() {
        // Style the container
        // this.container.style.cursor = 'pointer';
        // this.container.style.color = '#0066cc';
        // this.container.style.textDecoration = 'underline';
        // this.container.style.display = 'inline';
        
        // Set initial text
        this.container.textContent = this.getMoreAuthorsText();
        
        // Add click handler
        this.container.addEventListener('click', () => this.toggleExpand());
    }
}

// Initialize all author expanders when the document is ready
function initAuthorExpanders() {
    document.querySelectorAll('.author-expander').forEach(container => {
        try {
            const authors = JSON.parse(container.dataset.authors || '[]');
            const maxDisplay = parseInt(container.dataset.maxDisplay || '0');
            const typingSpeed = parseInt(container.dataset.typingSpeed || '50');

            new AuthorExpander(container, {
                authorList: authors,
                maxDisplay: maxDisplay,
                typingSpeed: typingSpeed
            });
        } catch (error) {
            console.error('Error initializing author expander:', error);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthorExpanders);
} else {
    initAuthorExpanders();
}