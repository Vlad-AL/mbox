class Slider {
    constructor(element, slidesToShow, slidesToScroll){
        this.container = element.querySelector('.slider_container');
        this.track = element.querySelector('.slider_track');
        this.prevBtn = element.querySelector('.btn_prev');
        this.nextBtn = element.querySelector('.btn_next');
        this.slides = [...element.querySelectorAll('.slider_item')];
        
        this.position = 0;
        this.currentSlide = 0;

        this.slidesCount = this.slides.length;
        this.slidesToShow = slidesToShow;
        this.slidesToScroll = slidesToScroll;
        
        this.slideWidth = this.container.clientWidth / this.slidesToShow;
        this.moveTo = this.slideWidth * this.slidesToScroll;

        this.touchStart = 0;
        this.touchEnd = 0;

        this.track.addEventListener('touchstart', (e) => {
            this.touchStart = e.touches[0].clientX;
        })
        
        this.track.addEventListener('touchmove', (e) => {
            this.touchEnd = e.touches[0].clientX;
        })

        this.track.addEventListener('touchend', () => {
            if(this.touchStart - this.touchEnd < 0){
                const itemsLeft = Math.abs(this.position) / this.slideWidth;
                this.position += itemsLeft >= this.slidesToScroll ? this.moveTo : itemsLeft * this.slideWidth;

                this.checkBtns();
                this.setPosition();
            }
            else{
                const itemsLeft = this.slidesCount - (Math.abs(this.position) + this.slidesToShow * this.slideWidth) / this.slideWidth
                this.position -= itemsLeft >= this.slidesToScroll ? this.moveTo : itemsLeft * this.slideWidth;
    
                this.setPosition();
                this.checkBtns(); 
            }
        })

        this.prevBtn.addEventListener('click', () => {
            const itemsLeft = Math.abs(this.position) / this.slideWidth;
            this.position += itemsLeft >= this.slidesToScroll ? this.moveTo : itemsLeft * this.slideWidth;

            this.checkBtns();
            this.setPosition();
        })
        
        this.nextBtn.addEventListener('click', () => {
            const itemsLeft = this.slidesCount - (Math.abs(this.position) + this.slidesToShow * this.slideWidth) / this.slideWidth
            this.position -= itemsLeft >= this.slidesToScroll ? this.moveTo : itemsLeft * this.slideWidth;

            this.setPosition();
            this.checkBtns();    
        });

        this.checkBtns();
    }

    checkBtns = () => {
        if(this.position === 0){
            this.prevBtn.classList.add('disabled');
        }
        else{
            this.prevBtn.classList.remove('disabled');
        }

        if(this.position <= -(this.slidesCount - this.slidesToShow) * this.slideWidth){
            this.nextBtn.classList.add('disabled');
        }
        else{
            this.nextBtn.classList.remove('disabled');
        }
    };

    setPosition = () => {
        this.track.style.transform = `translateX(${this.position}px)`;
    }
}

const header = document.querySelector(".header");

window.addEventListener("scroll", function() {
    if(window.scrollY > 100) {
        header.classList.add("active");
    }
    else {
        header.classList.remove("active");
    }
});


let showSliderSlidersToShow = 6;
let showSliderSlidersToScroll = 1;

let movieSliderSlidersToShow = 6;
let movieSliderSlidersToScroll = 1;

let channelSliderSlidersToShow = 5;
let channelSliderSlidersToScroll = 1;

let staffSliderSlidersToShow = 6;
let staffSliderSlidersToScroll = 1;

if(visualViewport.width <= 1100) {
    showSliderSlidersToShow = 5;
    movieSliderSlidersToShow = 5;
    channelSliderSlidersToShow = 4;
    staffSliderSlidersToShow = 5;
}

if(visualViewport.width <= 800) {
    showSliderSlidersToShow = 3.6;
    movieSliderSlidersToShow = 3.6;
    channelSliderSlidersToShow = 2.6;
    staffSliderSlidersToShow = 3.6;
}

if(visualViewport.width <= 500) {
    showSliderSlidersToShow = 2.3;
    movieSliderSlidersToShow = 2.3;
    channelSliderSlidersToShow = 2.3;
    staffSliderSlidersToShow = 2.3;
}

if(visualViewport.width <= 400) {
    showSliderSlidersToShow = 1.6;
    movieSliderSlidersToShow = 1.6;
    channelSliderSlidersToShow = 1.6;
    staffSliderSlidersToShow = 1.6;
}

new Slider(document.querySelector('.show_slider'), showSliderSlidersToShow, showSliderSlidersToScroll);
new Slider(document.querySelector('.movie_slider'), movieSliderSlidersToShow, movieSliderSlidersToScroll);
new Slider(document.querySelector('.channel_slider'), channelSliderSlidersToShow, channelSliderSlidersToScroll);
new Slider(document.querySelector('.staff_slider'), staffSliderSlidersToShow, staffSliderSlidersToScroll);

const hamburger = document.querySelector('.hamburger');
const body = document.querySelector('body');
const mobile_nav_list = document.querySelector('.mobile_nav_list');
const cover = document.querySelector('.cover');
const closing = document.querySelector('.closing');
const header_item_block = document.querySelector('.header_item_block');

hamburger.addEventListener("click", function() {
    mobile_nav_list.classList.add("active"); 
    body.classList.add("active");
    hamburger.classList.add("active"); 
    cover.classList.add("active"); 
    header_item_block.classList.add("disable"); 
})

closing.addEventListener("click", function() {
    mobile_nav_list.classList.remove("active");
    body.classList.remove("active"); 
    hamburger.classList.remove("active");
    cover.classList.remove("active"); 
    header_item_block.classList.remove("disable"); 
})

const links = document.querySelectorAll('.nav_item');
const blocks = document.querySelectorAll('.block');

links.forEach(function(link){
    
    link.addEventListener('click', function(e){
        e.preventDefault();

        mobile_nav_list.classList.remove("active");
        body.classList.remove("active"); 
        hamburger.classList.remove("active");
        cover.classList.remove("active"); 
        
        const block = [...blocks].find(function(block){
            return block.classList.contains(link.dataset.target);
        })
      
        block.scrollIntoView({block: "start", behavior: "smooth"})
    })
})