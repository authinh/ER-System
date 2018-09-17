'use strict';

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  let clickResponsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    clickResponsePromise = clients.openWindow(event.notification.data.url);
  }

  console.log("notificationclick", event);
});

self.addEventListener('notificationclose', function(event) {
  console.log("notificationclose", event);
});