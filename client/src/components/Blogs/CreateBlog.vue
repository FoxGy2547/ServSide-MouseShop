<template>
  <div class="container">
    <br><br><br>
    <h1>เพิ่มสินค้า</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        <strong>
        รุ่นสินค้า :
        </strong>
        <input type="text" v-model="blog.model" />
      </p>

      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
        </div>
      </transition>
      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <!-- <p v-if="isInitial || isSuccess"> -->
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </form>
      <div>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" v-bind:key="picture.id">
            <img
              style="margin-bottom: 5px" :src="BASE_URL + picture.name" alt="picture image"/>
            <br />
            <button v-on:click.prevent="useThumbnail(picture.name)" class="styled-button-yellow">
              ปกสินค้า
            </button>
            <button v-on:click.prevent="delFile(picture)" class="styled-button-red">ลบ</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>
      <p>
        <strong>รายละเอียด :</strong>
      </p>
      <vue-ckeditor
        v-model.lazy="blog.content"
        :config="config"
        @blur="onBlur($event)"
        @focus="onFocus($event)"
      />
      <br>
      <div class="color-container" style="display: flex; align-items: center;">
        <strong class="color-label">เลือกสี :</strong>
        <div class="color-checkbox" style="display: flex; gap: 10px; margin-left: 10px;">
          <label>
            <input type="checkbox" value="#FFFFFF" style="accent-color: white;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #FFFFFF; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- ขาว -->
          </label>
          <label>
            <input type="checkbox" value="#000000" style="accent-color: black;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #000000; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- ดำ -->
          </label>
          <label>
            <input type="checkbox" value="#A9A9A9" style="accent-color: gray;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #A9A9A9; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- เทา -->
          </label>
          <label>
            <input type="checkbox" value="#ff70a6" style="accent-color: red;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #ff70a6; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- ชมพู -->
          </label>
          <label>
            <input type="checkbox" value="#bdb2ff" style="accent-color: magenta;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #bdb2ff; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- ม่วง -->
          </label>
          <label>
            <input type="checkbox" value="#87CEFA" style="accent-color: cyan;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #87CEFA; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- ฟ้า -->
          </label>
          <label>
            <input type="checkbox" value="#32CD32" style="accent-color: green;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #32CD32; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- เขียว -->
          </label>
          <label>
            <input type="checkbox" value="#FFD700" style="accent-color: yellow;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #FFD700; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- เหลือง -->
          </label>
          <label>
            <input type="checkbox" value="#ff9770" style="accent-color: orange;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #ff9770; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- ส้ม -->
          </label>
          <label>
            <input type="checkbox" value="#f21b3f" style="accent-color: red;" v-on:change="updateColors">
            <div class="color-button" style="background-color: #f21b3f; width: 30px; height: 30px; border: 1px solid #ccc;"></div> <!-- แดง -->
          </label>
        </div>
      </div>
      <br>
      <p>
        <strong>
          แบรนด์ :
        </strong>
        <input type="text" v-model="blog.brand" />
      </p>
      <p>
        <strong>
        สถานะสินค้า :
        </strong>
        <input type="text" v-model="blog.status" />
      </p>
      
      <p>
        <button type="submit" class="styled-button-green">เพิ่มสินค้า</button>
        <button v-on:click="navigateTo('/blogs')" class="styled-button-red">กลับ</button>
      </p>
    </form>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      blog: {
        model: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        brand: "",
        status: "พร้อมจำหน่าย",
        colors: [], // เปลี่ยนเป็นอาเรย์
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  methods: {
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };

        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures);
      this.blog.colors = JSON.stringify(this.blog.colors); // แปลงเป็น JSON
      console.log("JSON.stringify: ", this.blog);
      try {
        await BlogsService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },

    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      // upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
    },
    updateColors(event) {
      const color = event.target.value;
      const index = this.blog.colors.indexOf(color);
      if (index === -1) {
        this.blog.colors.push(color); // ถ้ายังไม่มีสีในอาเรย์ ก็เพิ่มเข้าไป
      } else {
        this.blog.colors.splice(index, 1); // ถ้ามีสีในอาเรย์แล้ว ก็ลบออก
      }
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  components: {
    VueCkeditor,
  },
  created() {
    this.currentStatus = STATUS_INITIAL;
    this.config.toolbar = [
      {
        name: "document",
        items: [
          "Source",
          "-",
          "Save",
          "NewPage",
          "Preview",
          "Print",
          "-",
          "Templates",
        ],
      },
      {
        name: "clipboard",
        items: [
          "Cut",
          "Copy",
          "Paste",
          "PasteText",
          "PasteFromWord",
          "-",
          "Undo",
          "Redo",
        ],
      },
      {
        name: "editing",
        items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
      },
      {
        name: "forms",
        items: [
          "Form",
          "Checkbox",
          "Radio",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField",
        ],
      },
      "/",
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat",
        ],
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "-",
          "Outdent",
          "Indent",
          "-",
          "Blockquote",
          "CreateDiv",
          "-",
          "JustifyLeft",
          "JustifyCenter",
          "JustifyRight",
          "JustifyBlock",
          "-",
          "BidiLtr",
          "BidiRtl",
          "Language",
        ],
      },
      { name: "links", items: ["Link", "Unlink", "Anchor"] },
      {
        name: "insert",
        items: [
          "Image",
          "Flash",
          "Table",
          "HorizontalRule",
          "Smiley",
          "SpecialChar",
          "PageBreak",
          "Iframe",
          "InsertPre",
        ],
      },
      "/",
      { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
      { name: "colors", items: ["TextColor", "BGColor"] },
      { name: "tools", items: ["Maximize", "ShowBlocks"] },
      { name: "about", items: ["About"] },
    ];
  },
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: khaki; /* when mouse over to the drop zone, change color 
*/
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
}
h1 {
  font-weight: bold; /* ทำให้ตัวหนาขึ้น */
}

