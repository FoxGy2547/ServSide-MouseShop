<template>
  <div>
    <!-- New Navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand navbar-link" href="#">
              <img src="../assets/logo.png" id="logo" alt="Logo">
          </a>
          <span class="navbar-text">GamingMouse Shop</span> <!-- เพิ่มข้อความที่นี่ -->
        </div>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav navbar-right">
              <li role="presentation"><router-link :to="{ name: 'blogs' }">Products</router-link></li>
              <li role="presentation"><router-link :to="{ name: 'users' }">Users</router-link></li>
              <li role="presentation"><router-link :to="{ name: 'login' }">Login</router-link></li>
              <li role="presentation"><a href="#" @click="logout">Logout</a></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({ name: 'login' });
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.navbar-brand>img {
  width: 36px;
  padding: 12px 0;
  margin-top: -20px;
}

a.router-link-active {
  color: yellowgreen !important;
}
</style>