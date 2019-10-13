<template>
  <nav>
    <div class="switch-tabs flex">
      <v-button alt="arrow-left">
        <img src="../assets/arrowLeft.svg" alt="go-to-previous-tab">
      </v-button>
      <v-button alt="arrow-left">
        <img src="../assets/caret.svg" alt="see-tabs">
      </v-button>
      <v-button alt="arrow-right">
        <img src="../assets/arrowLeft.svg" style="transform: scaleX(-1);" alt="go-to-next-tab">
      </v-button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VButton from "@/components/VButton.vue";
@Component({
  components: {VButton},
})
export default class TopNav extends Vue {
}
</script>

<style lang="scss" scoped>
  @import "../app";

  nav {
    background-color: $vs_dark_gray;
    display: flex;
    height: 35px;
    width: 100px;
  }

  img {
    pointer-events: none;
  }
</style>
