"use-strict";

customElements.define(
  "artist-detail",
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({
        mode: "open",
      });

      this.initDefaultValues();
    }

    initDefaultValues() {
      this._data = 0;
      this._topSongs = 0;
      this._allSongs = 0;

      this.name = "";
      this.image = "";
      this.genres = [];
    }

    connectedCallback() {
      this.topSongs = this.data[0].item;
      this.allSongs = this.data[1].item;
      this.shadow.appendChild(this.component());
      this.shadow.appendChild(this.styles());

      this.shadowRoot.querySelectorAll(".song").forEach((song) => {
        song.addEventListener("click", () => {
          if (!song.childNodes[2]) {
            localStorage.setItem("songName", song.childNodes[1].textContent);
            location.href = "/lyric.html";
            return;
          }
          localStorage.setItem("songName", song.childNodes[2].textContent);

          location.href = "/lyric.html";
          return;
        });
      });
    }

    set allSongs(newValue) {
      let data = [];
      newValue.forEach(({ desc }) => {
        data.push(desc);
      });
      this._allSongs = data;
    }

    set topSongs(newValue) {
      let data = [];
      newValue.slice(0, 6).forEach(({ desc }) => {
        data.push(desc);
      });
      this._topSongs = data;
    }

    get topSongs() {
      return this._topSongs;
    }
    get allSongs() {
      return this._allSongs;
    }

    static get observedAttributes() {
      return ["name", "art-image", "views", "genre", "data"];
    }

    get data() {
      return this._data;
    }

    set data(newValue) {
      this._data = newValue;
    }

    attributeChangedCallback(nameAttr, _oldValue, newValue) {
      if (nameAttr === "name") this.name = newValue;
      else if (nameAttr === "art-image") this.image = newValue;
      else if (nameAttr === "views") this.views = newValue;
      else if (nameAttr === "genres") this.genres = newValue;
    }

    styles() {
      const style = document.createElement("style");
      style.textContent = `
            @keyframes show {
                0% {
                    transform: translateY(-100px)
                }
                100% {
                    transform: translateY(0px)
                }
            }
            
                /* width */
                ::-webkit-scrollbar {
                    width: 10px;
                }
                
                /* Track */
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                
                /* Handle */
                ::-webkit-scrollbar-thumb {
                    background: #db00ff;
                }
                
                /* Handle on hover */
                ::-webkit-scrollbar-thumb:hover {
                    background: #470152;
                }
                
                .artist__detail {
                    animation: show     ;
                    padding: 10px;
                    border-radius: 12px;
                    display: flex;
                    width: 100%;    
                    background: #313030;
                }
                .details {
                    display: flex;
                    flex-direction: column;
                }
                .picture {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: url(${this.image});
                    background-size: cover;
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
                    align-items:    ;
                }
                .allSongs {
                    max-height: 400px;
                    overflow-y: scroll;
                }
                ul {
                    list-style: none;
                }
                .song {
                    padding-left: 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    color: #FFF;
                    width: 300px;
                    height: 40px;
                    display:flex;
                    gap: 20px;
                    align-items: center;
                    font-weight: 400;
                    font-size: 16px;
                    transition: 400ms all ease;
                }
                .song:hover {
                    background: hsla(0,0%,100%,.3)
                }
            `;
      return style;
    }
    component() {
      const component = document.createElement("div");
      component.innerHTML = `
            <div class="artist__detail">
                <div class="details">
                    <div class="picture"></div>
                    <h2 class="name">${this.name}</h2>
                    <span class="views">${this.views}</span>
                    <div class="genre">${this.genres.join(" ")}</div>
                </div>
                <div class="lyrics">
                    <ul class="topSongs">
                        <li class="song">
                        <div>&#9658</div> ${this.topSongs.join(
                          '</li> <li class="song"><div> &#9658</div> '
                        )}</li>
                    </ul>
                    <ul class="allSongs">
                        <li class="song">
                        <div>&#9658</div> ${this.allSongs.join(
                          '</li><li class="song"><div>&#9658</div> '
                        )}</li>
                    </ul>    
                </div>
            </div>
            `;
      component.classList.add("artist__detail");

      return component;
    }
  }
);
