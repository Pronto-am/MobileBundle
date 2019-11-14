export default {
  commentNode(el, vnode) {
    const comment = document.createComment(' ');

    Object.defineProperty(comment, 'setAttribute', {
      value: () => undefined
    });

    vnode.text = ' ';
    vnode.elm = comment;
    vnode.isComment = true;
    vnode.context = undefined;
    vnode.tag = undefined;
    vnode.data.directives = undefined;

    if (vnode.componentInstance) {
      vnode.componentInstance.$el = comment;
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el);
    }
  }
}
