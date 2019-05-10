export function readBlobAsUrl(blob){
    return new Promise((resolve, reject)=>{
        if (blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result)
            };
            reader.onerror = (e)=> {reject(e)};
            reader.readAsDataURL(blob);

        }
        else reject("No file has been selected");
    });
}

export function readBlobAsText(buffer){
    return new Promise((resolve, reject)=>{
        if (buffer) {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result)
            };


            reader.onerror = (e)=> {reject(e)};
            reader.readAsText(buffer,'utf-8');

        }
        else reject("No file has been selected");
    });
}


export function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
}

export function log(msg) {
    console.log(msg)
}
export function logError(msg) {
    console.error(msg)
}
