<template>
    <div class="container">
        <br><br><br>
        <h3><strong>แบรนด์ :</strong> {{ blog.brand }}</h3>
        <h3><strong>รุ่น</strong> : {{ blog.model }}</h3>
        <div v-if="blog.thumbnail && blog.thumbnail !== 'null'" class="thumbnail-pic">
            <img :src="BASE_URL + blog.thumbnail" alt="Blog Thumbnail" width="20%"/>
        </div>
        <div class="color-squares">
            <strong>สี :&nbsp;</strong>
            <span v-for="color in JSON.parse(blog.colors)" :key="color" class="color-square" :style="{ backgroundColor: color }"></span>
        </div>
        <h3><strong>รายละเอียด</strong></h3>
        <div v-once v-html="blog.content.slice(0, 10000)"></div>
        <p>
        <button v-on:click="navigateTo('/blog/edit/'+ blog.id)" class="styled-button-yellow">แก้ไขสินค้า</button>
        <button v-on:click="navigateTo('/blogs')" class="styled-button-red">กลับ </button>
        </p>
    </div>
</template>

<script>
    import BlogsService from '@/services/BlogsService'
    
    export default {
        data() {
            return {
                blogs: [],
                search: '',
                BASE_URL: 'http://localhost:8081/assets/uploads/',
                LOAD_NUM: 3,
                pageWatcher: null,
                allBlogs: [],
                currentPage: 1,
                results: [],
                brand: [],
                loading: false,
                blog: null
            };
        },
        async created () {
            try {
                let blogId = this.$route.params.blogId
                this.blog = (await BlogsService.show(blogId)).data
            } catch (error) {
                console.log(error)
            }
        },
        methods : {
            navigateTo(route) {
                this.$router.push(route)
            },
        }
    }
</script>

<style scoped>
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

.color-squares {
    display: flex;
    margin-top: 5px;
}

.color-square {
    width: 20px; /* กำหนดความกว้างของช่องสี */
    height: 20px; /* กำหนดความสูงของช่องสี */
    margin-right: 5px; /* ระยะห่างระหว่างช่องสี */
    border: 1px solid #ccc; /* ขอบของช่องสี */
}
</style>
