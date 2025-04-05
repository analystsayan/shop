const links = document.querySelectorAll('.link a');
const currentPage = location.pathname.split("/").pop(); // e.g., mobiles.html

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

