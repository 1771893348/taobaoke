<template>
    <div>
        <van-swipe :autoplay = "3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <!-- <img :src="image" alt="" width="100%"> -->
                <van-image :src="image">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </van-swipe-item>
        </van-swipe>
        
        <!-- 两端对齐 -->
        <van-row type="flex" justify="space-between">
        <van-col span="16">
            <van-row type="flex">
                <van-tag round type="danger" size="medium">{{tag}}</van-tag>
                <span  class="price">¥{{price}}元</span>
                <span  class="org-price">{{original_price}}</span>
            </van-row>
        </van-col>
        <van-col span="8" class="volume">月销{{sum}}</van-col>
        </van-row>
        <van-row type="flex" justify="space-between" >
            <span style="margin-top: 0.5rem; color: #555;font-size: .5rem;padding: 0 .4rem;border-bottom: .02667rem dashed #f1eeee;margin">{{goodDetail.title}}</span>
        </van-row>
        <van-row type="flex" justify="space-between" class="coupon" :style="{backgroundImage:'url('+require('../assets/coupon_bg.png')+')'}">
            <van-col span="16">
                <div style="color:#fff;font-size: .4rem; margin-top: 0.2rem;">{{goodDetail.coupon_info}}</div>
                <div class="date_span">使用期限:{{goodDetail.coupon_start_time}}至{{goodDetail.coupon_end_time}}</div>
            </van-col>
            <van-col span="8" class="van-col-center" @click="getLottery">
                <span data-v-86825260="" class="go-coupon">立即领券</span>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-between" >
            <van-col class="footText" span="16">{{goodDetail.shop_title}}</van-col>
            <van-col class="footText" span="8">{{goodDetail.provcity}}</van-col>
        </van-row>
    </div>
</template>
<script>
import { Dialog, Toast } from 'vant';
import axios from "axios";
import {BASE_HOST} from "../common/urlhost";
export default {
    name:'GoodsDetail',
    data(){
        return{
            goodDetail:'',
            tag:'到手价',
            sum:1000,
            original_price:9.9,
            price:7,
            dialog_msg:'【粉丝福利购】，椱ァ製这段描述￥pc5VYpAqcEb￥后 👉打开♀手机绹寳♀APP即可领取优惠券👈',
            discount_code:'',
            images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
        }
    },
    beforecreated: function () {
        let that = this;
        console.log('beforecreated: ')
    },
    created: function () {
        let that = this;
        // `this` 指向 vm 实例
        that.goodDetail = this.$route.params;
        console.log('created: ' + that.goodDetail)
        that.price = parseFloat(that.goodDetail.zk_final_price - that.goodDetail.coupon_amount).toFixed(2);
        that.original_price = that.goodDetail.zk_final_price;
        that.sum = that.goodDetail.volume;
        that.images = that.goodDetail.small_images.string;
    },
    methods:{
        getLottery(){
            let that = this;
            if(that.goodDetail.coupon_share_url){
                if(!that.goodDetail.coupon_share_url.startsWith('http://') || !that.goodDetail.coupon_share_url.startsWith('https://')){
                    that.goodDetail.coupon_share_url = 'https:'+that.goodDetail.coupon_share_url;
                }
            }
            
        let param = {
                userId:'123456',
                url:that.goodDetail.coupon_share_url,
                logo:that.goodDetail.pict_url,
                text:that.goodDetail.title
            };
            // http://111.231.98.153:8080/coupon/tpwd
        axios.post(
                BASE_HOST + 'taobao/selTpwdCreate',
                param,
                {
                    headers: {'Content-Type': 'application/json'}
                }
                )
            .then(function (response) {
            
            if(response){
                console.log(response);
                let searchAllJson = response.data;
                // if(searchAllJson.code == 200){
                    console.log('searchAllJson',searchAllJson);
                    that.discount_code = searchAllJson.tbk_tpwd_create_response.data.model;
                    that.dialog_msg = '【粉丝福利购】，椱ァ製这段描述'+that.discount_code+'后 👉打开♀手机绹寳♀APP即可领取优惠券👈';
                    Dialog.alert({
                        title: '标题',
                        message: that.dialog_msg,
                        confirmButtonText: '复制'
                        }).then(() => {
                        // on close
                        that.$copyText(that.dialog_msg).then((e) => {
                                    // success
                                    console.log(e);
                                    Toast('复制成功');
                                }, (e) => {
                                    // fail
                                    console.log(e);
                                    Toast('复制失败');
                                });
                        
                        });
                // }
            }
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
            
        }
    }
}
</script>
<style scoped>
   
    .org-price{
        text-decoration: line-through;
        color: #999;
        margin-left: 0.2rem;
        font-size: 0.3rem;
    }
    .price{
        color: #ff5000;
         margin-left: 0.2rem;
    }
    .volume{
        color:#999;
        font-size: 0.3rem;
    }
    .title{
        color: #555;
        font-size: .42667rem;
        font-weight: 400;
        padding: 0 .4rem;
        line-height: .66667rem;
        border-bottom: .02667rem dashed #f1eeee;
    }
    .coupon{
        width: 100%;
        height: 2rem;
        padding: 0;
        background-image: url(../assets/coupon_bg.png);
        background-repeat: no-repeat;
        background-position: center .05333rem;
        
        background-size: 100%;
        display: inline-flex;
        justify-content: space-between;
    }
    .van-col-center{
         display: flex;
        align-items:center;
        justify-content: center;
    }
    .go-coupon{
        text-align: center;
        color: #fff;
        vertical-align: middle;
        font-weight: 800;
        font-size: .5rem;
    }

    .coupon-van-row{
         display: flex;
        align-items:center;
        justify-content: center;
        flex-direction: row;
    }

    .date_span{
        margin-top: 0.5rem;
        font-size: .3rem;
        color: #fdbd9a;
    }
    .footText{
        color: #666;
        font-size: .3rem;
    }
</style>