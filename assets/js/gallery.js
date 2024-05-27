document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const images = document.querySelectorAll(".gallery img");
    const span = document.getElementsByClassName("close")[0];
    const prev = document.getElementsByClassName("prev")[0];
    const next = document.getElementsByClassName("next")[0];
    
    let currentIndex;

    function showImage(index) {
        modal.style.display = "block";
        modalImg.src = images[index].src;
        currentIndex = index;
    }

    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            showImage(index);
        });
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

    modal.onclick = function() {
        modal.style.display = "none";
    }

    prev.onclick = function(event) {
        event.stopPropagation();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    }

    next.onclick = function(event) {
        event.stopPropagation();
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    }
});