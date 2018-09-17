navigator.serviceWorker.register('/sw.js').then(function (reg) {
	console.log('Registration succeeded. Scope is ', reg);
}).catch(function (error) {
	console.log('Registration failed with ', error);
});
document.addEventListener('DOMContentLoaded', function () {
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.');
		return;
	}
	if (Notification.permission !== "granted")
		Notification.requestPermission();
});

function showNotification(title, option) {
	navigator.serviceWorker.getRegistration().then(function (registration) {
		registration.showNotification(title, option)
	})
}

Pusher.logToConsole = true;

var pusher = new Pusher('6d2538d31a77d1634962', {
	cluster: 'ap1',
	encrypted: true
});

