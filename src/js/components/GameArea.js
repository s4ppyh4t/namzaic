const template = document.createElement("template");

template.innerHTML = 
    `
        <style> 
            
        </style>
        <div class="mf-outerDiv">
            <div class="mf-innerDiv mf-innerDiv__L">
                <slot name="left-content"></slot>
            </div>
            <div class="mf-innerDiv mf-innerDiv__R">
                <slot name="right-content"></slot>
            </div>
        </div>
        
    `;


class TwoColumnBox extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: "open"});
        
        shadow.append(template.content.cloneNode(true));
        shadow.querySelector(".mf-outerDiv").setAttribute("style", `--ratio: ${ratio}`);
        
    }
}