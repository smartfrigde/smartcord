import * as webpackStuff from '../modules/webpackModules.js'
/**
     * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
     * @param {string} title - title of the modal
     * @param {(string|ReactElement|Array<string|ReactElement>)} children - a single or mixed array of react elements and strings. Every string is wrapped in Discord's `Markdown` component so strings will show and render properly.
     * @param {object} [options] - options to modify the modal
     * @param {boolean} [options.danger=false] - whether the main button should be red or not
     * @param {string} [options.confirmText=Okay] - text for the confirmation/submit button
     * @param {string} [options.cancelText=Cancel] - text for the cancel button
     * @param {callable} [options.onConfirm=NOOP] - callback to occur when clicking the submit button
     * @param {callable} [options.onCancel=NOOP] - callback to occur when clicking the cancel button
     * @param {string} [options.key] - key used to identify the modal. If not provided, one is generated and returned
     * @returns {string} - the key used for this modal
     */
export function showConfirmationModal(title, content, options = {}) {
    const ModalActions = webpackStuff.findByProps('openModal', 'updateModal');
    const Markdown = webpackStuff.findByDisplayName('Markdown');
    const ConfirmationModal = webpackStuff.findByDisplayName('ConfirmModal');
    if (!ModalActions || !ConfirmationModal || !Markdown) return window.alert(content);

    const emptyFunction = () => {};
    const {onConfirm = emptyFunction, onCancel = emptyFunction, confirmText = 'Okay', cancelText = 'Cancel', danger = false, key = undefined} = options;

    if (!Array.isArray(content)) content = [content];
    content = content.map(c => typeof(c) === 'string' ? webpackStuff.findByProps('createElement').createElement(Markdown, null, c) : c);
    return ModalActions.openModal(props => {
        return webpackStuff.findByProps('createElement').createElement(ConfirmationModal, Object.assign({
            header: title,
            red: danger,
            confirmText: confirmText,
            cancelText: cancelText,
            onConfirm: onConfirm,
            onCancel: onCancel
        }, props), content);
    }, {modalKey: key});
}

/**
     * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
     * @param {string} title - title of the modal
     * @param {(string|ReactElement|Array<string|ReactElement>)} children - a single or mixed array of react elements and strings. Every string is wrapped in Discord's `Markdown` component so strings will show and render properly.
     * @param {object} [options] - options to modify the modal
     * @param {boolean} [options.danger=false] - whether the main button should be red or not
     * @param {string} [options.confirmText=Okay] - text for the confirmation/submit button
     * @param {callable} [options.onConfirm=NOOP] - callback to occur when clicking the submit button
     * @param {string} [options.key] - key used to identify the modal. If not provided, one is generated and returned
     * @returns {string} - the key used for this modal
     */
 export function showPopup(title, content, options = {}) {
    const ModalActions = webpackStuff.findByProps('openModal', 'updateModal');
    const Markdown = webpackStuff.findByDisplayName('Markdown');
    const ConfirmationModal = webpackStuff.findByDisplayName('ConfirmModal');
    if (!ModalActions || !ConfirmationModal || !Markdown) return window.alert(content);

    const emptyFunction = () => {};
    const {onConfirm = emptyFunction, confirmText = 'Okay', danger = false, key = undefined} = options;

    if (!Array.isArray(content)) content = [content];
    content = content.map(c => typeof(c) === 'string' ? webpackStuff.findByProps('createElement').createElement(Markdown, null, c) : c);
    return ModalActions.openModal(props => {
        return webpackStuff.findByProps('createElement').createElement(ConfirmationModal, Object.assign({
            header: title,
            red: danger,
            confirmText: confirmText,
            onConfirm: onConfirm,
        }, props), content);
    }, {modalKey: key});
}