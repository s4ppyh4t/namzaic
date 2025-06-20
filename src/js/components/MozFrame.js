import { MozTile } from  "./MozTile.js";

const FRAME_SIZE = 72;
const NUM_IMG = 10;

const template = document.createElement("template");

template.innerHTML = 
    `
        <style>
            :host {
                --primary: var(--clr-primary);
                --bg: var(--clr-bg);
                --shadow: var(--clr-shadow);
                --fg: var(--clr-fg);

                filter: drop-shadow(2dvw 2dvw 0px rgba(from var(--shadow) r g b / 1));
                overflow: hidden;
            }

            .mf-innerDiv {
                box-sizing: border-box;
                padding: 6dvw;
                height: ${FRAME_SIZE}dvh;
                width: ${FRAME_SIZE}dvh;
                background-color: var(--fg);
                border-radius: 2rem;

                transform: rotate(6deg);
                transform-origin: center;
                transition: all 0.2s cubic-bezier(0.8, -0.4, 0.32, 1.32);
                
                display: grid;
                grid-template-columns: repeat(var(--size), 1fr);
                grid-template-rows: repeat(var(--size), 1fr);
                
                /* WebKit compatibility (Safari, Chrome) */
                -webkit-mask-image: url('/static/img/bound.svg');
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-size: cover;
                -webkit-mask-position: center;

                mask-image: url('/static/img/bound.svg');
                mask-repeat: no-repeat;
                mask-size: cover;
                mask-position: center;
                
                

                &::before {
                    content: var(--size-str);
                    box-sizing: border-box;
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    color: #000;
                    font-size: 6dvw;
                    font-weight: 100;
                    text-align: center;
                    opacity: 0.6;

                    pointer-events: none;
                }

                &.finish::before {
                    font-size: 2dvw;
                    animation: end-game-back 100s cubic-bezier(0.8, -0.4, 0.32, 1.32) 1s infinite;
                }

                &::after {
                    content: "";
                    opacity: 0;
                    box-sizing: border-box;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: calc(-12dvw + ${FRAME_SIZE}dvh);
                    height: calc(-12dvw + ${FRAME_SIZE}dvh);
                    border-radius: calc(2rem/var(--size));
                    background: url('/static/img/nice.jpg') center/cover no-repeat;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                }

                &.finish::after {
                    content: "";
                    opacity: 1;
                    box-sizing: border-box;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: calc(-12dvw + ${FRAME_SIZE}dvh);
                    height: calc(-12dvw + ${FRAME_SIZE}dvh);
                    border-radius: 2dvw;
                    background: url('/static/img/nice.jpg') center/cover no-repeat;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.4s ease;
                    pointer-events: all;
                    animation: end-game 100s cubic-bezier(0.8, -0.4, 0.32, 1.32) 1s infinite;
                }

                &.finish {
                    transition: all 0.2s cubic-bezier(0.8, -0.4, 0.32, 1.32);
                }
            }

            @keyframes strong-shake {
                0%   { transform: translateX(0) rotate(6deg); }
                15%  { transform: translateX(-10px) rotate(-3deg); }
                30%  { transform: translateX(10px) rotate(3deg); }
                45%  { transform: translateX(-8px) rotate(-2deg); }
                60%  { transform: translateX(8px) rotate(2deg); }
                75%  { transform: translateX(-5px) rotate(-1deg); }
                90%  { transform: translateX(5px) rotate(1deg); }
                100% { transform: translateX(0) rotate(6deg); }
            }

            @keyframes end-game {
                0% { background-image: url('/static/img/nice.jpg'); opacity: 1; }
                9% { background-image: url('/static/img/nice.jpg'); opacity: 1;}
                9.20% { background-image: url('/static/img/nice.jpg'); opacity: 0;}
                10% { background-image: url('/static/img/namz2.jpg'); opacity: 1; }
                19% { background-image: url('/static/img/namz2.jpg'); opacity: 1; }
                19.20% { background-image: url('/static/img/namz2.jpg'); opacity: 0;}
                20% { background-image: url('/static/img/namz3.jpg'); opacity: 1; }
                29% { background-image: url('/static/img/namz3.jpg'); opacity: 1; }
                29.20% { background-image: url('/static/img/namz3.jpg'); opacity: 0;}
                30% { background-image: url('/static/img/namz5.jpg'); opacity: 1; }
                39% { background-image: url('/static/img/namz5.jpg'); opacity: 1; }
                39.20% { background-image: url('/static/img/namz5.jpg'); opacity: 0;}
                40% { background-image: url('/static/img/namz6.jpg'); opacity: 1; }
                49% { background-image: url('/static/img/namz6.jpg'); opacity: 1; }
                49.20% { background-image: url('/static/img/namz6.jpg'); opacity: 0;}
                50% { background-image: url('/static/img/namz8.jpg'); opacity: 1; }
                59% { background-image: url('/static/img/namz8.jpg'); opacity: 1; }
                59.20% { background-image: url('/static/img/namz8.jpg'); opacity: 0;}
                60% { background-image: url('/static/img/namz15.jpeg'); opacity: 1; }
                69% { background-image: url('/static/img/namz15.jpeg'); opacity: 1; }
                69.20% { background-image: url('/static/img/namz15.jpeg'); opacity: 0;}
                70% { background-image: url('/static/img/namz11.jpg'); opacity: 1; }
                79% { background-image: url('/static/img/namz11.jpg'); opacity: 1; }
                79.20% { background-image: url('/static/img/namz11.jpg'); opacity: 0;}
                80% { background-image: url('/static/img/namz12.jpg'); opacity: 1; }
                89% { background-image: url('/static/img/namz12.jpg'); opacity: 1; }
                89.20% { background-image: url('/static/img/namz12.jpg'); opacity: 0;}
                90% { background-image: url('/static/img/namz14.jpg'); opacity: 1; }
                99% { background-image: url('/static/img/namz14.jpg'); opacity: 1; }
                99.20% { background-image: url('/static/img/namz14.jpg'); opacity: 0;}
                100% { background-image: url('/static/img/nice.jpg'); opacity: 1; }
            }

            @keyframes end-game-back {
                0% { content: ""; }
                9% { content: ""; }
                9.20% { content: ""; content: "mr namz on namz"; }
                10% { content: ""; }
                19% { content: ""; }
                19.20% { content: ""; content: "mr namz hot"; }
                20% { content: ""; }
                29% { content: ""; }
                29.20% { content: ""; content: "mr namz carrot"; }
                30% { content: ""; }
                39% { content: ""; }
                39.20% { content: ""; content: "mr namz w/ doggos"; }
                40% { content: ""; }
                49% { content: ""; }
                49.20% { content: ""; content: "mr namz w/ Ellie"; }
                50% { content: ""; }
                59% { content: ""; }
                59.20% { content: ""; content: "mr namz call centre"; }
                60% { content: ""; }
                69% { content: ""; }
                69.20% { content: ""; content: "mr namz aghghghhg"; }
                70% { content: ""; }
                79% { content: ""; }
                79.20% { content: ""; content: "mr namz scari"; }
                80% { content: ""; }
                89% { content: ""; }
                89.20% { content: ""; content: "mr namz gooner"; }
                90% { content: ""; }
                99% { content: ""; }
                99.20% { content: ""; content: "mr namz pretty"; }
                100% { content: ""; }
            }

            .strong-shake {
                animation: strong-shake 0.3s ease-in-out;
                transform: rotate(6deg);
            }
        </style>
        
        <slot></slot>
        <div class="mf-innerDiv">
            
        </div>
        
    `;

