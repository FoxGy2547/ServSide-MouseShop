<template>
    <div class="container"> 
        <br><br><br>
    <h1>รายการสินค้าทั้งหมด</h1>
    <section>
        <header class="blog-header">
            <h4>ค้นหา Gaming Mouse</h4>
                <div> 
                    <form style="display: flex; align-items: center;"> <!-- ใช้ Flexbox เพื่อจัดแนว -->
                        <input type="text" v-model="search" placeholder="Search" aria-label="Search Blogs" />&nbsp;&nbsp;
                        <ul class="categories" style="list-style: none; display: flex; margin: 0; padding: 0; align-items: center;">
                            <li v-for="cate in brand" :key="cate">
                                <a @click.prevent="setbrand(cate)" href="#">{{ cate }}</a>
                            </li>
                            <li class="clear">
                                <a @click.prevent="setbrand('')" href="#">Clear</a>
                            </li>
                        </ul>
                    </form>
                </div>
                
                <div>
                    <div class="blog-actions">
                        <button @click="navigateTo('/blog/create')" class="styled-button-green">เพิ่มสินค้า</button><br><br> <!-- ปุ่มเพิ่มสินค้า -->
                    </div>
                

                    <div class="clearfix"></div>
                    <strong>จำนวน Gaming Mouse: </strong> {{ filteredBlogs.length }}
                </div>
            <br />
        </header>

        <!-- No data message -->
        <div v-if="!filteredBlogs.length" class="empty-blog">
            *** ไม่มีข้อมูล ***
        </div>

        <!-- Blog list -->
        <section v-else>
            <article v-for="blog in paginatedBlogs" :key="blog.id" class="blog-list" aria-labelledby="blogTitle">
                <div class="blog-pic">
                    <transition name="fade">
                        <div v-if="blog.thumbnail && blog.thumbnail !== 'null'" class="thumbnail-pic">
                            <img :src="BASE_URL + blog.thumbnail" alt="Blog Thumbnail" />
                        </div>
                    </transition>
                </div>

                <div class="blog-info">
                    <h2>รุ่น : {{ blog.model }}</h2>
                    <h4><strong>แบรนด์ : </strong>{{ blog.brand }}</h4>
                    <div class="color-squares">
                        <strong>สี :&nbsp;</strong>
                        <span v-for="color in JSON.parse(blog.colors)" :key="color" class="color-square" :style="{ backgroundColor: color }"></span>
                    </div>
                    <h3>รายละเอียด</h3>
                    <div v-once v-html="blog.content.slice(0, 10000)"></div>
                    <p><strong>ลงเมื่อ :</strong> {{ formatDate(blog.createdAt) }}</p>
                    <p><strong>สถานะสินค้า :</strong> {{ blog.status }}</p>
                    <div class="blog-actions">
                        <button @click="navigateTo('/blog/' + blog.id)" class="styled-button-blue">ดูสินค้า</button>
                        <button @click="navigateTo('/blog/edit/' + blog.id)" class="styled-button-yellow">แก้ไขสินค้า</button>
                        <button @click="deleteBlog(blog)" class="styled-button-red">ลบสินค้า</button>
                    </div>
                </div>
                <div class="clearfix"></div>
            </article>
        </section>
    </section>
    </div>
</template>
  
<script>
import BlogsService from '@/services/BlogsService';
import _ from 'lodash';
import ScrollMonitor from 'scrollMonitor';
import axios from 'axios';

export default {
    data() {
        return {
            blogs: [],
            search: '',
            BASE_URL: 'http://localhost:8081/assets/uploads/',
            LOAD_NUM: 10000,
            pageWatcher: null,
            allBlogs: [],
            currentPage: 1,
            results: [],
            brand: [],
            loading: false,
        };
    },
    async created() {
        await this.refreshData();
    },
    computed: {
        filteredBlogs() {
            if (this.search) {
                return this.allBlogs.filter((blog) =>
                    blog.model.toLowerCase().includes(this.search.toLowerCase()) ||
                    blog.brand.toLowerCase().includes(this.search.toLowerCase())
                );
            }
            return this.allBlogs;
        },
        paginatedBlogs() {
            return this.filteredBlogs.slice(0, this.currentPage * this.LOAD_NUM);
        },
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async deleteBlog(blog) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            try {
                const response = await BlogsService.index();
                console.log('Blogs fetched:', response.data); // เพิ่ม log
                this.allBlogs = response.data;
                this.populateCategories();
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        },
        loadMoreBlogs() {
            this.currentPage++;
        },
        handleScroll() {
            if (this.pageWatcher && this.pageWatcher.isInViewport) {
                this.loadMoreBlogs();
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('th-TH', options);
        },
        setbrand(keyword) {
            this.search = keyword.trim();
        },
        populateCategories() {
            this.allBlogs.forEach(blog => {
                if (!this.brand.includes(blog.brand)) {
                    this.brand.push(blog.brand);
                }
            });
        },
    },
    watch: {
        search: _.debounce(async function (value) {
            const route = { name: 'blogs' };
            if (this.search !== '') {
                route.query = { search: this.search };
            }
            this.$router.push(route);
        }, 700),
    },
    mounted() {
        const sens = document.querySelector('#blog-list-bottom');
        this.pageWatcher = ScrollMonitor.create(sens);
        this.pageWatcher.enterViewport(this.handleScroll);
    },
    beforeDestroy() {
        if (this.pageWatcher) {
            this.pageWatcher.destroy();
        }
    },
};
</script>
<style scoped>
.empty-blog {
    width: 100%;
    text-align: center;
    padding: 10px;
    background: darksalmon;
    color: white;
}

.thumbnail-pic img {
    width: 300px;
    padding: 5px 10px 0 0;
}

.blog-info,
.blog-pic {
    float: left;
}

.clearfix {
    clear: both;
}

.blog-list {
    border: solid 1px #dfdfdf;
    margin-bottom: 10px;
    max-width: 900px;
    margin: 10px auto;
    padding: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    display: flex; /* ใช้ Flexbox สำหรับจัดเรียง */
}

.blog-pic {
    flex: 1; /* ให้รูปภาพใช้พื้นที่ 1 ส่วน */
    margin-right: 20px; /* เพิ่มระยะห่างระหว่างรูปภาพกับข้อความ */
}

.blog-info {
    flex: 2; /* ให้ข้อมูลใช้พื้นที่ 2 ส่วน */
}

.thumbnail-pic img {
    width: 100%; /* ให้ภาพขยายเต็มพื้นที่ของ .blog-pic */
    max-width: 300px; /* จำกัดขนาดสูงสุด */
    height: auto; /* เพื่อรักษาสัดส่วนของภาพ */
}


#blog-list-bottom {
    padding: 30px;
    text-align: center;
    background: rgb(49, 219, 123);
    color: white;
}

/* Categories */
.categories {
    padding: 0;
    list-style: none;
    float: left;
}

.categories li {
    float: left;
    padding: 2px;
}

.categories li a {
    padding: 5px 10px;
    background: #72ecff;
    color: black;
    text-decoration: none;
}

.categories li.clear a {
    background: #ff4a8f;
    color: white;
}

.blog-actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* จัดให้อยู่ซ้ายสุด */
    gap: 20px;
    /* ระยะห่างระหว่างปุ่มกับหมวดหมู่ */

}

.blog-actions button {
    margin-right: 20px;
    /* เพิ่มระยะห่างจากปุ่มกับหมวดหมู่ถ้าต้องการ */
}

h1 {
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