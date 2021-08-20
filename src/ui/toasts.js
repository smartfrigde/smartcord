const toastCSS = `.sc-toasts {
    position: fixed;
    display: flex;
    top: 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
    z-index: 4000;
  }
  @keyframes sc-toast-up {
    from {
        transform: translateY(0);
        opacity: 0;
    }
  }
  .sc-toast {
    animation: sc-toast-up 300ms ease;
    transform: translateY(-10px);
    background: var(--background-floating);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2);
    font-weight: 500;
    color: #fff;
    user-select: text;
    font-size: 14px;
    opacity: 1;
    margin-top: 10px;
    pointer-events: none;
    user-select: none;
    text-align: center;
  }
  @keyframes sc-toast-down {
    to {
        transform: translateY(0px);
        opacity: 0;
    }
  }
  .sc-toast.closing {
    animation: sc-toast-down 200ms ease;
    animation-fill-mode: forwards;
    opacity: 1;
    transform: translateY(-10px);
  }
  .sc-toast.icon {
    padding-left: 30px;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 6px 50%;
  }
  .sc-toast.toast-info {
    background-color: #4a90e2;
  }
  .sc-toast.toast-info.icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAscjQscjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAscGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTIsckM2LjQ4IDIsciA2LjQ4IDIscTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIscTIscnptMSAxNWgtMnYtNmgydjZ6bTAtOGgtMlY3aDJ2MnoiLz48L3N2Zz4=);
  }
  .sc-toast.toast-success {
    background-color: #43b581;
  }
  .sc-toast.toast-success.icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAscjQscjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAscGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTIsckM2LjQ4IDIsciA2LjQ4IDIscTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIscTIscnptLTIscTVsLTUtNSAxLjQxLTEuNDFMMTAscTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4=);
  }
  .sc-toast.toast-danger,
  .sc-toast.toast-error {
    background-color: #f04747;
  }
  .sc-toast.toast-danger.icon,
  .sc-toast.toast-error.icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAscjQscjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcscTAscTAscTAscTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTUscTMuNTlMMTUuNTkscTcscTIscTMuNDEgOC40MSAxNyA3IDE1LjU5IDEwLjU5IDEyIDcgOC40MSA4LjQxIDcscTIscTAuNTkscTUuNTkgNyAxNyA4LjQxIDEzLjQxIDEyIDE3IDE1LjU5eiIvPiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+);
  }
  .sc-toast.toast-warning,
  .sc-toast.toast-warn {
    background-color: #FFA600;
    color: white;
  }
  .sc-toast.toast-warning.icon,
  .sc-toast.toast-warn.icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAscjQscjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAscGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMSAyMWgyMkwxMiAyIDEscjF6bTEyLTNoLTJ2LTJoMnYyem0wLTRoLTJ2LTRoMnY0eiIvPjwvc3ZnPg==);
  }`;
  
  const styleSheet = document.createElement('style'); // Add CSS as stylesheet
  styleSheet.textContent = toastCSS;
  document.head.appendChild(styleSheet);
  
  export default (text, options = {}) => {
    if (!document.querySelector('.sc-toasts')) {
      const container = document.querySelector('.sidebar-2K8pFh + div') || null;
  
      const memberlist = container ? container.querySelector('.membersWrap-2h-GB4') : null;
  
      const form = container ? container.querySelector('form') : null;
  
      const left = container ? container.getBoundingClientRect().left : 310;
      const right = memberlist ? memberlist.getBoundingClientRect().left : 0;
      const width = right ? right - container.getBoundingClientRect().left : window.innerWidth - left - 240;
      const bottom = form ? form.offsetHeight : 80;
  
      const toastWrapper = document.createElement('div');
  
      toastWrapper.classList.add('sc-toasts');
  
      toastWrapper.style.setProperty('left', left + 'px');
      toastWrapper.style.setProperty('width', width + 'px');
      toastWrapper.style.setProperty('bottom', bottom + 'px');
  
      document.querySelector('#app-mount').appendChild(toastWrapper);
    }
  
    const {type = '', icon = true, timeout = 3000} = options;
  
    const toastElem = document.createElement('div');
    toastElem.classList.add('sc-toast');
  
    if (type) toastElem.classList.add('toast-' + type);
    if (type && icon) toastElem.classList.add('icon');
  
    toastElem.textContent = text;
  
    document.querySelector('.sc-toasts').appendChild(toastElem);
  
    let closeFn = () => {
      toastElem.classList.add('closing');
      setTimeout(() => {
          toastElem.remove();
          if (!document.querySelectorAll('.sc-toasts .sc-toast').length) document.querySelector('.sc-toasts').remove();
      }, 300);
    };
  
    setTimeout(closeFn, timeout);
  
    return { toastElem, closeFn };
  };