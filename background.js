// background.js

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.action === 'fetchPriceData') {
		try {
			const response = await fetch('https://usca.com.ua/calc/price.json');
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data = await response.json();
			console.log("Price data fetched:", data);
			sendResponse({ success: true, data });
		} catch (error) {
			console.error("Error fetching price data:", error);
			sendResponse({ success: false, error: error.toString() });
		}
		return true; // Keep the message channel open for asynchronous response
	}

	if (request.action === 'fetchExchangeRate') {
		try {
			const response = await fetch('https://api.frankfurter.app/latest?from=USD');
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data = await response.json();
			console.log("Exchange rate fetched:", data);
			sendResponse({ success: true, data });
		} catch (error) {
			console.error("Error fetching exchange rate:", error);
			sendResponse({ success: false, error: error.toString() });
		}
		return true;
	}
});

// (Optional) On startup, load templates and store them in chrome.storage if needed:
chrome.runtime.onStartup.addListener(() => {
	// Load the copart template:
	fetch(chrome.runtime.getURL("file/html-copart.tpl"), { cache: "force-cache" })
		.then(resp => resp.text())
		.then(text => {
			chrome.storage.sync.set({ copart: text }, () => {
				console.log("copart template stored onStartup");
			});
		});

	// Load the iaai template:
	fetch(chrome.runtime.getURL("file/html-iaai.tpl"), { cache: "force-cache" })
		.then(resp => resp.text())
		.then(text => {
			chrome.storage.sync.set({ iaai: text }, () => {
				console.log("iaai template stored onStartup");
			});
		});
});
