(function () {
    try {
        console.log('✅ Script has started executing.');

        // Target URL for redirection
        const targetUrl = 'https://flixtor.to/home';

        // Check if already on the target page
        if (window.location.href !== targetUrl) {
            console.log(`🌐 Redirecting to: ${targetUrl}`);
            window.location.assign(targetUrl); // Redirect to the target page
            return; // Stop further script execution until redirection is complete
        }

        console.log('✅ Already on the target page. Continuing script execution...');

        // Function to inject the script after redirection
        function injectScript() {
            console.log('🔄 Reinjecting script to ensure execution on Flixtor...');
            const script = document.createElement('script');
            script.innerHTML = `
                (function() {
                    console.log('✅ Script re-executing on Flixtor.');

                    function createOrUpdateMessageBox(message, timeSinceLastReload = '', timeUntilNextReload = '') {
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

                    function startAccessCheck() {
                        console.log('🔍 Starting access check...');
                        const errorMessage = 'all our servers are full right now';
                        const minInterval = 5 * 60 * 1000; // 5 minutes
                        const maxInterval = 30 * 60 * 1000; // 30 minutes
                        let lastReloadTime = Date.now();

                        function reloadIfAccessDenied() {
                            const now = Date.now();
                            const bodyText = document.body.innerText.toLowerCase();
                            const timeSinceLastReload = `${Math.floor((now - lastReloadTime) / 60000)}m ${Math.floor(((now - lastReloadTime) % 60000) / 1000)}s`;

                            if (!bodyText.includes(errorMessage.toLowerCase())) {
                                createOrUpdateMessageBox('✅ Access granted! You are in!', timeSinceLastReload, '');
                                console.log('✅ Access granted!');
                                return;
                            }

                            const nextReloadInterval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
                            const timeUntilNextReload = `${Math.floor(nextReloadInterval / 60000)}m ${Math.floor((nextReloadInterval % 60000) / 1000)}s`;

                            createOrUpdateMessageBox('⚠️ Servers are full. Reloading...', timeSinceLastReload, timeUntilNextReload);
                            console.log(`⚠️ Servers are full. Reloading in: ${timeUntilNextReload}`);

                            setTimeout(() => {
                                lastReloadTime = Date.now();
                                location.reload();
                            }, nextReloadInterval);
                        }

                        reloadIfAccessDenied();
                    }

                    startAccessCheck();
                })();
            `;
            document.head.appendChild(script);
        }

        // Inject the script dynamically after page load
        window.addEventListener('load', injectScript);
    } catch (error) {
        console.error('❌ An error occurred in the script:', error);
    }
})();
