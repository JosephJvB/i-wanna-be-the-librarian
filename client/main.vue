<template>
  <div class="app-container">
    <header>
      <h1>Joe's library</h1>
    </header>
    <main>
      <label>supergreat file uploader</label>
      <button @click="browseFiles">Choose file</button>
      <p>{{fileToUpload || 'no file selected'}}</p>
      <input ref="fileInput" @change="handleInputFile" type="file">
      <button @click="uploadFile">Upload</button>
    </main>
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
    //https://stackoverflow.com/questions/52109471/typescript-in-vue-property-validate-does-not-exist-on-type-vue-element
    // trigger hidden file input element from another click event
    browseFiles():void {
      const fileRef:any = this.$refs.fileInput;
      fileRef.click();
    },
    handleInputFile(e:any) {
      // always take last uploaded file
      const nextFile: File = e.target.files[e.target.files.length - 1];
      this.fileToUpload = nextFile.name;
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
  .app-container {
    background-color: red;
    min-width: 100%;
    min-height: 100%;
  }
  input[type=file] {
    display: none;
  }
</style>