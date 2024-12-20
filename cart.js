// 장바구니 데이터를 로컬 스토리지에서 가져와서 표시
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name}</p>
                <p>${item.price.toFixed(2)}€</p>
                <button data-index="${index}" class="remove-item">Supprimer</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });

        totalPriceElement.textContent = total.toFixed(2) + '€';

        // 아이템 삭제 버튼 이벤트 추가
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            });
        });
    }

    // 장바구니 비우기 버튼 이벤트
    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        displayCartItems();
    });

    displayCartItems();
});
