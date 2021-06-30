<template>
  <div class="x-pagination">
    <span class="x-total">共 {{ total }} 条</span>
    <button
      class="x-btn prev"
      @click="handlePrev()"
      :disabled="activePageIndex === 1"
    >
      <i class="fa fa-angle-left"></i>
    </button>
    <ul class="x-pager">
      <li :class="[1 === activePageIndex ? 'active' : '']">1</li>
      <li
        v-if="isShowPrev"
        @click.stop="loadMorePrevPages()"
        @mouseover.stop="handleMouseover('prev')"
        @mouseout.stop="handleMouseout('prev')"
        :class="[isShowPrev && isPrevHover ? 'active' : '']"
      >
        <i
          :class="[
            isPrevHover ? 'fa fa-angle-double-left' : 'fa fa-ellipsis-h',
          ]"
        ></i>
      </li>
      <li
        v-for="(item, index) in pages"
        :key="index"
        :class="[item === activePageIndex ? 'active' : '']"
      >
        {{ item }}
      </li>
      <li
        v-if="isShowNext"
        @click.stop="loadMoreNextPages()"
        @mouseover.stop="handleMouseover('next')"
        @mouseout.stop="handleMouseout('next')"
        :class="[isShowNext && isNextHover ? 'active' : '']"
      >
        <i
          :class="[
            isNextHover ? 'fa fa-angle-double-right' : 'fa fa-ellipsis-h',
          ]"
        ></i>
      </li>
      <li :class="[totalPage === activePageIndex ? 'active' : '']">
        {{ totalPage }}
      </li>
    </ul>
    <button
      class="x-btn next"
      @click="handleNext()"
      :disabled="activePageIndex === totalPage"
    >
      <i class="fa fa-angle-right"></i>
    </button>
    <span class="x-jump"
      >跳至
      <input type="text" v-model.number="jumpToPage" @input="handleJump()" />

      页</span
    >
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10,
    },
    pageIndex: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      totalPage: 0,
      pages: [2, 3, 4, 5],
      activePageIndex: 1,
      jumpToPage: null,
      isShowPrev: false,
      isShowNext: false,
      isPrevHover: false,
      isNextHover: false,
    };
  },
  created() {
    this.totalPage = Math.ceil(this.total / this.pageSize);
    this.isShowNext = this.totalPage > 5;
  },
  watch: {
    activePageIndex(val) {
      this.pages = val === 1 ? [2, 3, 4, 5] : this.pages;
    },
  },
  methods: {
    handlePrev() {
      this.isNextHover = false; // 解决当li hover且pages变化时，li的hover状态未重置
      this.activePageIndex =
        this.activePageIndex === 1 ? 1 : this.activePageIndex - 1;
      if (this.activePageIndex === 4) {
        this.pages.unshift(this.activePageIndex - 2);
        this.isShowPrev = false;
      }
      if (this.totalPage - this.activePageIndex >= 4) {
        this.isShowNext = true;
      }
      if (
        this.activePageIndex >= 5 &&
        this.activePageIndex <= this.totalPage - 4 &&
        this.isShowPrev
      ) {
        this.isShowPrev = true;
        this.pages.pop();
        const minPage = this.pages[0];
        const prevPage = minPage - 1 <= 1 ? 1 : minPage - 1;
        this.pages.unshift(prevPage);
      }
    },
    handleNext() {
      this.isPrevHover = false;
      this.activePageIndex =
        this.activePageIndex === this.totalPage
          ? this.totalPage
          : this.activePageIndex + 1;

      if (this.activePageIndex === 4) {
        this.isShowPrev = false;
        this.pages.push(this.activePageIndex + 2);
      }
      if (
        this.activePageIndex >= 5 &&
        this.activePageIndex <= this.totalPage - 2 &&
        this.isShowNext
      ) {
        this.isShowPrev = true;
        this.pages.shift();
        const maxPage = this.pages[this.pages.length - 1];
        const nextPage =
          maxPage + 1 > this.totalPage ? this.totalPage : maxPage + 1;
        this.pages.push(nextPage);
      }
      if (this.totalPage - this.activePageIndex <= 3) {
        this.isShowNext = false;
      }
    },
    handleMouseover(val) {
      val === "prev" ? (this.isPrevHover = true) : (this.isNextHover = true);
    },
    handleMouseout(val) {
      val === "prev" ? (this.isPrevHover = false) : (this.isNextHover = false);
    },
    loadMorePrevPages() {
      this.handlePrev();
    },
    loadMoreNextPages() {
      this.handleNext();
    },
    
    handleJump(val) {
      this.activePageIndex = val;
      this.$emit("activePageIndex", this.activePageIndex)
    },
  },
};
</script>
<style lang="scss" scoped>
.x-pagination {
  width: 100%;
  height: 32px;
  padding: 2px 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .x-total {
    display: block;
    height: 100%;
    line-height: 32px;
    margin-right: 10px;
    font-size: 13px;
  }
  .x-pager {
    display: flex;
    margin-right: 10px;
    font-weight: 700;
    li {
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 13px;
    }
    .active {
      color: #409eff;
    }
  }
  .x-btn {
    width: 28px;
    height: 28px;
    font-size: 16px;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }
  .x-btn:hover {
    color: #409eff;
  }
  .x-prev {
    margin-right: 10px;
  }
  .x-jump {
    font-size: 14px;
    display: block;
    margin-left: 20px;
    input {
      width: 30px;
      padding: 2px 5px;
      border: none;
      outline: none;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      box-sizing: border-box;
    }
    input:hover {
      border-color: #40a9ff;
    }
    input:focus {
      border-color: #40a9ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
}
</style>