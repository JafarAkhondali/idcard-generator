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

export function readBlobAsArrayBuffer(buffer){
    return new Promise((resolve, reject)=>{
        if (buffer) {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result)
            };
            reader.onerror = (e)=> {reject(e)};
            reader.readAsDataURL(buffer);

        }
        else reject("No file has been selected");
    });
}
