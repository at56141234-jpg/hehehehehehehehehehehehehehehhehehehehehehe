        let cart = [];
        
        
        const products = [
            {id: 1, name: 'Black Hoodie', price: 89, category: 'clothes', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'},
            {id: 2, name: 'Graphic Tee', price: 45, category: 'clothes', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'},
            {id: 3, name: 'Denim Jacket', price: 129, category: 'clothes', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'},
            {id: 4, name: 'Air Max Sneakers', price: 159, category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'},
            {id: 5, name: 'Cargo Pants', price: 95, category: 'clothes', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500'},
            {id: 6, name: 'High-Top Jordans', price: 189, category: 'shoes', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500'},
            {id: 7, name: 'Oversized Sweatshirt', price: 79, category: 'clothes', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'},
            {id: 8, name: 'Canvas Sneakers', price: 69, category: 'shoes', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500'},
        ];

        
        const productsGrid = document.getElementById('productsGrid');
        const cartIcon = document.getElementById('cartIcon');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');
        const cartBadge = document.getElementById('cartBadge');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');
        const toast = document.getElementById('toast');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // Generate Products
        function renderProducts(filter = 'all') {
            productsGrid.innerHTML = '';
            products.forEach(product => {
                if (filter === 'all' || product.category === filter) {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">${product.price}</div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    `;
                    productsGrid.appendChild(card);
                }
            });
        }
        renderProducts();

        
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }
            
            updateCart();
            showToast();
        }

        
        function updateCart() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Your cart is empty</p>
                    </div>
                `;
                cartFooter.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price}</div>
                            <div class="cart-item-quantity">
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
                    </div>
                `).join('');
                
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                cartTotal.textContent = `${total}`;
                cartFooter.style.display = 'block';
            }
        }

        
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCart();
                }
            }
        }

        
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        
        function showToast() {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }

        
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });

        
        checkoutBtn.addEventListener('click', () => {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const itemsList = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
            const message = `Hi! I'd like to order: ${itemsList}. Total: ${total}`;
            const whatsappUrl = `https://wa.me/9779706984499?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });

        
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProducts(btn.dataset.filter);
            });
        });

        
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        
        const carouselTrack = document.getElementById('carouselTrack');
        const carouselDots = document.querySelectorAll('.carousel-dot');
        let currentSlide = 0;

        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        carouselDots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentSlide = parseInt(dot.dataset.slide);
                updateCarousel();
            });
        });

        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 3;
            updateCarousel();
        }, 5000);