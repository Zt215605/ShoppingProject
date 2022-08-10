<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button  @click="$emit('getPageNo',1)" v-if="startNumAndEndNum.start > 1" :class="{active:pageNo==1}">1</button>

    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <!-- 这里混用v-for与v-if出现了一个eslint-plugin-vue报错，官方文档也有讲不推荐v-if与v-for混用（v-for优先级更高），官方解释混用建议
      将v-if放在v-for内置容器或外置容器中，不推荐放在一个容器中使用   其实使用v-show就能够很好的解决    
     -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
       @click="$emit('getPageNo',page)"
       :class="{active:pageNo==page}"
    >{{page}}
    </button>
    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage"  @click="$emit('getPageNo',totalPage)" :class="{active:totalPage==pageNo}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage"  @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // pageNo：当前页数   pageSize：每一页展示多少条数据   total：所有分页有多少条数据   continues：连续页数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码起始数字与结束数字【连续页码的数字：至少是5】
    startNumAndEndNum() {
      const { totalPage, pageNo, continues } = this;
      // 定义变量存储开始与结束数字
      let start = 0;
      let end = 0;
      // 连续页面5页，如果不正常
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 如果在最开始
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 如果再最后
        else if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }      
      }
      return { start, end };
    },
  },

 
};
</script>

<style lang="less" scoped>
.active{
  background: skyblue;
}
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>