h4 {
  font-weight: bold; /* ทำให้ตัวหนาขึ้น */
}

.styled-button-green {
            background-color: #4CAF50; /* สีพื้นหลัง */
            color: white; /* สีตัวอักษร */
            padding: 5px 20px; /* ระยะห่างภายใน */
            text-align: center; /* จัดกึ่งกลางข้อความ */
            text-decoration: none; /* ไม่มีเส้นใต้ */
            display: inline-block; /* ให้แสดงเป็นบล็อก */
            font-size: 14px; /* ขนาดตัวอักษร */
            margin: 4px 2px; /* ระยะห่างรอบๆ ปุ่ม */
            cursor: pointer; /* เปลี่ยนเป็นเคอร์เซอร์มือเมื่อชี้ */
            border: none; /* ไม่มีกรอบ */
            border-radius: 7px; /* ทำมุมโค้ง */
            transition: background-color 0.3s; /* เพิ่มเอฟเฟกต์การเปลี่ยนสี */
}

.styled-button-green:hover {
            background-color: #45a049; /* เปลี่ยนสีเมื่อชี้ */
}

.styled-button-red {
            background-color: #b33b3b; /* สีพื้นหลัง */
            color: white; /* สีตัวอักษร */
            padding: 5px 20px; /* ระยะห่างภายใน */
            text-align: center; /* จัดกึ่งกลางข้อความ */
            text-decoration: none; /* ไม่มีเส้นใต้ */
            display: inline-block; /* ให้แสดงเป็นบล็อก */
            font-size: 14px; /* ขนาดตัวอักษร */
            margin: 4px 2px; /* ระยะห่างรอบๆ ปุ่ม */
            cursor: pointer; /* เปลี่ยนเป็นเคอร์เซอร์มือเมื่อชี้ */
            border: none; /* ไม่มีกรอบ */
            border-radius: 7px; /* ทำมุมโค้ง */
            transition: background-color 0.3s; /* เพิ่มเอฟเฟกต์การเปลี่ยนสี */
}

.styled-button-red:hover {
            background-color: #8a2525; /* เปลี่ยนสีเมื่อชี้ */
}

