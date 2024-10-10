<template>
  <div class="login-container">
    <div class="login-box">
      <h1><strong>Login</strong></h1>
      <form v-on:submit.prevent="onLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="styled-button-white">Login</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
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
  width: 145%;
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

.error {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
