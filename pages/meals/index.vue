<template>
    <div>
      <button @click="scanBarcode">Scan Barcode</button>
      <div v-if="result">{{ result }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        result: null,
      };
    },
    methods: {
      async scanBarcode() {
        try {
          const videoDevices = await this.$codeReader.listVideoInputDevices();
          if (videoDevices && videoDevices.length > 0) {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                deviceId: videoDevices[0].deviceId,
              },
            });
            const result = await this.$codeReader.decodeFromStream(stream, 'video');
            this.result = result.getText();
            stream.getTracks().forEach((track) => track.stop());
          } else {
            console.error('No video input devices found.');
          }
        } catch (error) {
          console.error('Error scanning barcode:', error);
        }
      },
    },
  };
  </script>
  