function typeChange() {

    let inputType, tp, img, iframe, txtarea;
    const sel = document.getElementById('type').value;
    const tag = document.getElementById('log');
    const div = document.querySelector('#newPubOpt');
    const tit = document.querySelector('#title');
    const siz = document.querySelector('#size');
    const lmd = document.querySelector('#date_created');
    const pth = document.querySelector('#path');
    
    const addListener = (par) => {
        inputType.addEventListener('change', () => {
            if (inputType.files && inputType.files[0]) {
                var file = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                tit.value=file.name;
                siz.value=file.size;
                lmd.value=fromaData(file.lastModified);
                pth.value='';
                
                switch (par) {
                    case 'imm':
                        reader.addEventListener('load', function () {
                            img.src = reader.result;
                            img.alt = 'tmp_image';                
                        });
                        reader.readAsDataURL(file);
                        break;
                    case 'pdf':
                    case 'svg':    
                        reader.addEventListener('load', function () {
                        iframe.src = reader.result;
                       // pth.value=prompt('path del file da selezionare');
                        });
                        reader.readAsDataURL(file);
                        break;
                    case 'html':    
                        reader.addEventListener('load', function () {
                            iframe.src = reader.result;
//                            pth.value=prompt('path del file da selezionare');
                        });
                        reader.readAsDataURL(file);
                        break;

                    case 'txt':
                        reader.addEventListener('load', function (e) {
                            txtarea.textContent = e.target.result;
                        });
                       //reader.readAsBinaryString(file);
                       reader.readAsText(file);
                        break;
                }
                //traccia la percentuale di file caricato in  memoria
                reader.addEventListener('progress', (event) => {
                    if (event.loaded && event.total) {
                      const percent = (event.loaded / event.total) * 100;
                      console.log(`Progress: ${Math.round(percent)}`);
                    }
                });
                        
            }
        });
    };

    if (document.querySelector('#AllegaFile')) {
        div.removeChild(div.querySelector('#AllegaFile'));
    }
    if (document.querySelector('#tallegato')) {
        tag.removeChild(tag.querySelector('#tallegato'));
    }

    if (sel) {
        inputType = document.createElement('input');
        inputType.id = 'AllegaFile';
        inputType.name = 'allegato';
        inputType.type = 'file';
        inputType.path = 'path';// attenzione qui
        inputType.classList.add('form-control-file');
        inputType.classList.add('form-control-lg');

        switch (sel) {
           // case 'pdf':
            case 'imm':
                inputType.accept = 'image/jpeg,image/jpg,image/gif,image/png';
                
                img = document.createElement('img');
                img.classList.add('avatar');
                img.id = 'tallegato';
                img.src='';
                img.width = 300;
                img.height=300;
                tag.appendChild(img);
                break;
            case 'pdf':
            case 'svg':
                inputType.accept = '.pdf, .svg';
                
                iframe = document.createElement('iframe');
                iframe.id = 'tallegato';
                iframe.width = 300;
                iframe.heigth = 400;
                tag.appendChild(iframe);
                break;
            case 'html':
                inputType.accept = '.html,.htm';

                iframe = document.createElement('iframe');
                iframe.id = 'tallegato';
                iframe.width = 300;
                iframe.heigth = 400;
                tag.appendChild(iframe);                    
                break;
            case 'txt':
            //case 'doc':
                inputType.accept = '.txt,.csv,.bat';
                
                txtarea = document.createElement('textarea');
                txtarea.id = 'tallegato';
                txtarea.rows = 5;
                txtarea.cols = 50;
                tag.appendChild(txtarea);
                break;
            case 'vid':
                inputType.accept = '.mp4,.mp3,.mov';
                tp = 'vga';
                break;
            default:
                break;
        }
        addListener(sel);
        div.appendChild(inputType);
    };
}

function fromaData(dt){
    //questo è il  modo più chiaro che ho trovato
    //per formattare una data con javascript
    const d = new Date(dt); // new Date(file.lastModified);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let result = `${ye}-${mo}-${da}`;
    return result;
}

function checkConfirm(){
    return confirm('Are you sure?');
}

function simulateButton(){
    
    var frm=document.getElementById('delcom');
    var btn=document.createElement('button');
    btn.type('submit()');
    frm.appendChild(btn);
}


