let container = document.querySelector('.modal-content');
let qrimg = document.querySelector('.qr_code img');
let descargar = document.querySelector('#descargar');
let img = document.querySelector('#imagen');
let cerrar = document.querySelector('#cerrar');

function generar(data) {
    let loader = document.querySelector(".loaderActivo");
    qrimg.style.display ='none';
    setTimeout(() => {        
        qrimg.style.display ='flex';
        loader.style.display = 'none';
        qrimg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}/view/${data}`;
        console.log(window.location.href);
    }, 4000);
    setTimeout(() => {
        console.log('Se esta ejecutando la crear');
        loader.style.opacity = 0;
    }, 2600);
    cerrar.addEventListener('click', ()=>{
        loader.style.display = 'flex';
        loader.style.opacity = 1;
    });
}

descargar.addEventListener('click', () => {
    let imgPath = img.getAttribute('src');
    let nombreArchivo = getFileName(imgPath);
    saveAs(imgPath, nombreArchivo);
})

function getFileName(str) {
    return str.substr(str.lastIndexOf(''))
}