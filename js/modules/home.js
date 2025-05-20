// ES Module for implementing the home logic
export function initHome() {
    
    const myCarouselElement = document.querySelector('#carouselAutoplaying')

    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 4000
    });


}
