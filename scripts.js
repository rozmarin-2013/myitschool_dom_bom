function Message(msg, type) {

    if (!msg) return;

    function createElement(msg, classElm) {

        let elm = document.createElement('div');
        elm.className = 'msg';

        if(classElm) {
            elm.classList.add(`msg-${classElm}`);
        }

        elm.innerHTML = msg;

        return elm;
    }

    this.msg = msg;
    this.type = type;
    this.elm = createElement(this.msg, this.type);
    this.parentNode = document.body;
    this.delay = 5000;

    this.showMessage = function() {
        let elm = this.elm;
        this.parentNode.append(elm);
        setTimeout(() => elm.remove(), this.delay)
    }
}

let messageError = new Message('Сообщение об ошибке', 'error');
messageError.showMessage();

let messageAlert = new Message('Привет Мир!', 'alert');
messageAlert.showMessage();

let messageDefault = new Message('Ваше сообщение отправлено', 'success');
messageDefault.showMessage();

function getParamsUrl(url) {
    if (!url) return null;

    let result = [],
        regexType = /type=([^&]*)/,
        regexMsg = /msg=([^&]*)/;

    result = {
        type: url.match(regexType)[1],
        msg: url.match(regexMsg)[1]
    }

    return result;
}

const typeMsg = [
    'alert',
    'error',
    'success'
];

function checkParams(params) {
    if(!params) return false;

    if(typeMsg.indexOf(params['type']) == -1) {
        return false;
    }

    if(!params['msg']) {
        return false;
    }

    return true;
}

function getMessageByLink() {
    let params = getParamsUrl(location.search.replace('?', ''));

    if(checkParams(params)) {
        let message = new Message(params['msg'], params['type']);
        message.showMessage();
    }
}

getMessageByLink();