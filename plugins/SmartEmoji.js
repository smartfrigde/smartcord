/*globals EDApi, monkeyPatch, findModule, _ */
const Plugin = require("../plugin"),
    { findModuleByDisplayName, React: { createElement: e, Component, createRef, Fragment } } = EDApi;

module.exports = new Plugin({
    name: "Server Emojis",
    author: "jakuski",
    description: "View server emojis and their API forms using the guild popout.",
    color: "#ffe30f",
    load: function() {
        this._cssEl = document.createElement("style");
        this._cssEl.innerHTML = this.css;
        document.head.appendChild(this._cssEl);

        const GuildContextMenu = findModuleByDisplayName("GuildContextMenu");
        const ContextMenuGroup = findModuleByDisplayName("MenuGroup");
        const ContextMenuItem = findModuleByDisplayName("MenuItem");

        monkeyPatch(GuildContextMenu.prototype, "render", data => {
            const render = data.callOriginalMethod();
            const guild = data.thisObject.props.guild;

            render.props.children.splice(3, 0,
                e(ContextMenuGroup, null,
                    e(ContextMenuItem, {
                        label: "View Server Emojis", action: () => {
                            findModule("push").push(module.exports.components.EmojiModal, { guild });
                            findModule("closeContextMenu").closeContextMenu();
                        }
                    })
                ));

            return render;
        });
    },
    unload: function() {
        this._cssEl.remove();
        findModuleByDisplayName("GuildContextMenu").prototype.render.unpatch();
    },
    getAPIEmojiString(emoji) {
        return `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`;
    },
    components: {
        DiscordComponents: {
            Modal: findModuleByDisplayName("Modal"),
            Title: findModuleByDisplayName("FormTitle"),
            Tooltip: (Tooltip => {
                return props => {
                    const children = tProps => e("div", Object.assign({ "data-role": "tooltip-wrapper" }, tProps), props.children);
                    return e(Tooltip, props, children);
                }
            })(EDApi.findModuleByDisplayName("Tooltip")),
            Text: findModuleByDisplayName("FormText"),
        },
        cs: {
            emojiRow: `${findModule("flex").flex} ${findModule("flex").alignCenter} ${findModule("flex").justifyBetween} ${findModule("restoreButton").card} ${findModule("emojiImage").emojiRow} ${findModule("markup").markup} se-pointer`,
            emojiRowText: findModule("emojiImage").emojiUploader,
            modalContent: "se-modal-content",
            emojiImage: findModule("emojiImage").emojiImage,
            flex: findModule("flex").flex,
            center: `${findModule("flex").flex} ${findModule("flex").alignCenter}`,
            code: "inline se-zindex",
            pointer: "se-pointer",
            margTop: "se-marg-top",
            link: "se-link",
            div: "se-horiz-div"
        },
        EmojiModal: class extends Component {
            constructor(props) {
                super(props);

                const emojis = findModule("getGuildEmoji").getGuildEmoji(props.guild.id);
                this.state = {
                    standardEmojis: emojis.filter(emoji => emoji.animated === false),
                    animatedEmojis: emojis.filter(emoji => emoji.animated === true),
                    truncatedGuildName: _.truncate(props.guild.name, { length: 50 })
                };

                this.animRef = createRef();
                this.standRef = createRef();
            }
            scrollIntoView(which) {
                this[which].current.scrollIntoView({ block: "center", behavior: "smooth" });
            }
            render() {
                const { DiscordComponents: { Modal, Title }, cs } = module.exports.components;

                return e(Modal, { size: Modal.Sizes.MEDIUM },
                    e(Modal.Header, null,
                        e(Title, { tag: "h4" }, `Emojis for ${this.state.truncatedGuildName}`,
                            e("br"),
                            e("div", { className: cs.flex },
                                e("div", { className: cs.link, onClick: this.scrollIntoView.bind(this, "standRef") }, "Standard"),
                                e("div", { className: cs.div }),
                                e("div", { className: cs.link, onClick: this.scrollIntoView.bind(this, "animRef") }, "Animated")
                            )
                        ),
                        e(Modal.CloseButton, { onClick: this.props.onClose })
                    ),
                    e(Modal.Content, { className: cs.modalContent },
                        e("div", { ref: this.standRef },
                            e(Title, { className: cs.margTop }, "Standard Emojis - ", this.state.standardEmojis.length === 0 ? "None :(" : this.state.standardEmojis.length)
                        ),
                        this.state.standardEmojis.map(emoji => e(module.exports.components.EmojiRow, { emoji })),

                        e("div", { ref: this.animRef },
                            e(Title, { className: cs.margTop }, "Animated Emojis - ", this.state.standardEmojis.length === 0 ? "None :(" : this.state.standardEmojis.length)
                        ),
                        this.state.animatedEmojis.map(emoji => e(module.exports.components.EmojiRow, { emoji }))
                    )
                );
            }
        },
        EmojiRow(props) {
            const { cs, DiscordComponents: { Tooltip, Text } } = module.exports.components;
            const copyEmote = () => window.DiscordNative.clipboard.copy(module.exports.getAPIEmojiString(props.emoji));

            return e(Fragment, null,
                e(Tooltip, { text: "Click to copy API format", position: "bottom", color: "black", delay: 500 },
                    e("div", { className: cs.emojiRow, onClick: copyEmote },
                        e("div", { className: cs.center },
                            e("div", { className: cs.emojiImage, style: { backgroundImage: `url(${props.emoji.url || `https://cdn.discordapp.com/emojis/${props.emoji.id}.png?v=1`})` } }), // this alternate is because some emoji objects are returned without a URL for some fucking reason.
                            e("div", { className: cs.emojiRowText }, e(Text, { className: cs.pointer }, props.emoji.name))
                        ),
                        e("code", { className: cs.code }, module.exports.getAPIEmojiString(props.emoji))
                    )
                )
            );
        },
    },
    css: "/*Styles for ServerEmojis*/\n.se-modal-content{margin-bottom: 12px; padding-left: 25px; padding-right: 20px}.se-pointer{cursor:pointer}.se-zindex{z-index:1}.se-marg-top{margin-top:10px}.se-link{font-size:12px;opacity:0.6;cursor:pointer;}.se-link:hover{opacity:1;text-decoration:underline}.se-horiz-div{margin: 5px 8px; width: 2px; background-color: rgba(255, 255, 255, 0.1)}"
});