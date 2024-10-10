<template>
  <div class="login-container">
    <div class="login-box">
      <h1><strong>Edit User</strong></h1>
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
        <button type="submit" class="styled-button-white">Edit User</button>
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
    }
  }
}
</script>

<style scoped>
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

.styled-button-white {
  width: 100%;
  background-color: #4CAF50; /* สีพื้นหลัง */
  color: white; /* สีตัวอักษร */
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.styled-button-white:hover {
  background-color: #45a049;
}
</style>
