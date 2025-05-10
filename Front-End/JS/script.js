document.addEventListener('DOMContentLoaded', function() {
    function updateTimer() {
        const hoursElement = document.querySelector('.timer .time-box:nth-child(1) .number');
        const minutesElement = document.querySelector('.timer .time-box:nth-child(2) .number');
        const secondsElement = document.querySelector('.timer .time-box:nth-child(3) .number');
        
        if (!hoursElement || !minutesElement || !secondsElement) return;
        
        let hours = parseInt(hoursElement.textContent);
        let minutes = parseInt(minutesElement.textContent);
        let seconds = parseInt(secondsElement.textContent);
        setInterval(function() {
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        hours = 15;
                        minutes = 24;
                        seconds = 53;
                    }
                }
            }
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    
    updateTimer();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const emailForm = document.querySelector('.email-signup');
    
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                alert('Thank you for subscribing with: ' + email);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('header .container');
    if (header) {
        header.insertBefore(mobileMenuToggle, document.querySelector('nav'));
        
        mobileMenuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            
            if (nav) {
                if (nav.style.display === 'block') {
                    nav.style.display = 'none';
                } else {
                    nav.style.display = 'block';
                }
            }
        });
    }
    
    const shopNowButtons = document.querySelectorAll('.shop-now-btn');
    
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Item added to cart!');
        });
    });
});