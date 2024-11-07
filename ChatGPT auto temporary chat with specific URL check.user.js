// ==UserScript==
// @name        ChatGPT auto temporary chat with specific URL check
// @description Automatically redirects to temporary chat only when on the main page (https://chatgpt.com)
// @match       https://chatgpt.com/*
// ==/UserScript==

(function() {
    // Function to redirect to the temporary chat only when on the main URL
    function redirectToTemporaryChat() {
        const currentURL = window.location.href;
        if (currentURL === 'https://chatgpt.com/') {
            window.location.replace("https://chatgpt.com/?temporary-chat=true");
            console.log('Redirected to temporary chat!');
        }
    }

    async function waitForTwoSeconds() {
        console.log('Waiting for 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('2 seconds passed, continuing execution...');
      }
      

    // Run on initial page load
    window.onload = function() {
        waitForTwoSeconds();
        redirectToTemporaryChat();
    };

    // Use MutationObserver to detect changes in the DOM (such as navigating away from the settings)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                // Check if we are on the main URL and perform redirection if necessary
                redirectToTemporaryChat();
            }
        });
    });

    // Observe changes to the document body
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
    });

    // Hook into History API to detect navigation events
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function() {
        pushState.apply(history, arguments);
        redirectToTemporaryChat();
    };

    history.replaceState = function() {
        replaceState.apply(history, arguments);
        redirectToTemporaryChat();
    };

    window.addEventListener('popstate', function() {
        redirectToTemporaryChat();
    });
})();
