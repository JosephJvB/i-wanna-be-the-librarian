<template>
  <div>
    <label>supergreat file uploader</label>
    <input id="file-input" @change="handleInputFile" type="file">
    <button>upload</button>
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
    uploadFile():Promise<void> {
      const postFileData = new FormData();
      postFileData.append('data', this.fileToUpload)

      return axios.post('/api/files/upload', postFileData)
        .then(res => {
          console.log(res);
          this.resultData = res.data;
        })
        .catch(console.error)
    }
  }
})
</script>

<style>

</style>