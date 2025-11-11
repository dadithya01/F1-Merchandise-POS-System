function navigatePage(targetId) {
    //Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.add('d-none');
        page.classList.remove('active-page');
    });

    //Show the target page and update current page ID
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
        targetPage.classList.remove('d-none');
        targetPage.classList.add('active-page');
        currentPageId = targetId;
    }

    //Update active link styling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        }
    });
}

function initializeNavigation() {
    document.querySelectorAll('[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            navigatePage(targetId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
    initializeNavigation();
    navigatePage(currentPageId);
});
