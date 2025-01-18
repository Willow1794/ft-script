(function() {
    try {
        console.log('✅ Script has started executing.');

        // Target URL for redirection
        const targetUrl = 'https://flixtor.to/home';

        // Check if already on the target page
        if (window.location.href !== targetUrl) {
            console.log(`🌐 Redirecting to: ${targetUrl}`);
            window.location.assign(targetUrl); // Use assign to force navigation
            return; // Stop further script execution until redirection is complete
        }

        console.log('✅ Already on the target page. Continuing script execution...');

        // Function to create or update the message box
        function createOrUpdateMessageBox(message, timeSinceLastReload = '', timeUntilNextReload = '') {
            console.log('🔄 Attempting to update the message box...');
            let box = document.getElementById('scriptStatusBox');
            if (!box) {
                box = document.createElement('div');
                box.id = 'scriptStatusBox';
                box.style.position = 'fixed';
                box.style.bottom = '20px';
                box.style.right = '20px';
                box.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                box.style.color = 'white';
                box.style.padding = '10px';
                box.style.borderRadius = '5px';
                box.style.fontFamily = 'Arial, sans-serif';
                box.style.fontSize = '14px';
                box.style.zIndex = '10000';
                box.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                document.body.appendChild(box);
            }
            box.innerHTML = `
                <div><strong>${message}</strong></div>
                <div>Time since last reload: ${timeSinceLastReload}</div>
                <div>Time until next reload: ${timeUntilNextReload}</div>
            `;
            console.log('✅ Message box updated successfully.');
        }

        // Generate random reload interval
        function getRandomInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Format milliseconds into minutes and seconds
        function formatTime(ms) {
            const minutes = Math.floor(ms / 1000 / 60);
            const seconds = Math.floor((ms / 1000) % 60);
            return `${minutes}m ${seconds}s`;
        }

        // Main logic: check access and reload if necessary
        function startAccessCheck() {
            console.log('🔍 Starting access check...');
            const errorMessage = 'all our servers are full right now';
            const minInterval = 5 * 60 * 1000; // 5 minutes
            const maxInterval = 30 * 60 * 1000; // 30 minutes
            let lastReloadTime = Date.now();

            function reloadIfAccessDenied() {
                const now = Date.now();
                const bodyText = document.body.innerText.toLowerCase();
                const timeSinceLastReload = formatTime(now - lastReloadTime);

                if (!bodyText.includes(errorMessage.toLowerCase())) {
                    createOrUpdateMessageBox('✅ Access granted! You are in!', timeSinceLastReload, '');
                    console.log('✅ Access granted!');
                    return;
                }

                const nextReloadInterval = getRandomInterval(minInterval, maxInterval);
                const timeUntilNextReload = formatTime(nextReloadInterval);

                createOrUpdateMessageBox('⚠️ Servers are full. Reloading...', timeSinceLastReload, timeUntilNextReload);
                console.log(`⚠️ Servers are full. Reloading in: ${timeUntilNextReload}`);

                setTimeout(function() {
                    lastReloadTime = Date.now();
                    location.reload();
                }, nextReloadInterval);
            }

            reloadIfAccessDenied();
        }

        // Ensure script reinitializes properly after redirection
        window.addEventListener('load', () => {
            console.log('🌐 Page loaded. Reinitializing script...');
            createOrUpdateMessageBox('✅ Script reinitialized after redirection.', '0m 0s', '0m 0s');
            startAccessCheck();
        });

    } catch (error) {
        console.error('❌ An error occurred in the script:', error);
    }
})();
