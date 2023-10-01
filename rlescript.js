let args = process.argv
let commandType = args[2];
let fs = require('fs');

if (commandType == 'code') {
    fs.readFile(args[3], (error, data) => {
        data = data.toString();
        result = '';
        for (let i = 0; i < data.length;) {
            n = 1;
            while(data.charAt(i) == data.charAt(i + n))
                n++;
            let count = n;
            if (count > 3 || data.charAt(i) == '#') {
                while(count > 0) {
                    result += '#' + String.fromCharCode(Math.min(255,count)) + data.charAt(i);
                    count -= 255;
                }
            }
            else result += data.charAt(i).repeat(n);
            i += n;
        }
        fs.writeFile(args[4], result, (err) => 
        { 
            if (err) console.err();
        })
    })
}
else if (commandType == 'decode') {
    let fs = require('fs');
    fs.readFile(args[3], (error, data) => {
        data = data.toString();
        result = '';
        for (let i = 0; i < data.length;) {
            if (data.charAt(i) == '#') {
                result += data[i + 2].repeat(data.charCodeAt(i + 1))
                i += 3;
            }
            else {
                result += data.charAt(i);
                i++;
            }
        }
        fs.writeFile(args[4], result, (err) => 
        { 
            if (err) console.err();
        })
    })
}