<template>
  <div id="app">
    <div id="qr-code-full-region">{{ message.decodedResult }}</div>

    <div
      v-for="(msg, index) in message"
      :key="index"
      style="white-space: pre-line"
    >
      <pre> {{ msg.decodedResult.result.text }}</pre>
    </div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from "html5-qrcode";
export default {
  data() {
    return {
      message: []
    };
  },
  methods: {
    creatScan() {
      const config = {
        fps: 10,
        qrbox: 400,
        videoConstraints: { facingMode: { exact: "environment" } }
      };
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-code-full-region",
        config
      );
      html5QrcodeScanner.render(this.onScanSuccess);
    },
    onScanSuccess(decodedText, decodedResult) {
      const obj = { decodedResult: decodedResult };
      this.message.push(obj);
    }
  },
  async mounted() {
    this.creatScan();
  }
};
</script>

<style>
video {
  width: 40% !important;
  margin: 0 auto;
}

#qr-shaded-region {
  border-width: 0 318px !important;
}

#qr-code-full-region {
  border: none !important;
}
</style>
