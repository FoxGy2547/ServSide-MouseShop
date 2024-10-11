<template>
  <div class="container">
    <br><br><br>
    <h1>ข้อมูลทั้งหมด</h1>
    <p>ID: {{ user.id }} </p>
    <p>Name: {{ user.name }} </p> <!-- แก้เป็น user.name -->
    <p>Lastname: {{ user.lastname }} </p>
    <p>Email: {{ user.email }}</p>
    <p>Password: {{ user.password }}</p>
    <p>Status: {{ user.status }}</p>
    <p>Created At: {{ user.createdAt }}</p>
    <button v-on:click="navigateTo('/user/edit/'+user.id)" class="styled-button-yellow">แก้ไขข้อมูล</button>
    <button v-on:click="navigateTo('/users')" type="button" class="styled-button-red">กลับ</button>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default { 
  data() {
    return {
      user: {}
    }
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path); // ใช้ Vue Router เพื่อเปลี่ยนเส้นทาง
    }
  }
}
</script>

<style>
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

</style>