.styled-button-blue {
            background-color: #1a7ad3; /* สีพื้นหลัง */
            color: white; /* สีตัวอักษร */
            padding: 5px 20px; /* ระยะห่างภายใน */
            text-align: center; /* จัดกึ่งกลางข้อความ */
            text-decoration: none; /* ไม่มีเส้นใต้ */
            display: inline-block; /* ให้แสดงเป็นบล็อก */
            font-size: 14px; /* ขนาดตัวอักษร */
            margin: 4px 2px; /* ระยะห่างรอบๆ ปุ่ม */
            cursor: pointer; /* เปลี่ยนเป็นเคอร์เซอร์มือเมื่อชี้ */
            border: none; /* ไม่มีกรอบ */
            border-radius: 7px; /* ทำมุมโค้ง */
            transition: background-color 0.3s; /* เพิ่มเอฟเฟกต์การเปลี่ยนสี */
}

.styled-button-blue:hover {
            background-color: rgb(50, 91, 168); /* เปลี่ยนสีเมื่อชี้ */
}

.styled-button-yellow {
            background-color: #ffe604; /* สีพื้นหลัง */
            color: rgb(0, 0, 0); /* สีตัวอักษร */
            padding: 5px 20px; /* ระยะห่างภายใน */
            text-align: center; /* จัดกึ่งกลางข้อความ */
            text-decoration: none; /* ไม่มีเส้นใต้ */
            display: inline-block; /* ให้แสดงเป็นบล็อก */
            font-size: 14px; /* ขนาดตัวอักษร */
            margin: 4px 2px; /* ระยะห่างรอบๆ ปุ่ม */
            cursor: pointer; /* เปลี่ยนเป็นเคอร์เซอร์มือเมื่อชี้ */
            border: none; /* ไม่มีกรอบ */
            border-radius: 7px; /* ทำมุมโค้ง */
            transition: background-color 0.3s; /* เพิ่มเอฟเฟกต์การเปลี่ยนสี */
}

.styled-button-yellow:hover {
            background-color: rgb(192, 175, 25); /* เปลี่ยนสีเมื่อชี้ */
}

.color-button {
    width: 30px; /* ขนาดของปุ่มสี */
    height: 30px;
    border: 2px solid transparent; /* กรอบเริ่มต้น */
    cursor: pointer; /* เปลี่ยนเคอร์เซอร์ */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* เพื่อให้สามารถจัดการตำแหน่งของเครื่องหมายติ๊กถูกได้ */
}

/* ซ่อน checkbox */
input[type="checkbox"] {
    display: none; 
}

/* กรอบปกติที่แสดงอยู่เสมอ */
.color-button {
    border: 2px solid #000; /* กรอบสีดำ */
}

/* กรอบเมื่อถูกเลือก */
input[type="checkbox"]:checked + .color-button {
    border: 2px solid #000; /* กรอบยังคงเป็นสีดำ */
}

/* เครื่องหมายติ๊กถูก */
input[type="checkbox"]:checked + .color-button::after {
    content: '✔'; /* เครื่องหมายติ๊กถูก */
    color: white; /* สีของเครื่องหมายติ๊กถูก */
    font-size: 18px; /* ขนาดของเครื่องหมายติ๊กถูก */
    position: absolute; /* ให้เครื่องหมายติ๊กถูกอยู่ในตำแหน่งที่ถูกต้อง */
}

/* กรอบพิเศษสำหรับสีขาว */
input[type="checkbox"][value="#FFFFFF"]:checked + .color-button {
    border: 2px solid #000; /* กรอบยังคงเป็นสีดำ */
    background-color: #FFFFFF; /* สีพื้นหลังเป็นสีขาว */
}

/* เครื่องหมายติ๊กถูกที่มองเห็นได้ในสีขาว */
input[type="checkbox"][value="#FFFFFF"]:checked + .color-button::after {
    content: '✔'; /* เครื่องหมายติ๊กถูก */
    color: black; /* เปลี่ยนเป็นสีดำเพื่อให้มองเห็นได้ชัดเจน */
}

input[type="text"] {
    width: 200px; /* ปรับขนาดความกว้างของช่องค้นหา */
    padding: 5px; /* เพิ่มระยะห่างภายใน */
    border: 1px solid #ccc; /* กำหนดสีกรอบ */
    border-radius: 5px; /* ทำมุมโค้ง */
    box-sizing: border-box; /* ใช้เพื่อให้คำนวณขนาดได้ถูกต้อง */
    font-size: 14px; /* ขนาดตัวอักษร */
}
</style>