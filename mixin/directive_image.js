export default {
  directives: {
    img: {
      bind: (el, binding, vnode) => {
        // console.log(el.className)
        el.className = el.className + ' animated fadeIn';
        if (binding.value) {
          const image = new Image();
          image.onload = (e) => {
            vnode.elm.src = e.target.src;
            image.src = binding.value;
          };
        } else {
          vnode.elm.src = require('../static/sample_logo.jpg');
        }
      },
      update: (el, binding, vnode) => {
        const image = new Image();
        image.onload = (e) => {
          vnode.elm.style.width = '';
          vnode.elm.src = e.target.src;
        };

        if (binding.value) {
          image.src = binding.value;
        }
      },
    },
  },
};
