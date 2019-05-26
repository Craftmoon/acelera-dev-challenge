import { Injectable } from '@nestjs/common';
var fs = require('fs');

@Injectable()
export class AppService {
  async requestAndCreateFile() {
    const axios = require('axios');

    let res = await axios.get(
      'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=8c1fbde808efed3618de43bb73b1b5d903f52f0d',
    );

    fs.writeFile('answer.json', JSON.stringify(res.data), function(err) {
      if (err) throw err;
    });

    return { message: 'File successfully created' };
  }

  async readFileAndDecrypt() {
    fs.readFile('answer.json', 'utf8', function(err, contents) {
      if (err) throw err;

      // Decifra a string e joga no json
      function nextChar(letter) {
        if (letter == ` `) return letter;
        if (letter.includes('.')) return letter;
        if (letter == 'w') return 'a';
        if (letter == 'x') return 'b';
        if (letter == 'y') return 'c';
        if (letter == 'z') return 'd';

        return String.fromCharCode(letter.charCodeAt(0) + 4);
      }

      let originalJson = JSON.parse(contents);

      let lettersArray = Array.from(originalJson.cifrado);

      lettersArray = lettersArray.map(nextChar);

      originalJson.decifrado = lettersArray.join('');

      // Faz o resumo criptografico sha1 e joga no json

      // Dá load no modulo crypto
      var crypto = require('crypto');

      // Cria o objeto hash
      var hash = crypto.createHash('sha1');

      // Passa a informacao pra sofrer o hash
      let infoDecifrada = hash.update(originalJson.decifrado, 'utf-8');

      // Cria o hash no formato requerido
      let resumoCryp = infoDecifrada.digest('hex');

      originalJson.resumo_criptografico = resumoCryp;

      fs.writeFile('answer.json', JSON.stringify(originalJson), function(err) {
        if (err) throw err;
      });
    });
  }

  async submitFile() {
    fs.readFile('answer.json', 'utf8', function(err, contents) {
      if (err) throw err;

      var request = require('request');

      var formData = {
        answer: fs.createReadStream('./answer.json'),
      };
      request.post(
        {
          url:
            'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=8c1fbde808efed3618de43bb73b1b5d903f52f0d',
          formData: formData,
        },
        function(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          }
          console.log('Upload successful!  Server responded with:', body);
        },
      );

      // var formData = require('form-data');
      // var request = require('request');
      // var form = new formData();
      // form.append('answer', contents);

      // form.submit(
      //   'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=8c1fbde808efed3618de43bb73b1b5d903f52f0d',
      //   function(err, res) {
      //     // res – response object (http.IncomingMessage)  //
      //     res.resume();
      //   },
      // );
    });
  }
}
