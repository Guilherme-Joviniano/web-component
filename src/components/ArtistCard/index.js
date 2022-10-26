'use-strict';

customElements.define('artist-card',
    class extends HTMLElement {
        constructor() {
            super()
            this.shadow = this.attachShadow({
                mode: 'open'
            })

            this.initDefaultValues();
        }

        initDefaultValues() {
            this.cardImage = ''
            this.name = ''
            this.views = ''
            this.rootURL = ''
        }
        connectedCallback() {
            this.shadow.appendChild(this.component())
            this.shadow.appendChild(this.styles())
        }

        static get observedAttributes() {
            return ['nome', 'bg-image-url', 'views', 'artist-url']
        }

        attributeChangedCallback(nameAttr, _oldValue, newValue) {
            if (nameAttr === 'nome') this.name = newValue
            else if (nameAttr === 'bg-image-url') this.cardImage = newValue
            else if (nameAttr === 'views') this.views = newValue
            else if (nameAttr === 'artist-url') this.rootURL = newValue
        }

        styles() {
            const style = document.createElement('style')
            style.textContent = `
                .card-wrapper {
                    display: flex;
                    flex-direction: column;
                    width: 230px;
                    min-height: 345px;
                    align-items: center;
                    gap: 20px;
                    justify-content: space-around;
                }
                .artist__image {
                    width: 230px;
                    height: 250px;
                    background: url(${this.cardImage});
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .artist__name {
                    text-align: center;
                    font-weight: 600;
                    font-size: 24px;
                    color: #000;
                }
                .total__views {
                    font-weight: 300;
                    font-size: 15px;
                }
                .artist__data {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                .artist-link-wrapper {
                    display: flex;
                    width: 100%;
                    justify-content: end;
                }
   
                .artist-link-wrapper a {
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 18px;
                    color: #000000;
                }
            `
            return style
        }
        component() {
            const component = document.createElement('div')

            component.innerHTML = `
            <div class="artist__image"></div>
            <div class="artist__data">
                <span class="artist__name"> ${this.name} </span>
                <span class="total__views"> ${this.views} </span>
                <div class="artist-link-wrapper">
                    <a href=${this.rootURL}>Saiba Mais &#8594</a>
                </div>
            </div>
            `
            component.classList.add('card-wrapper');

            return component;
        }
    }
)