const template = document.createElement("template");

template.innerHTML = 
    `
        <style>
            :host {
                --primary: var(--clr-primary);
                --bg: var(--clr-bg);
                --tertiary: var(--clr-tertiary);

                --ratio: var(--split-ratio);

                --guide-flex: var(--guide-txt-flex);
                --main-flex: var(--main-title-flex);
            }

            .mf-outerDiv {
                box-sizing: border-box;
                background-color: var(--bg);
                padding: 10px;
                display: flex;
                flex-direction: row;
                column-gap: 1rem;
                margin: 0;
                width: 100dvw;
                height: 100dvh;
                transition: all 0.4s cubic-bezier(0.8, -0.4, 0.32, 1.32);

                &:has(> *[style*="flex: 0"]) {
                    column-gap: 0;
                }
            }

            .mf-innerDiv__R {
                background-color: var(--tertiary);
                flex: calc(10 - var(--ratio));
                transition: all 0.4s cubic-bezier(0.8, -0.4, 0.32, 1.32);
                
                -webkit-mask-image: url('/static/img/left-frame.svg');
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-size: contain;
                -webkit-mask-position: center;

                mask-image: url('/static/img/left-frame.svg');
                mask-repeat: no-repeat;
                mask-size: contain;
                mask-position: center;
                
                &.apply-mask {
                    -webkit-mask-image: none;
                    mask-image: none;
                }
            }

            .mf-innerDiv__L {
                background-color: var(--primary);
                flex: var(--ratio);
                padding: 0 4dvw 0 4dvw;

                transition: all 0.4s cubic-bezier(0.8, -0.4, 0.32, 1.32) !important;

                &.apply-mask {
                    background-color: var(--bg);
                }
            }

            .mf-innerDiv {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center; 
                border-radius: 2dvw;
                transition: flex 0.4s cubic-bezier(0.8, -0.4, 0.32, 1.32);
                overflow: hidden;
            }
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
    }
}

customElements.define('two-column', TwoColumnBox);