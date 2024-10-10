<template>
  <div class="container">
    <br><br><br>
    <h1>Create User</h1>
    <form v-on:submit.prevent = "createUser">
      <div>name: <input type="text" v-model="user.name"></div>
      <div>lastname: <input type="text" v-model="user.lastname"></div>
      <div>email: <input type="text" v-model="user.email"></div>
      <div>password: <input type="password" v-model="user.password"></div>
      <div><button type="submit" class="styled-button-green">สร้างบัญชี</button><button v-on:click="navigateTo('/blogs')" class="styled-button-red">กลับ</button></div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data(){
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
  methods:{
    async createUser(){
      try{
        await UsersService.post(this.user);
        this.$router.push('/users');
      }catch(err){
        console.log(err);
      }
      
    }
  }

}
</script>

<style>
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
</style>