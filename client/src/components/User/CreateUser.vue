<template>
  <div class="create-container">
    <div class="create-box">
      <h1><strong>สร้างบัญชี</strong></h1>
      <form v-on:submit.prevent="createUser">
        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" />
        </div>
        <div class="input-group">
          <label for="lastname">Lastname:</label>
          <input type="text" id="lastname" v-model="user.lastname" />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <div>
          <button type="submit" class="styled-button-green">สร้างบัญชี</button>
          <button v-on:click.prevent="navigateTo('/users')" type="button" class="styled-button-red">กลับ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active',
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(path) {
      this.$router.push(path); // ใช้ Vue Router เพื่อเปลี่ยนเส้นทาง
    },
  },
};
</script>

<style>
.styled-button-green {
  background-color: #4caf50; /* สีพื้นหลัง */
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

.input-group {
  margin-bottom: 20px;
}

label {
  display: block; /* ให้ label แสดงเป็นบล็อก */
  margin-bottom: 5px; /* ระยะห่างด้านล่าง */
  font-weight: bold; /* ตัวหนา */
}

input {
  width: 145%; /* ความกว้างเป็น 100% */
  padding: 10px; /* ระยะห่างภายใน */
  border: 1px solid #ccc; /* สีกรอบ */
  border-radius: 5px; /* ทำมุมโค้ง */
  box-sizing: border-box; /* ใช้เพื่อให้คำนวณขนาดได้ถูกต้อง */
  font-size: 16px; /* ขนาดตัวอักษร */
}

.create-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* ให้ฟอร์มอยู่ตรงกลาง */
  background-color: #f0f0f0;
}

.create-box {
  background-color: white;
  padding: 40px;
  border-radius: 15px; /* โค้งมนเพิ่มขึ้น */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* เพิ่มเงานุ่มนวล */
  width: 100%;
  max-width: 400px;
}
</style>
