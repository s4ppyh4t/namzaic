const template = document.createElement("template");
template.innerHTML = 
`
    <style>
        :host {
            --primary: var(--clr-primary);
            --bg: var(--clr-bg);
            --text: var(--clr-text);
            --gap: var(--size);

            filter: drop-shadow(calc(12px / var(--gap)) calc(12px / var(--gap)) 0px rgba(from var(--shadow) r g b / 0));
            transition: filter 0.4s cubic-bezier(1, 0.007, 0.233, 1.492);
        }

        .mf-innerDiv {
            
            height: 100%;
            width: 100%;
            position: relative;
            opacity: 0;
            transform: scale(0);

            transition: transform 0.4s cubic-bezier(1, 0.007, 0.233, 1.492);
            background-blend-mode: multiply;
            box-shadow: inset -2px -5px 5px rgba(0, 0, 0, 0.2);
            border-radius: calc(1.6dvw / var(--gap));
        }


        .mf-innerDiv:hover {
            transform: translate(calc(-2dvw/var(--gap)), calc(-2dvw/var(--gap))) !important;
            border: 2px solid var(--shadow);
            z-index: 2;
        }

        :host:has(.mf-innerDiv:hover) {
            filter: drop-shadow(calc(2dvw / var(--gap)) calc(2dvw / var(--gap)) 0px rgba(from var(--shadow) r g b / 1));
        }

        :host(.tile-enter) .mf-innerDiv {
            opacity: 1;
            transform: scale(1);
        }
    </style>
    <div class="mf-innerDiv">
        
        <slot></slot>
    </div>

`


class MozTile extends HTMLElement {
    constructor(index, color, randplace, imgurl, finalHandler) {
        // Create base HTMLElement
        super();

        // engage shadow DOM and append template
        const shadow = this.attachShadow({mode: "open"});
        shadow.append(template.content.cloneNode(true));
        shadow.querySelector('.mf-innerDiv').style.background = 
            `linear-gradient(
                ${color}, 
                ${color}
                )
            , 
                url('${imgurl}') 
                
                center/cover no-repeat`;
        
        // Event listeners
        this.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            this.dispatchEvent(new CustomEvent('correct-pick', {
                bubbles: true,
                composed: true,
                detail: {
                    content: "hello there from MozTile",
                    correct: true ? index == randplace : false
                }
            }))
        });

        if (randplace == index && finalHandler) {
            this.addEventListener("mouseover", finalHandler);
        }
    }

}

customElements.define('moz-tile', MozTile);

export {MozTile}