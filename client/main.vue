<template>
  <div>
    <label>supergreat file uploader</label>
    <input id="file-input" @change="handleInputFile" type="file">
    <button @click="uploadFile">upload</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      fileToUpload: '',
      resultData: []
    }
  },
  methods: {
    handleInputFile(e:any) {
      // always take last uploaded file
      this.fileToUpload = e.target.files[e.target.files.length - 1];
    },
    async uploadFile():Promise<void> {
      const postFileData = new FormData();
      postFileData.append('data', this.fileToUpload)

      const resp = await axios.post('/api/files/upload', postFileData);
      console.log(resp.data);
      this.resultData = resp.data;
    }
  }
})
</script>

<style>

</style>