//function handleFileSelect(evt) {
//    // consente di selezionare più files in una volta e li mostra in una lista
//    var files = evt.target.files; // FileList object
//
//    // files is a FileList of File objects. List some properties.
//    var output = [];
//    for (var i = 0, f; f = files[i]; i++) {
//      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                  f.size, ' bytes, last modified: ',
//                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                  '</li>');
//    }
//    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
//    //questo elemento va messo fuori dalla funzione
//  //document.getElementById('files').addEventListener('change', handleFileSelect, false);
//  }

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function previewFile() {

   let  ele;
    
    const sel = document.getElementById('type').value;
    const fle = document.getElementById("file").value;
    const tag = document.getElementById("demo");

    switch(sel){
        case 'imm':
           ele = document.createElement('img');
           ele.id='prevfile';
           ele.src=fle;
           ele.class="d-block img-responsive";
           ele.width="325";
           ele.preserveAspectRatio="xMidYMid slice";
           tag.appendChild(ele);
           break;
        case 'txt':
        case 'html':
        case 'pdf':
            ele = document.createElement('iframe');
            ele.id='prevfile';
            ele.width = 300;
            ele.heigth = 2000;
            ele.src=fle;
            tag.appendChild(ele);
            break;    
    }
}

function prevAvatar(){
    var preview = document.getElementById('avatar');
    var miniPrev = document.getElementById('miniavatar');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        preview.alt='avchanged';
        miniPrev.src=reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function alertsomething(message){
    return alert(message);
    //return alert("you must be logged in to perform this action!");
}

var test = document.getElementByName('test');
test.addEventListener('click', alertsomething);


function add_input_comment_box(php,p){
  let frm,input,btnSave,btnUndo;
   
  const pth = document.querySelector('#new_comment');
  var paragrafo= document.createElement("div");
    
  frm=document.createElement("form");
 // frm.classList.add('form-inline');
  frm.classList.add('mt-2');
  frm.classList.add('mt-ms-0');
  frm.action="/comm/"+php+"/"+p+"/newcom";
  frm.method="POST";
  
  btnSave=document.createElement("button");
  btnSave.innerHTML = "Save <i class='far fa-save'></>";
  btnSave.type="submit";
  btnSave.classList.add('btn');
  btnSave.classList.add('btn-sm');
  btnSave.classList.add('btn-success');
  btnSave.addEventListener('click',function(){
      //chiama funzione interna
      //salva();

  });
 
  btnUndo=document.createElement("button");
  btnUndo.innerHTML = "Undo <i class='fas fa-undo-alt'></i>";
  btnUndo.classList.add('btn');
  btnUndo.classList.add('btn-sm');
  btnUndo.classList.add('btn-danger');
  btnUndo.addEventListener('click',function(){
      //chiama funzione esterna
      //alertsomething();
      input.value='';
  });

  input=document.createElement('input');
  input.id="input";
  input.type="text";
  input.name="comment";
  input.classList.add('form-control');
  input.classList.add('input-md');
  input.placeholder="inserisci il tuo commento";
  
  paragrafo.appendChild(frm);
  frm.appendChild(input);
  frm.appendChild(btnSave);
  frm.appendChild(btnUndo);
  pth.appendChild(paragrafo);

//funzione interna
//const salva=()=>{
//   alert('Salvato');
//};
}

//var add_comment = document.getElementByName('add_comment');
//add_comment.addEventListener('click', add_input_comment_box());
function edit_comment_box(php,id,cmm,p){
  let frm,hinput,input,btnSave,btnUndo;
   
  const pth = document.querySelector('#new_comment');
  var paragrafo= document.createElement("div");
  //cmor=cmm;  
  frm=document.createElement("form");
 // frm.classList.add('form-inline');
  frm.classList.add('mt-2');
  frm.classList.add('mt-ms-0');
  frm.action="/comm/"+id+"/"+p+"/update";
  frm.method="POST";
  
  btnSave=document.createElement("button");
  btnSave.innerHTML = "Store <i class='far fa-save'></>";
  btnSave.type="submit";
  btnSave.classList.add('btn');
  btnSave.classList.add('btn-sm');
  btnSave.classList.add('btn-success');
  btnSave.addEventListener('click',function(){});
 
  btnUndo=document.createElement("button");
  btnUndo.innerHTML = "Undo <i class='fas fa-undo-alt'></i>";
  btnUndo.classList.add('btn');
  btnUndo.classList.add('btn-sm');
  btnUndo.classList.add('btn-danger');
  btnUndo.addEventListener('click',function(){
      input.value='';
  });

  input=document.createElement('input');
  input.id="input";
  input.type="text";
  input.name="comment";
  input.value=cmm;
  input.classList.add('form-control');
  input.classList.add('input-md');
  
  hinput=document.createElement('input');
  hinput.type='hidden';
  hinput.name='cpub';
  hinput.value=php;
  
  paragrafo.appendChild(frm);
  frm.appendChild(input);
  frm.appendChild(hinput);
  frm.appendChild(btnSave);
  frm.appendChild(btnUndo);
  pth.appendChild(paragrafo);
}


