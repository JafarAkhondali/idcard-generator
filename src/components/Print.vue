<template>
  <div>
    <div
      class="sheet"
    >
      <div
        v-for="pos in positions"
        :key="pos.id"
        :style="`top: ${pos.top}mm;left: ${pos.left}mm;width: ${pos.width}mm; height: ${pos.height}mm;`"
        class="card-positioned"
      />
    </div>
  </div>
</template>

<script>
import { dimensionSolver } from '@/Helper';

export default {
  name: 'Print',
  data: () => ({
    positions: [],
  }),
  mounted() {
    this.positions = dimensionSolver({
      pageWidth: 210,
      pageHeight: 296,
      cardWidth: 100,
      cardHeight: 70,
    });
  },
};
</script>

<style scoped>
  .sheet{
    border: 1px dashed #333;
    position: relative;
  }
  .card-positioned{
    border: #03A9F4 1px dashed;
    box-sizing: border-box;
    position: absolute;
    background: rgba(100,150,240,.3);
  }
</style>
