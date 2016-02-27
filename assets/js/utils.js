function getRootElementFontSize () {
    return parseFloat(getComputedStyle(
        document.documentElement).fontSize);
}

function rems2px(value) {
    return value * getRootElementFontSize();
}

export default rems2px;
