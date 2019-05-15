let vm = new Vue({
  el: "#app",
  created() {
    this.todos = JSON.parse(localStorage.getItem("data")) || this.todos;
    this.hash = window.location.hash.slice(2) || 'all';

    window.addEventListener("hashchange", () => {
      this.hash = window.location.hash.slice(2)
    }, false)
  },
  directives: {
    focus(el, bindings) {
      if (bindings.value) {
        el.focus();
      }
    }
  },
  data: {
    todos: [
      {
        isSelected: false,
        title: "睡觉"
      },
      {
        isSelected: false,
        title: "音乐"
      },
      {
        isSelected: false,
        title: "健身"
      }
    ],
    title: "",
    cur: "",
    hash: ""
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem("data", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  methods: {
    add() {
      this.todos.push({
        isSelected: false,
        title: this.title
      });
      this.title = ""
    },
    remove(item) {
      this.todos = this.todos.filter(Element => Element !== item)
    },
    remember(item) {
      this.cur = item;
    },
    cancel() {
      this.cur = '';
    }
  },
  computed: {
    filerTodos() {
      if (this.hash === 'all') return this.todos;
      if (this.hash === 'finish') return this.todos.filter(Element => Element.isSelected);
      if (this.hash === 'unfinish') return this.todos.filter(Element => !Element.isSelected);
      return this.todos;

    },
    getLength() {
      return this.todos.filter(Element => !Element.isSelected).length;
    }
  }
})