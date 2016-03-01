(function () {
    var SayHelloPrototype = Object.create(HTMLElement.prototype, {
            createdCallback: {
                enumerable: true,
                value: function () {
                    console.log(this.localName + ' is created.');
                    var shadowRootNode = this.createShadowRoot(), templateContent = this.template.content.cloneNode(true), spanPlaceHolder = templateContent.querySelector('span');
                    spanPlaceHolder.innerText = this.getAttribute('message');
                    shadowRootNode.appendChild(templateContent);
                }
            },
            attachedCallback: {
                enumerable: true,
                value: function () {
                    console.log(this.localName + ' is attached to DOM.');
                }
            },
            detachedCallback: {
                enumerable: true,
                value: function () {
                    console.log(this.localName + ' is removed from DOM.');
                }
            },
            attributeChangedCallback: {
                enumerable: true,
                value: function (attributeName) {
                    var newMessageValue = this.getAttribute('message');
                    console.log(attributeName + ' value is changed to ' + newMessageValue);
                    this.createdCallback();
                }
            }
        });
    window.SayHello = document.registerElement('say-hello', { prototype: SayHelloPrototype });
    Object.defineProperty(SayHelloPrototype, 'template', {
        get: function () {
            var fragment = document.createDocumentFragment();
            var div = fragment.appendChild(document.createElement('div'));
            div.innerHTML = ' <h1>Hello <span></span></h1> ';
            while (child = div.firstChild) {
                fragment.insertBefore(child, div);
            }
            fragment.removeChild(div);
            return { content: fragment };
        }
    });
}());