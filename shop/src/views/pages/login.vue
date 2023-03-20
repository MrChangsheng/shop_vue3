<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <el-form
                ref="formRef"
                :model="loginData"
                label-width="100px"
                class="demo-dynamic"
            >
                <el-form-item
                    prop="username"
                    label="用户名"
                    :rules="[
                        {
                            required: true,
                            message: '此项为必填项',
                            trigger:blur
                        },
                    ]"
                >
                    <el-input v-model="loginData.username"/>
                </el-form-item>
                <el-form-item
                    prop="password"
                    label="密码"
                    :rules="[
                        {
                            required: true,
                            message: '此项为必填项',
                            trigger: 'blur'
                        }
                    ]"
                >
                    <el-input type="password" show-password="true" v-model="loginData.password" />
                </el-form-item>
                <el-button type="primary" class="login_btn" @click="handlogin">登录</el-button>
                <!-- <p>{{num}}</p> -->
            </el-form>
        </div>
    </div>
</template>
<script>
    import {reactive, toRefs} from 'vue'
    import {useStore} from "vuex"
    import { useRouter } from 'vue-router'
    import { loginApi } from "@/util/request"
    export default {
        name:'login',
        setup(){
            const store = useStore()
            const router = useRouter()
            const count=store.state.number.count
            const data = reactive({
                loginData:{
                    username:'',
                    password:''
                },
                num:count
            })
            const handlogin=()=>{
                // 请求后台接口
                // 默认用户：admin/123456
                loginApi(data.loginData).then(res=>{
                    if(res.data){
                        console.log(res.data);
                        store.commit('setUserInfo',res.data);
                        localStorage.setItem("loginData",JSON.stringify(res.data))
                        // 跳转/user
                        router.push({
                            path:"/"
                        })
                    }
                })
                
            }
            // vuex更改语法
            // console.log("修改前getters",store.getters["number/countStatus"])
            // const handlogin=()=>{
            //     // store.commit('number/setCount',100);
            //     store.dispatch('number/setCountPromise',-101).then(res=>{
            //         alert("修改成功")
            //     }).catch(err=>{
            //         alert(err)
            //     })
            //     console.log(store.state.number.count)
            //     console.log("修改后getters",store.getters["number/countStatus"]);
            // }
            return{
                ...toRefs(data),
                handlogin
            }
        }
    }
</script>
<style>
    .login_wrap{
        width: 100%;
        height: 100vh;
        background-color: rgb(115, 193, 217);
        position:relative;
    }
    .form_wrap{
        position: fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:#fff;
        padding:30px 50px;
    }
    .login_btn{
        display:block;
        margin:0px auto;

    }
</style>