class MozFrame extends HTMLElement {
    size = 1;
    maxSize = 2;
    colorArray = this.processImage();
    
    constructor() {
        // Create base HTMLElement
        super();

        // engage shadow DOM and append template
        const shadow = this.attachShadow({mode: "open"});
        
        shadow.append(template.content.cloneNode(true));
        
        this.resetTiles();
        const currCtx = this;
        // Event listeners
        // if hits 20 (400 tiles) then trigger done CustomEvent
        this.addEventListener("correct-pick", (e) => {
            
            this.dispatchEvent(
                new CustomEvent("next-move", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        isCorrect: e.detail.correct,
                        currentSize: currCtx.size,
                        originEvent: e,
                        maxSize: currCtx.maxSize
                    }
                })
            )

            if (e.detail.correct == false && this.size == this.maxSize) {
                
                setTimeout(() => {
                    shadow.querySelector(".mf-innerDiv").classList.add("finish");
                    setTimeout(() => {
                        shadow.querySelectorAll("moz-tile").forEach((element) => element.remove());
                    }, 400);
                }, 1500);
                return
            }

            this.resetTiles();
            if (e.detail.correct && this.size < this.maxSize) {
                this.alterTilesSize(true);
                return
            }
            this.shakeFrame(shadow);
        });

        this.addEventListener("correct-hover", (event) => {
            if (this.size == this.maxSize) {
                this.dispatchEvent(
                    new CustomEvent("next-move", {
                        bubbles: true,
                        composed: true,
                        detail: {
                            isCorrect: true,
                            currentSize: currCtx.size,
                            originEvent: event,
                            maxSize: currCtx.maxSize
                        }
                    })
                )
                let destId = Math.floor(Math.random() * this.maxSize * this.maxSize);
                destId = destId == event.detail.targetId ? 0 : destId;
                
                const tiles = shadow.querySelectorAll("moz-tile");

                const targetTile = tiles[event.detail.targetId].shadowRoot;
                const destTile = tiles[destId].shadowRoot;

                let targetBgStyle = targetTile.querySelector(".mf-innerDiv").style.background;
                let destBgStyle = destTile.querySelector(".mf-innerDiv").style.background;

                const targetBgUrl = targetBgStyle.match(/url\((['"]?)(.*?)\1\)/)[2];
                const destBgUrl = destBgStyle.match(/url\((['"]?)(.*?)\1\)/)[2];

                targetBgStyle = targetBgStyle.replace(/url\(([^)]+)\)/, `url('${destBgUrl}')`);
                destBgStyle = destBgStyle.replace(/url\(([^)]+)\)/, `url('${targetBgUrl}')`);

                tiles[event.detail.targetId].shadowRoot.querySelector(".mf-innerDiv").style.background = targetBgStyle;
                tiles[destId].shadowRoot.querySelector(".mf-innerDiv").style.background = destBgStyle;

                tiles[destId].addEventListener(event.detail.originalEvent.type, this.createFinalHandler(destId));
            }
        });
    }

    createFinalHandler(targetId) {
        // Save the class' context
        

        // Use this within handler will cause it to retrieve different context
        const handler = function (event) {
            const swapAndDelete = new CustomEvent("correct-hover", {
                detail: {
                    originalEvent: event,
                    targetId: targetId
                },
                bubbles: true,
                composed: true
            });

            // dispatch
            event.target.dispatchEvent(swapAndDelete);

            // and remove self
            event.target.removeEventListener(event.type, handler);
        }

        return handler
    }

    shakeFrame(shadow) {
        shadow.querySelector(".mf-innerDiv").classList.add("strong-shake");
        shadow.querySelector(".mf-innerDiv").addEventListener("animationend", () => {
            shadow.querySelector(".mf-innerDiv").classList.remove("strong-shake");
        });
    }

    resetTiles() {
        let innerDiv = this.shadowRoot.querySelector(".mf-innerDiv");
        

        let tiles = innerDiv.querySelectorAll('moz-tile');

        if (tiles.length !== 0) {
            
            tiles.forEach((tile) => {
                // Animate out
                tile.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.689, -0.519, 0.227, 0.99)";
                tile.style.opacity = "0";
                tile.style.transform = "rotateY(45deg) scale(0.9)";
            });

            // Wait for animation before removal
            setTimeout(() => {
                tiles.forEach((tile) => tile.remove());
                innerDiv.setAttribute("style", `--size: ${this.size}; --size-str: "${this.size}x${this.size}"`);
                this.spawnTiles(); // Animate new tiles in
            }, 400); // Matches transition time
        } else {
            innerDiv.setAttribute("style", `--size: ${this.size}; --size-str: "${this.size}x${this.size}"`);
            this.spawnTiles(); // First time setup
        }
    }

    spawnTiles() {
        let randomPosition = Math.floor(Math.random() * this.size * this.size);
        let imageUrls = [];

        const innerDiv = this.shadowRoot.querySelector(".mf-innerDiv");

        // feed the urls
        for (let i = 0; i < this.size ** 2; i++) {
            imageUrls.push(i != randomPosition ? `/static/img/${Math.ceil(NUM_IMG*Math.random())}.png` : '../static/img/namz.png');
        }

        this.preloadImagesWithRetries(imageUrls).then(() => {
            for (let i = 0; i < this.size ** 2; i++) {
                const tile = new MozTile(i, this.colorArray[i], randomPosition, imageUrls[i], (i == randomPosition && this.size == this.maxSize) ? this.createFinalHandler(i) : null);
                innerDiv.append(tile);
            }

            // Delay next frame to trigger transition
            innerDiv.querySelectorAll("moz-tile").forEach((tile, i) => {
                setTimeout(() => tile.classList.add("tile-enter"), 150);
            });
        })

        
    }

    preloadImagesWithRetries(urls) {
        return Promise.all(
            urls.map(url => this.preloadImageWithRetry(url))
        );
    }


    preloadImageWithRetry(src, maxRetries = 100, delay = 100) {
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const tryLoad = () => {
            const img = new Image();
            img.src = src + (attempts > 0 ? `?cachebust=${Date.now()}` : ""); // bypass caching if retry

            img.onload = () => resolve(src);
            img.onerror = () => {
                attempts++;
                console.log(`Failed to load ${attempts} time of ${src}`)
                if (attempts < maxRetries) {
                    setTimeout(tryLoad, delay);
                } else {
                    console.warn(`❌ Failed to load after ${maxRetries} attempts:`, src);
                    resolve(null); // still resolve to avoid blocking
                }
            };
            };

            tryLoad();
        });
    }

    alterTilesSize(isUp) {
        this.size += 1 ? isUp : -1;
    }

    processImage() {
        const img = document.getElementById('sourceImage');
        const canvas = document.getElementById('hiddenCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas to desired "pixelated" resolution
        // canvas.width = this.size;
        // canvas.height = this.size;
        canvas.width = this.maxSize;
        canvas.height = this.maxSize;

        // Draw scaled-down version of image
        ctx.drawImage(img, 0, 0, this.maxSize, this.maxSize);

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, this.maxSize, this.maxSize,{willReadFrequently: true}).data;

        const colorArray = [];

        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];

            // Convert to hex or any format you want
            const hex = `rgba(${r}, ${g}, ${b}, ${1})`;
            colorArray.push(hex);

            // OR: Convert to hue (optional)
            // const hue = rgbToHue(r, g, b);
            // colorArray.push(hue);
        }
        return colorArray
    }
}

customElements.define('moz-frame', MozFrame);