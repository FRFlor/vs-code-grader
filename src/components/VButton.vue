<template>
  <button @click="onClick">
    <slot>
      X
    </slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


@Component
export default class VButton extends Vue {
  @Prop({default: ""}) private alt!: string;

  private onClick(payload: MouseEvent): void {
    this.flash(payload);
    this.$emit("click");
  }

  private flash(payload: MouseEvent): void {
    if (payload.target === null) {
      return;
    }

    // @ts-ignore
    const original = payload.target.style.backgroundColor;
    // @ts-ignore
    payload.target.style.backgroundColor = "#007ACC";
    setTimeout(() => {
      if (payload.target === null) {
        return;
      }
      // @ts-ignore
      payload.target.style.backgroundColor = original;
    }, 100);
  }
}
</script>

<style lang="scss" scoped>
  @import "../app";

  img {
    pointer-events: none;
  }

  button {
    background-color: transparent;
    outline: none;
    border: none;
    &:hover {
      background-color: $vs_gray;
      filter: brightness(120%);
    }
  }
</style>
