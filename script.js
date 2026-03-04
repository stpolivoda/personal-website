// Scroll to top on refresh
history.scrollRestoration = "manual";
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

// Resume download
const icon = document.getElementById('dl-icon');

        icon.addEventListener('click', () => {
            icon.innerText = 'progress_activity'; 
            icon.classList.add('spinning');

            setTimeout(() => {
                const link = document.createElement('a');
                link.href = 'assets/Stanislav_Polivoda_CV.pdf';
                link.download = 'stanislav_polivoda_cv.pdf';
                link.click();

                icon.classList.remove('spinning');
                icon.classList.add('done');
                icon.innerText = 'check_circle';

                setTimeout(() => {
                    icon.classList.remove('done');
                    icon.innerText = 'download';
                }, 3000);

            }, 1200);
        });

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll(".filter-item");

function applyFilter(filterValue) {
    if (!filterValue) return;

    // Button active state
    filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === filterValue);
    });

    // Show only the matching section, no animations
    filterItems.forEach((item) => {
        if (item.classList.contains(filterValue)) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

// Restore last active filter on load (no animation)
window.addEventListener("load", () => {
    const saved = window.localStorage.getItem("activeFilter");
    const initialFilter = saved || "resume";
    applyFilter(initialFilter);
});

// Handle filter changes and persist selection
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filterValue = button.dataset.filter;
        if (!filterValue) return;

        window.localStorage.setItem("activeFilter", filterValue);
        applyFilter(filterValue);
    });
}); 