/*global Vue set_style_mixin */
Vue.component("test-comp", {
  mixins: [set_style_mixin],
  model: {
    prop: "text",
    event: "change"
  },
  props: {
    color: {
      type: String,
      default: "blue"
    },
    text: {
      type: String,
      default: "Enter text here"
    },
    name: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      canEdit: false,
      myTemplate: `<div class="test-comp" :style="{color: color}">
      <div style="color: black;">{{name}}:&nbsp;&nbsp;<v-btn icon x-small color="blue" 
      v-on:click="canEdit = !canEdit" :disabled="canEdit" v-if="!readOnly">
      <v-icon>mdi-pencil</v-icon></v-btn>
      <span v-else><v-icon size="18px">mdi-pencil-off</v-icon></span></div>
      <div :contentEditable="canEdit" @blur="onEdit" v-text="text" class="editme" 
        @keydown.enter="endEdit"></div>
    </div>`
    };
  },
  methods: {
    onEdit(evt) {
      var src = evt.target.textContent;
      this.canEdit = !this.canEdit;
      this.$emit("change", src);
    },
    endEdit(evt) {
      evt.target.blur();
    }
  },
  template: `
    <v-template :template="myTemplate"></v-template>
  `,
  styles: `
  .test-comp {
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
    margin: 2px;
  }
  .test-comp .editme {
    padding: 2px;
    border: 1px solid #ccc;
    margin: 2px;
  }
  `
});

Vue.component("v-template", {
  functional: true,
  props: ["template"],
  test: 1,
  render(h, ctx) {
    console.log(ctx.parent, ctx);

    let opts = {
      props: ctx.parent.$options._propKeys,
      data() {
        return ctx.parent.$data;
      },
      beforeCreate() {
        this.$createElement = h;
      },
      computed: ctx.parent.$options.computed,
      methods: ctx.parent.$options.methods,
      provide: ctx.parent.$options._provided,
      template: `<div>${ctx.props.template}</div>`
    };
    let data = {
      on: Object.assign({}, ctx.parent.$attrs, ctx.parent.$listeners),
      nativeOn: Object.assign({}, ctx.parent.$attrs, ctx.parent.$listeners),
      attrs: ctx.parent.$attrs
    };

    if (typeof ctx.parent.$props !== "undefined") {
      data.props = ctx.parent.$props;
      //opts.props = Object.keys(ctx.parent.$options.propsData);
    }
    console.log(opts, data);
    return h(opts, data);
  }
});
