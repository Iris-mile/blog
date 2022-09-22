---
# sidebar: auto
title: 组件封装
---
## 卡片组件
```vue
<template>
  <div class="box" :style="{width: `${width}px`, height: `${height}px`}">
    <div v-if="title" class="head">
      <span class="title">{{ title }}</span>
      <div v-if="showMore" @click="toMore" class="more">more ></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BoxWrapper',
  props: {
    title: {
      type: String,
      required: false
    },
    showMore: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    }
  },
  methods: {
    toMore() {
      this.$emit('toMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: rgba(43, 78, 94, 0.6);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: linear-gradient(to right, #4691b4, rgba(43, 78, 94, 0.6));
}

.title {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.more {
  color: #778899;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
</style>
```


## 分页组件
```js
<template>
  <el-pagination
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    hide-on-single-page
    :current-page="current"
    :page-sizes="[10, 20]"
    :page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 20,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('changePage', page)
    },
    handleSizeChange(size) {
      this.$emit('changePagesize', size)
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>


使用组件
 <Pagination
      :current="current"
      :size="size"
      :total="total"
      @changePage="changePage"
      @changePagesize="changePagesize"
    />
```