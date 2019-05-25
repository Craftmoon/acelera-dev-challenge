import { Injectable, HttpService } from '@nestjs/common';
var fs = require('fs');

@Injectable()
export class AppService {
  async createFile() {
    const axios = require('axios');

    let res = await axios.get(
      'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=8c1fbde808efed3618de43bb73b1b5d903f52f0d',
    );

    fs.writeFile('answer.json', JSON.stringify(res.data), function(err) {
      if (err) throw err;
    });

    return { mensagem: 'Arquivo criado com sucesso' };
  }
}
