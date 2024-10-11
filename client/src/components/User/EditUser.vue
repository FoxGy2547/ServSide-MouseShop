<template>
  <div class="login-container">
    <div class="login-box">
      <h1><strong>แก้ไขบัญชี</strong></h1>
      <form v-on:submit.prevent="editUser">
        <div class="input-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="input-group">
          <label for="lastname">Lastname</label>
          <input type="text" id="lastname" v-model="user.lastname" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <button type="submit" class="styled-button-yellow">แก้ไขข้อมูล</button>
        <button v-on:click="navigateTo('/users')" type="button" class="styled-button-red">กลับ</button>
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
        status: 'active'
      }
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
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(path) {
      this.$router.push(path); // ใช้ Vue Router เพื่อเปลี่ยนเส้นทาง
    }
  }
}
</script>

<style scoped>
.styled-button-yellow:hover {
            background-color: rgb(192, 175, 25); /* เปลี่ยนสีเมื่อชี้ */
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* ให้ฟอร์มอยู่ตรงกลาง */
  background-color: #f0f0f0;
}

.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 15px; /* โค้งมนเพิ่มขึ้น */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* เพิ่มเงานุ่มนวล */
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 145%; /* เปลี่ยนเป็น 100% */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
