/**
 * Custom Random Background API
 * Uses user's custom API: https://random.843003.xyz/api/random
 */
(function() {
    var bgApiUrl = 'https://random.843003.xyz/api/random';
    
    // State management for session consistency
    var sessionRandomBg = null;

    // Get random background URL, persistent per session
    function getRandomBgUrl() {
        // Return existing session URL if available
        if (sessionRandomBg) return sessionRandomBg;

        // Generate new if not exists
        sessionRandomBg = bgApiUrl + '?t=' + Date.now();
        return sessionRandomBg;
    }

    // Set random background
    function setRandomBackground() {
        const bgUrl = getRandomBgUrl();
        
        // Find the background box element
        const bgBox = document.getElementById('bg-box');
        
        if (bgBox) {
            // Preload image
            const img = new Image();
            img.onload = function() {
                bgBox.style.backgroundImage = `url('${bgUrl}')`;
                bgBox.classList.add('loaded');
                console.log('Custom random background loaded:', bgUrl);
                
                // Set CSS variables for transparency effects
                document.documentElement.style.setProperty('--card-bg', 'var(--card-bg-transparent)');
                document.documentElement.style.setProperty('--float-panel-bg', 'var(--float-panel-bg-transparent)');
            };
            img.onerror = function() {
                console.error('Failed to load background image:', bgUrl);
            };
            img.src = bgUrl;
        }
    }

    // Initialize
    function init() {
        setRandomBackground();
    }

    // Run on initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Swup integration
    function setupSwup() {
        if (window.swup && window.swup.hooks) {
            window.swup.hooks.on('content:replace', init);
            console.log('Custom Random BG API: Registered with Swup hooks.');
        }
    }

    if (window.swup) {
        setupSwup();
    } else {
        document.addEventListener('swup:enable', setupSwup);
    }

    // Legacy Swup support
    document.addEventListener('swup:contentReplaced', init);
})();