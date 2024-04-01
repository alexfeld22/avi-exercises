

const btn = document.getElementsByTagName('button')[0];
btn.addEventListener('click',changeBackgroundColor);

function changeBackgroundColor(){
    const userColor = document.getElementsByTagName('input')[0].value;
    if(isValidHexColor(userColor)){
        document.body.style.backgroundColor = userColor;
        return;
    }
    
    window.alert(`${userColor} is not a correct HEX color`);
    return;
}

 function isValidHexColor(color) {
    const regex = /^#([0-9A-F]{3}){1,2}$/i;
    return regex.test(color);
}