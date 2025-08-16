"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setShowInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  const handleDismiss = () => {
    setShowInstall(false);
    sessionStorage.setItem("pwa-install-dismissed", "true");
  };

  if (
    isInstalled ||
    !showInstall ||
    sessionStorage.getItem("pwa-install-dismissed")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Download className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Install SpendKeeper
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                Quick access from your home screen
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
