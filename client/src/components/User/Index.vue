<template>
  <div class="container">
    <br><br><br>
    <h1>บัญชีทั้งหมด</h1>
    <div><button v-on:click="navigateTo('/user/create')" class="styled-button-green">สร้างผู้ใช้</button></div>
    <hr>
    <div v-if="users.length">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="user in users" v-bind:key="user.id">
        <div><b>id:</b> {{ user.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>อีเมล:</b> {{ user.email }}</div>
        <div><b>status:</b> {{ user.status }}</div>
        <div><b>type:</b> {{ user.type }}</div>
        <div>
          <button v-on:click="navigateTo('/user/'+user.id)" class="styled-button-blue">ดูข้อมูล</button>
          <button v-on:click="navigateTo('/user/edit/'+user.id)" class="styled-button-yellow">แก้ไขข้อมูล</button>
          <button v-on:click="deleteUser(user)" class="styled-button-red">ลบข้อมูล</button>
        </div>
        <hr>
      </div>
    </div>
    <div><button v-on:click="logout" class="styled-button-white">Logout</button></div>

  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data(){
    return {
      users: []
    }
  },
  async created() {
    try{
      this.users = (await UsersService.index()).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if(result){
        try{
          await UsersService.delete(user);
          this.refreshData();

        }catch(err){
          console.log(err);
        }
      }
    },
    async refreshData(){
      try{
        this.users = (await UsersService.index()).data;
      }catch(err){
        console.log(err);
      }
    }
  }
};
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

.styled-button-white {
    background-color: #ffffff; /* สีพื้นหลัง */
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
    outline: 2px solid black; /* เพิ่มเส้นขอบ outline สีดำ */
    transition: background-color 0.3s; /* เพิ่มเอฟเฟกต์การเปลี่ยนสี */
}

.styled-button-white:hover {
    background-color: rgb(192, 192, 192); /* เปลี่ยนสีเมื่อชี้ */
    outline: 2px solid gray; /* เปลี่ยนสี outline เมื่อ hover */
}

</style>
