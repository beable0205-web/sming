"use client";

import { useEffect } from "react";
import { AdMob, BannerAdPosition, BannerAdSize } from "@capacitor-community/admob";
import { Capacitor } from "@capacitor/core";

export default function AdMobManager() {
  useEffect(() => {
    async function initAdMob() {
      // Capacitor 환경(앱)에서만 실행
      if (Capacitor.isNativePlatform()) {
        try {
          await AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'], // 테스트 기기 추가
            initializeForTesting: true, // 프로덕션에서는 false로 변경해야 함
          });

          // 배너 광고 띄우기 (하단 고정)
          const bannerOptions = {
            adId: "ca-app-pub-3940256099942544/6300978111", // 구글 안드로이드 테스트 배너 ID
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            isTesting: true, // 프로덕션에서는 false로 변경
          };

          await AdMob.showBanner(bannerOptions);
          
          console.log("AdMob Initialized & Banner Showed");
        } catch (e) {
          console.error("AdMob initialization failed", e);
        }
      }
    }

    initAdMob();

    // 언마운트 시 배너 숨기기 (원할 경우)
    return () => {
      if (Capacitor.isNativePlatform()) {
        AdMob.hideBanner().catch(console.error);
      }
    };
  }, []);

  return null;
}
