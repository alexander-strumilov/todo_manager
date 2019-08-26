class Component {
    constructor(node, nodeClass,html) {
        this.node = node;
        this.nodeClass = nodeClass;
        this.html = html;
    }

    createElement() {
        let $el = document.createElement(this.node);
            $el.classList.add(this.nodeClass);
            $el.innerHTML = `${this.html}`;
            return $el;
    }
    get element() {
        return this.createElement();
    }
}

export {
    Component
}