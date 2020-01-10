<template>
  <div style="background-color: #ededed;">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs @click="onClick">
      <van-tab title="综合"></van-tab>
      <van-tab title="销量"></van-tab>
      <van-tab title="价格"></van-tab>
    </van-tabs>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <div
          v-for="item in list"
          :key="item"
          > 
           <!-- <van-row type="flex" style="margin-top: .3rem;background-color: #fff;padding:.2rem;">
              <div>
                 <van-image :src="item.pict_url"
                          width="2.7rem"
                          height="2.7rem"
                          fit="cover">
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
              </div>
              <div >
                <div>
                    <span class="text" style="font-size: .3rem;">{{item.short_title}}</span>
                </div>
                <div>
                  <van-row type="flex" justify="space-between" style="font-size: .3rem;">
                        <span class="">原价￥{{item.zk_final_price}}</span>
                        <span>月销{{item.volume}}</span>
                  </van-row>
                  <van-row type="flex" style="font-size: .3rem;" justify="space-between" >
                        <span class="textRed">到手价￥{{parseFloat(item.zk_final_price - item.coupon_amount).toFixed(2)}}</span>
                        <van-tag type="danger">￥{{item.coupon_amount}}元券</van-tag>
                  </van-row>
                </div>
              
                <div>
                  <van-row type="flex" style="font-size: .3rem;" justify="space-between" >
                      <van-col span="16">{{item.shop_title}}</van-col>
                      <van-col span="8">{{item.provcity}}</van-col>
                  </van-row>
                </div>
              </div>
            </van-row> -->
        <van-card
            v-if="item.coupon_amount"
            num="1"
            :desc="item.title"
            :thumb="item.pict_url"
            @click="toDetails(item)"
          >
          
            <div slot="thumb" style="display:flex;">
                <van-image :src="item.pict_url"
                          width="3.4rem"
                          height="3.4rem"
                          fit="cover">
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
            </div>
            <div slot="title" style="display:flex;">
                <span>{{item.short_title}}</span>
            </div>
            <div slot="num">
              <span>月销{{item.volume}}</span>
            </div>
            <div slot="bottom">
              <van-row type="flex" justify="space-between" >
                    <span class="">原价￥{{item.zk_final_price}}</span>
              </van-row>
              <van-row type="flex" justify="space-between" >
                    <span class="textRed">到手价￥{{parseFloat(item.zk_final_price - item.coupon_amount).toFixed(2)}}</span>
                    <van-tag type="danger">￥{{item.coupon_amount}}元券</van-tag>
              </van-row>
            </div>
           
            <div slot="footer">
              <van-row type="flex" style="margin-left:1rem" justify="space-between" >
                  <van-col span="16">{{item.shop_title}}</van-col>
                  <van-col span="8">{{item.provcity}}</van-col>
              </van-row>
            </div>
          </van-card>
      </div>
      </van-list>
  </div>
</template>

<script>
import {Toast} from 'vant';
import {HttpRequest} from '../utils/http';
import axios from "axios";
import moment from "moment";
import {BASE_HOST} from "../common/urlhost";
import utils from '../utils/funs'

export default {
  name: 'Search',
  data(){
    return {
      screenHeight: document.body.clientHeight,
      value:'内衣',
      adzoneId:'109685850015',
      pageNum:1,
      pageSize:20,
      sortType:'',
      totalPage:1000,
      total:200000,
      searchAllJson:'',
      list: [],
      loading: false,
      finished: false
    };
  },
  created: function () {
    let that = this;
    let q = utils.getUrlKey('q');
    let id = utils.getUrlKey('id');
    console.log('wgw_q',q);
    if(q && q != ''){
      that.value = q;
    }
    if(id && id != ''){
      that.adzoneId = id;
    }
  },
  mounted () {
			this.get_bodyHeight()
		},
  methods:{
    get_bodyHeight () {//动态获取浏览器高度
				const that = this
				window.onresize = () => {
					return (() => {
						window.fullHeight = document.documentElement.clientHeight
						that.fullHeight = window.fullHeight
					})()
				}
			},
    onClick(name, title){
      let that = this;
      if(title=='综合'){
        that.sortType = '';
      }else if(title=='销量'){
        that.sortType = 'total_sales_des';
      }else if(title=='价格'){
        that.sortType = 'price_asc';
      }else{
        that.sortType = '';
      }
      that.list = [];
      that.pageNum=1;
      that.searchGoods(this.value);
      
      // Toast('点击结算:'+title);
    },
    onSearch(value){
      let that = this;
      // Toast('搜索:'+this.value);
      that.list = [];
      that.pageNum=1;
      this.searchGoods(this.value);
    },
    onLoad() {
      
      this.searchGoods(this.value);
      this.pageNum = this.pageNum+1;
    },
    toDetails(event,item){
      console.log('toDetails',event,item);
      this.$router.push({name:'GoodsDetail',params:event});
    },
    searchGoods(qGoods){
      let that = this;
      console.log('searchGoods',qGoods);
      // http://111.231.98.153:8080/coupon/search
       let param = {
              adzoneId:that.adzoneId,
              pageNo:that.pageNum,
              pageSize:that.pageSize,
              hasCoupon:true,
              q:qGoods
          };
      if(that.sortType != ''){
          param.sort = that.sortType;
        }
      console.log('wgw_selMaterialOptional',param);
      axios.post(BASE_HOST+'taobao/selMaterialOptional', param,{
        headers: {'Content-Type': 'application/json'}})
        .then(function (response) {
           console.log(response);
          if(response){
            let searchAllJson = response.data.tbk_dg_material_optional_response;
            // if(searchAllJson.code == 200){
              let ls = searchAllJson.result_list.map_data;
               ls.forEach((item, index) => {
                that.list.push(item) 
                // 追加成[x,x,x,x,x,x]
              })
              // 加载状态结束
              that.loading = false;

              // 数据全部加载完成
              // if (this.list.length >= 40) {
              //   this.finished = true;
              // }
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

<style>
  .textRed{
    color: red
  }
  .van-card{
    
    margin-top: .2rem;
  }
  .van-card__header a{
      width:3.4rem;
      height:3.4rem;
  }
  .van-card__thumb{
      width:3.4rem;
      height:3.4rem;
  }
  .text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
