/**
 * Stage 2: the real permission + subscription flow.
 * Triggered by the "Start the countdown ✨" button in scene-explain.
 *
 * Handles every outcome explicitly: granted, denied, dismissed/default,
 * and unsupported browsers — none of them should feel like a dead end
 * or make her feel guilty for saying no.
 */

function showPermissionStatus(message) {
  const el = document.getElementById('permission-status');
  el.textContent = message;
  el.classList.remove('hidden');
}

function setStartButtonBusy(isBusy) {
  const btn = document.getElementById('start-btn');
  btn.disabled = isBusy;
  btn.style.opacity = isBusy ? '0.6' : '1';
}

/** Web Push needs the VAPID key as a Uint8Array, not a plain base64 string. */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/** Sends the subscription to the backend. Safe to call before Stage 3 exists. */
async function sendSubscriptionToBackend(subscription) {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription }),
    });
    if (!response.ok) throw new Error(`Backend responded with ${response.status}`);
    return true;
  } catch (err) {
    // Expected until Stage 3's backend exists — this is not a real error
    // at this point in the build, just a signal of what's still missing.
    console.info(
      '[Stage 2] Could not reach the backend yet — that\'s expected until Stage 3. ' +
      'The subscription itself was created successfully:',
      subscription
    );
    return false;
  }
}

async function handleStartClick() {
  const startBtn = document.getElementById('start-btn');

  // --- Unsupported browser ---
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    showPermissionStatus(
      "This browser doesn't support notifications. No worries — the website still works, you'll just need to visit manually."
    );
    startBtn.style.display = 'none';
    return;
  }

  setStartButtonBusy(true);

  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY),
        });
      }

      await sendSubscriptionToBackend(subscription);
      transitionTo('scene-explain', 'scene-confirm');
    } else if (permission === 'denied') {
      showPermissionStatus(
        "No worries. The website still works — you'll just have to visit manually."
      );
      setStartButtonBusy(false);
    } else {
      // 'default' — the browser's permission prompt was dismissed without
      // an explicit choice. Let her try again rather than treating it as a no.
      showPermissionStatus('No problem — you can try again whenever you like.');
      setStartButtonBusy(false);
    }
  } catch (err) {
    console.error('[Stage 2] Subscription flow failed:', err);
    showPermissionStatus(
      "Something didn't work on this end — the website still works, you'll just have to visit manually."
    );
    setStartButtonBusy(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-btn').addEventListener('click', handleStartClick);
});
