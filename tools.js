/*eslint no-unused-vars: ["error", { "vars": "local" }] */
/*global set_style_mixin */
/*exported set_style_mixin */

var set_style_mixin = {
  mounted() {
    if (this.$options.styles) {
      console.log(`Added styles to Component ${this.$options.name}`);
      let place = "afterbegin";
      if (this.$el.parentNode) {
        place = "beforebegin";
      }
      this.$el.insertAdjacentHTML(
        place,
        `<style>${this.$options.styles}</style>`
      );
    }
  }
};
