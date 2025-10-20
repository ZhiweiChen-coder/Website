/**
 * 图片画廊灯箱功能
 * 支持键盘导航、ESC关闭、左右切换
 */
(function() {
    'use strict';

    let currentIndex = 0;
    let images = [];
    let lightbox = null;
    let isOpen = false;

    // 初始化画廊
    function initGallery() {
        const galleryItems = document.querySelectorAll('.lightbox');
        if (galleryItems.length === 0) return;

        images = Array.from(galleryItems).map(item => ({
            src: item.href,
            caption: item.getAttribute('data-caption') || '',
            alt: item.querySelector('img')?.alt || ''
        }));

        // 为每个画廊项添加点击事件
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        });
    }

    // 打开灯箱
    function openLightbox(index) {
        if (isOpen) return;
        
        currentIndex = index;
        isOpen = true;
        
        // 创建灯箱HTML
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="关闭">×</button>
                <button class="lightbox-prev" aria-label="上一张">‹</button>
                <button class="lightbox-next" aria-label="下一张">›</button>
                <div class="lightbox-content">
                    <img src="${images[currentIndex].src}" alt="${images[currentIndex].alt}">
                    ${images[currentIndex].caption ? `<div class="lightbox-caption">${images[currentIndex].caption}</div>` : ''}
                </div>
                <div class="lightbox-counter">
                    <span class="current">${currentIndex + 1}</span> / <span class="total">${images.length}</span>
                </div>
            </div>
        `;

        // 添加到页面
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // 绑定事件
        bindLightboxEvents();
        
        // 显示动画
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });
    }

    // 关闭灯箱
    function closeLightbox() {
        if (!isOpen || !lightbox) return;
        
        lightbox.classList.remove('active');
        
        setTimeout(() => {
            if (lightbox && lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
            lightbox = null;
            isOpen = false;
            document.body.style.overflow = '';
        }, 300);
    }

    // 切换到指定图片
    function goToImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        currentIndex = index;
        
        const img = lightbox.querySelector('.lightbox-content img');
        const caption = lightbox.querySelector('.lightbox-caption');
        const counter = lightbox.querySelector('.lightbox-counter .current');
        
        if (img) {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = images[currentIndex].src;
                img.alt = images[currentIndex].alt;
                img.style.opacity = '1';
            }, 150);
        }
        
        if (caption) {
            caption.textContent = images[currentIndex].caption;
        }
        
        if (counter) {
            counter.textContent = currentIndex + 1;
        }
    }

    // 上一张
    function prevImage() {
        goToImage(currentIndex - 1);
    }

    // 下一张
    function nextImage() {
        goToImage(currentIndex + 1);
    }

    // 绑定灯箱事件
    function bindLightboxEvents() {
        if (!lightbox) return;

        // 关闭按钮
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        // 上一张按钮
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }

        // 下一张按钮
        const nextBtn = lightbox.querySelector('.lightbox-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }

        // 背景点击关闭
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // 键盘事件
        document.addEventListener('keydown', handleKeydown);
    }

    // 键盘事件处理
    function handleKeydown(e) {
        if (!isOpen) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    }

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', initGallery);

    // 清理事件监听器
    window.addEventListener('beforeunload', () => {
        if (isOpen) {
            closeLightbox();
        }
        document.removeEventListener('keydown', handleKeydown);
    });

})();
