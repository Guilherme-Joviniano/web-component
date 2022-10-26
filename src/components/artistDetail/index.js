'use-strict';

customElements.define('artist-detail',
    class extends HTMLElement {
        constructor() {
            super()
            this.shadow = this.attachShadow({
                mode: 'open'
            })

            this.initDefaultValues();
        }

        initDefaultValues() {
            this.name = ''
            this.image = ''
            this.topSongs = ['teste', 'teste']
            this.allSongs = []
            this.genres = []
        }
        connectedCallback() {
            this.topSongs = JSON.parse(this.attributes.topSongs.value);
            this.shadow.appendChild(this.component())
            this.shadow.appendChild(this.styles())
        }

        static get observedAttributes() {
            return ['name', 'art-image', 'views', 'top-songs', 'all-songs', 'genre']
        }

        attributeChangedCallback(nameAttr, _oldValue, newValue) {
            if (nameAttr === 'name') this.name = newValue
            else if (nameAttr === 'art-image') this.image = newValue
            else if (nameAttr === 'views') this.views = newValue
            else if (nameAttr === 'genres') this.genres = newValue
        }

        styles() {
            const style = document.createElement('style')
            style.textContent = `
                .artist__detail {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    background: #313030;
                }
                .details {
                    width: 1200px;
                    height: 400px;
                    display: flex;
                    flex-direction: column;
                }
                .picture {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: url(${this.image});
                    border: 2px solid #DB00FF;
                }
                .name {
                    font-size: 32px;
                    color: #FFF;
                }
                .views {
                    font-weight: 300;
                    font-size: 16px;
                    color: #FFF;
                }
                .lyrics {
                    display: flex;
                    align-items: center;
                }
                ul {
                    list-style: none;
                }
                .song {
                    font-weight: 700;
                    font-size: 16px;
                }
            `
            return style
        }
        component() {
            const component = document.createElement('div')
            console.log(this.topSongs);
            component.innerHTML = `
            <div class="artist__detail">
                <div class="details">
                    <div class="picture"></div>
                    <h2 class="name">${this.name}</h2>
                    <span class="views">${this.views}</span>
                    <div class="genre">${this.genres.join(' ')}</div>
                </div>
                <div class="lyrics">
                    <ul class="topSongs">
                        <li>${this.topSongs.join('</li><li>')}</li>
                    </ul>
                    <ul class="allSongs">
                        <li>${this.allSongs.join('</li><li>')}</li>
                    </ul>    
                </div>
            </div>
            `
            component.classList.add('artist__detail');

            return component;
        }
    }
)