document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const aboutButton = document.getElementById('about-button');
    const aboutModal = document.getElementById('about-modal');
    const closeAboutButton = document.getElementById('close-about');
    const toggleSidebarButton = document.getElementById('toggle-sidebar-button');
    const appContainer = document.querySelector('.app-container');

    // Theme toggle
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    // About modal
    if (aboutButton && aboutModal && closeAboutButton) {
        aboutButton.addEventListener('click', () => {
            aboutModal.style.display = 'flex';
        });

        closeAboutButton.addEventListener('click', () => {
            aboutModal.style.display = 'none';
        });
    }

    // Sidebar toggle
    if (toggleSidebarButton && appContainer) {
        toggleSidebarButton.addEventListener('click', () => {
            appContainer.classList.toggle('sidebar-collapsed');
        });
    }
});
