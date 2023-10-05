const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const createChunks = (file, cSize /* cSize should be byte 1024*1 = 1KB */ ) => {
    let startPointer = 0;
    let endPointer = file.size;
    let chunks = [];
    while (startPointer < endPointer) {
        let newStartPointer = startPointer + cSize;
        chunks.push(file.slice(startPointer, newStartPointer));
        startPointer = newStartPointer;
    }
    return chunks;
}

const b64encode = (chunk, filename) => {
    let files = new File([chunk], filename);
    let reader = new FileReader();
    reader.readAsDataURL(files);
    return reader
}

let file;
let chunks;

const handleImage = async(e) => {
    const f = e.target.files[0];
    file = f;
    const chunk = createChunks(f, 100000);
    chunks = chunk;
    //const base64 = b64encode(chunk[0], f.name)
    //base64.onload = () => {
    //    console.log(base64.result)
    //}
}

const upload_chunks = async() => {
    for (let i = 0; i < chunks.length; ++i) {
        const base64 = b64encode(chunks[i], file.name)
        base64.onload = () => {
            fetch('http://127.0.0.1:8000/app/chunk_file', {
                    method: 'POST',
                    body: JSON.stringify({
                        data: base64.result,
                        filename: file.name,
                        username: "utsav",
                        chunk_number: i
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        await sleep(1500)
    }
}

const upload = () => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        if (reader.result) {
            fetch('http://127.0.0.1:8000/app/file', {
                    method: 'POST',
                    body: JSON.stringify({
                        data: reader.result,
                        filename: file.name,
                        username: "utsav"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data.status)
                })
        }
    };
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };

}

const inp = document.getElementById('inp').addEventListener('change', handleImage, false)
const btn = document.getElementById("btn");

btn.addEventListener("click", upload_chunks);