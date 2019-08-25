class Node {
    constructor(node, nodeClass,html) {
        this.node = node;
        this.nodeClass = nodeClass;
        this.html = html;
    }

    createElement() {
        let element = document.createElement(this.node);
            element.classList.add(this.nodeClass);
            element.innerHTML = `${this.html}`;
            return element;
    }
    get element() {
        return this.createElement();
    }
}

export {
    Node
}