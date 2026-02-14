document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. نظام التعليقات الفوري ---
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع الصفحة من التحديث
            
            const commentInput = document.getElementById('commentText');
            const commentText = commentInput.value;

            if (commentText.trim() === "") return;

            // إزالة رسالة "لا يوجد تعليقات" إذا كانت موجودة
            if (commentsList.innerHTML.includes("No comments yet")) {
                commentsList.innerHTML = "";
            }

            // إنشاء عنصر التعليق الجديد
            const newComment = document.createElement('div');
            newComment.className = 'single-comment';
            newComment.style.animation = "fadeIn 0.5s ease forwards";
            newComment.innerHTML = `
                <p style="margin:0;">${commentText}</p>
                <small style="color: #999; display:block; margin-top:5px;">Shared just now</small>
            `;

            // إضافة التعليق في أعلى القائمة
            commentsList.prepend(newComment);

            // مسح مربع النص بعد الإرسال
            commentInput.value = "";
        });
    }

    // --- 2. نظام التقييم بالنجوم في صفحات التفاصيل ---
    const detailsInfo = document.querySelector(".details-info");
    if (detailsInfo) {
        const ratingDiv = document.createElement("div");
        ratingDiv.style.marginTop = "25px";
        ratingDiv.innerHTML = `
            <p style="margin-bottom:5px; font-weight:bold;">Rate this Gift:</p>
            <div class="stars-container">
                <span class="star" data-v="1" style="cursor:pointer; font-size:30px; color:#ddd;">★</span>
                <span class="star" data-v="2" style="cursor:pointer; font-size:30px; color:#ddd;">★</span>
                <span class="star" data-v="3" style="cursor:pointer; font-size:30px; color:#ddd;">★</span>
                <span class="star" data-v="4" style="cursor:pointer; font-size:30px; color:#ddd;">★</span>
                <span class="star" data-v="5" style="cursor:pointer; font-size:30px; color:#ddd;">★</span>
            </div>
        `;
        detailsInfo.appendChild(ratingDiv);

        const stars = ratingDiv.querySelectorAll(".star");
        stars.forEach((star, index) => {
            star.addEventListener("click", () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.color = "#c37e4f"; // تلوين النجوم المختارة
                    } else {
                        s.style.color = "#ddd"; // بقية النجوم رمادية
                    }
                });
            });
        });
    }

    // --- 3. تأثير حركي عند الضغط على أي زر في الموقع ---
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.95)";
        });
        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
        });
    });
    // --- 4. فلترة الأقسام ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const giftCards = document.querySelectorAll(".gift-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            giftCards.forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});
